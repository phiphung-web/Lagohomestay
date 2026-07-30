import path from "node:path";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { spawn } from "node:child_process";
import net from "node:net";
import { normalizeWorkspacePath, assertExistingFile } from "./security.mjs";
import { BrowserManager } from "./browser-manager.mjs";

const MAX_TOOL_OUTPUT = 100_000;
const browserManager = new BrowserManager();

function clip(value, limit = MAX_TOOL_OUTPUT) {
  const text = typeof value === "string" ? value : JSON.stringify(value, null, 2);
  if (text.length <= limit) return text;
  return `${text.slice(0, limit)}\n\n[Output truncated at ${limit.toLocaleString()} characters]`;
}

function runProcess(command, args, { cwd, timeoutMs = 180_000 } = {}) {
  return new Promise((resolve, reject) => {
    const isWindowsCommand = process.platform === "win32" && command.toLowerCase().endsWith(".cmd");
    const executable = isWindowsCommand ? (process.env.ComSpec || "cmd.exe") : command;
    const executableArgs = isWindowsCommand ? ["/d", "/s", "/c", command, ...args] : args;
    const child = spawn(executable, executableArgs, {
      cwd,
      windowsHide: true,
      shell: false,
      env: { ...process.env, FORCE_COLOR: "0", CI: "1" }
    });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill();
      reject(new Error(`Command timed out after ${timeoutMs}ms.`));
    }, timeoutMs);
    child.stdout.on("data", (chunk) => { stdout += chunk.toString(); });
    child.stderr.on("data", (chunk) => { stderr += chunk.toString(); });
    child.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code, stdout: clip(stdout, 70_000), stderr: clip(stderr, 30_000) });
    });
  });
}

function portListening(port, host = "127.0.0.1") {
  return new Promise((resolve) => {
    const socket = net.createConnection({ port, host });
    const finish = (value) => {
      socket.removeAllListeners();
      socket.destroy();
      resolve(value);
    };
    socket.setTimeout(500);
    socket.once("connect", () => finish(true));
    socket.once("timeout", () => finish(false));
    socket.once("error", () => finish(false));
  });
}

async function workspaceOverview(root) {
  const [status, log, files] = await Promise.all([
    runProcess("git", ["status", "--short"], { cwd: root, timeoutMs: 20_000 }),
    runProcess("git", ["log", "-5", "--oneline"], { cwd: root, timeoutMs: 20_000 }),
    runProcess("rg", ["--files", "-g", "!node_modules", "-g", "!.next", "-g", "!.git"], {
      cwd: root,
      timeoutMs: 20_000
    })
  ]);
  return {
    workspace: root,
    gitStatus: status.stdout.trim() || "clean",
    recentCommits: log.stdout.trim(),
    files: files.stdout.split(/\r?\n/).filter(Boolean).slice(0, 500)
  };
}

function countOccurrences(source, needle) {
  if (!needle) return 0;
  return source.split(needle).length - 1;
}

function htmlDecode(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function webSearch(query, limit = 8) {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  const response = await fetch(url, {
    headers: { "user-agent": "Mozilla/5.0 ClaudeWorkspace/1.0" },
    signal: AbortSignal.timeout(30_000)
  });
  if (!response.ok) throw new Error(`Search returned HTTP ${response.status}.`);
  const html = await response.text();
  const results = [];
  const pattern = /<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  for (const match of html.matchAll(pattern)) {
    let href = htmlDecode(match[1]);
    try {
      const parsed = new URL(href, "https://duckduckgo.com");
      const redirect = parsed.searchParams.get("uddg");
      if (redirect) href = decodeURIComponent(redirect);
    } catch {}
    results.push({ title: htmlDecode(match[2]), url: href });
    if (results.length >= Math.max(1, Math.min(12, limit))) break;
  }
  return { query, results };
}

const BASE_TOOLS = [
  {
    name: "workspace_overview",
    description: "Inspect repository status, recent commits and the source file map. Use this before broad code work.",
    input_schema: { type: "object", properties: {}, additionalProperties: false }
  },
  {
    name: "read_files",
    description: "Read one or more non-sensitive workspace files. Batch related files in one call.",
    input_schema: {
      type: "object",
      properties: {
        paths: { type: "array", minItems: 1, maxItems: 12, items: { type: "string" } },
        start_line: { type: "integer", minimum: 1 },
        end_line: { type: "integer", minimum: 1 }
      },
      required: ["paths"],
      additionalProperties: false
    }
  },
  {
    name: "search_workspace",
    description: "Search source text with ripgrep. Use a focused query and optional path prefixes.",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", minLength: 1 },
        paths: { type: "array", maxItems: 8, items: { type: "string" } },
        max_results: { type: "integer", minimum: 1, maximum: 300 }
      },
      required: ["query"],
      additionalProperties: false
    }
  },
  {
    name: "run_verification",
    description: "Run an approved read-only or verification command. It cannot commit, push, install or deploy.",
    input_schema: {
      type: "object",
      properties: {
        command: {
          type: "string",
          enum: ["git_status", "git_diff", "typecheck", "tests", "build", "architecture", "full_check"]
        }
      },
      required: ["command"],
      additionalProperties: false
    }
  },
  {
    name: "web_search",
    description: "Search the public web and return result titles and URLs. Follow up with browser_batch for evidence.",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", minLength: 2 },
        limit: { type: "integer", minimum: 1, maximum: 12 }
      },
      required: ["query"],
      additionalProperties: false
    }
  },
  {
    name: "browser_batch",
    description: "Open up to 6 public or localhost URLs at up to 3 viewports, inspect structure, capture console errors and save screenshots as handoff evidence.",
    input_schema: {
      type: "object",
      properties: {
        urls: {
          type: "array",
          minItems: 1,
          maxItems: 6,
          items: {
            oneOf: [
              { type: "string" },
              {
                type: "object",
                properties: {
                  url: { type: "string" },
                  label: { type: "string" }
                },
                required: ["url"],
                additionalProperties: false
              }
            ]
          }
        },
        viewports: {
          type: "array",
          maxItems: 3,
          items: {
            type: "object",
            properties: {
              width: { type: "integer", minimum: 320, maximum: 1920 },
              height: { type: "integer", minimum: 568, maximum: 1200 }
            },
            required: ["width", "height"],
            additionalProperties: false
          }
        },
        fullPage: { type: "boolean" }
      },
      required: ["urls"],
      additionalProperties: false
    }
  },
  {
    name: "browser_flow",
    description: "Interact with one public or localhost page using a safe sequence of clicks, fills, key presses, waits, scrolling and screenshots. Use this to verify menus, tabs, modals and responsive flows.",
    input_schema: {
      type: "object",
      properties: {
        url: { type: "string" },
        viewport: {
          type: "object",
          properties: {
            width: { type: "integer", minimum: 320, maximum: 1920 },
            height: { type: "integer", minimum: 568, maximum: 1200 }
          },
          required: ["width", "height"],
          additionalProperties: false
        },
        steps: {
          type: "array",
          maxItems: 20,
          items: {
            type: "object",
            properties: {
              action: { type: "string", enum: ["click", "fill", "press", "wait", "scroll", "screenshot"] },
              selector: { type: "string" },
              value: { type: "string" },
              key: { type: "string" },
              ms: { type: "integer", minimum: 0, maximum: 5000 },
              y: { type: "integer", minimum: -5000, maximum: 5000 },
              label: { type: "string" },
              fullPage: { type: "boolean" },
              timeout_ms: { type: "integer", minimum: 1000, maximum: 20000 }
            },
            required: ["action"],
            additionalProperties: false
          }
        }
      },
      required: ["url", "steps"],
      additionalProperties: false
    }
  },
  {
    name: "create_handoff",
    description: "Create the structured handoff package for Codex. Call this after completing and verifying a substantial task.",
    input_schema: {
      type: "object",
      properties: {
        summary: { type: "string" },
        decisions: { type: "string" },
        changedFiles: { type: "array", items: { type: "string" } },
        tests: { type: "string" },
        remaining: { type: "string" }
      },
      required: ["summary", "decisions", "changedFiles", "tests", "remaining"],
      additionalProperties: false
    }
  }
];

const WRITE_TOOLS = [
  {
    name: "replace_in_file",
    description: "Safely replace exact text in an existing source/test/docs/public/scripts/tools file. Read the file first. The replacement fails if occurrence count differs.",
    input_schema: {
      type: "object",
      properties: {
        path: { type: "string" },
        old_text: { type: "string", minLength: 1 },
        new_text: { type: "string" },
        expected_occurrences: { type: "integer", minimum: 1, maximum: 20 }
      },
      required: ["path", "old_text", "new_text"],
      additionalProperties: false
    }
  },
  {
    name: "create_file",
    description: "Create a new file inside src/tests/docs/public/scripts/tools. It refuses to overwrite existing files.",
    input_schema: {
      type: "object",
      properties: {
        path: { type: "string" },
        content: { type: "string" }
      },
      required: ["path", "content"],
      additionalProperties: false
    }
  }
];

export function toolDefinitions({ allowWrites }) {
  return allowWrites ? [...BASE_TOOLS, ...WRITE_TOOLS] : BASE_TOOLS;
}

export async function executeTool({
  name,
  input,
  workspaceRoot,
  sessionId,
  sessionStore,
  allowWrites
}) {
  switch (name) {
    case "workspace_overview":
      return workspaceOverview(workspaceRoot);

    case "read_files": {
      let total = 0;
      const results = [];
      for (const requested of input.paths) {
        const file = await assertExistingFile(workspaceRoot, requested);
        const source = await readFile(file.absolute, "utf8");
        const lines = source.split(/\r?\n/);
        const start = Math.max(1, input.start_line ?? 1);
        const end = Math.min(lines.length, input.end_line ?? lines.length);
        const selected = lines
          .slice(start - 1, end)
          .map((line, index) => `${String(start + index).padStart(5, " ")}: ${line}`)
          .join("\n");
        total += selected.length;
        if (total > 160_000) throw new Error("read_files exceeded the 160k character batch limit.");
        results.push({ path: file.relative, startLine: start, endLine: end, content: selected });
      }
      return results;
    }

    case "search_workspace": {
      const args = [
        "--line-number",
        "--color",
        "never",
        "--hidden",
        "-g",
        "!.git",
        "-g",
        "!.next",
        "-g",
        "!node_modules",
        "-g",
        "!.env*",
        input.query
      ];
      for (const requested of input.paths ?? []) {
        args.push(normalizeWorkspacePath(workspaceRoot, requested).relative);
      }
      const result = await runProcess("rg", args, { cwd: workspaceRoot, timeoutMs: 30_000 });
      const lines = result.stdout.split(/\r?\n/).filter(Boolean).slice(0, input.max_results ?? 120);
      return { code: result.code, matches: lines, stderr: result.stderr };
    }

    case "replace_in_file": {
      if (!allowWrites) throw new Error("Code writes are disabled for this run.");
      const file = normalizeWorkspacePath(workspaceRoot, input.path, { write: true });
      const source = await readFile(file.absolute, "utf8");
      const expected = input.expected_occurrences ?? 1;
      const actual = countOccurrences(source, input.old_text);
      if (actual !== expected) {
        throw new Error(`Expected ${expected} occurrence(s), found ${actual}. Re-read the file before editing.`);
      }
      const next = source.split(input.old_text).join(input.new_text);
      await writeFile(file.absolute, next, "utf8");
      return { path: file.relative, replacements: actual, bytes: Buffer.byteLength(next) };
    }

    case "create_file": {
      if (!allowWrites) throw new Error("Code writes are disabled for this run.");
      const file = normalizeWorkspacePath(workspaceRoot, input.path, { write: true });
      try {
        await stat(file.absolute);
        throw new Error(`File already exists: ${file.relative}`);
      } catch (error) {
        if (error?.code !== "ENOENT") throw error;
      }
      await mkdir(path.dirname(file.absolute), { recursive: true });
      await writeFile(file.absolute, input.content, "utf8");
      return { path: file.relative, created: true, bytes: Buffer.byteLength(input.content) };
    }

    case "run_verification": {
      const npm = process.platform === "win32" ? "npm.cmd" : "npm";
      if (["build", "full_check"].includes(input.command) && await portListening(3000)) {
        return {
          code: 2,
          skipped: true,
          stdout: "",
          stderr: "Skipped safely: a Next.js development server is listening on port 3000. Stop it before running build/full_check because both processes write to .next."
        };
      }
      const commands = {
        git_status: ["git", ["status", "--short"], 30_000],
        git_diff: ["git", ["diff", "--stat", "--", "."], 30_000],
        typecheck: [process.platform === "win32" ? "npx.cmd" : "npx", ["tsc", "--noEmit"], 180_000],
        tests: [npm, ["test"], 240_000],
        build: [npm, ["run", "build"], 600_000],
        architecture: [npm, ["run", "check:architecture"], 120_000],
        full_check: [npm, ["run", "check"], 900_000]
      };
      const [command, args, timeoutMs] = commands[input.command];
      return runProcess(command, args, { cwd: workspaceRoot, timeoutMs });
    }

    case "web_search":
      return webSearch(input.query, input.limit);

    case "browser_batch":
      return browserManager.batch({
        ...input,
        sessionEvidenceDir: sessionStore.evidenceDir(sessionId)
      });

    case "browser_flow":
      return browserManager.flow({
        ...input,
        sessionEvidenceDir: sessionStore.evidenceDir(sessionId)
      });

    case "create_handoff":
      return sessionStore.writeHandoff(sessionId, input);

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export async function browserStatus() {
  return browserManager.status();
}

export async function closeBrowser() {
  return browserManager.close();
}

export { clip };
