import http from "node:http";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { SessionStore } from "./lib/session-store.mjs";
import { runClaudeAgent, DEFAULT_MODEL } from "./lib/claude-agent.mjs";
import { browserStatus, closeBrowser } from "./lib/tool-runner.mjs";
import { isAllowedOrigin, safeSessionId } from "./lib/security.mjs";

const workspaceRoot = path.resolve(process.cwd());
const here = path.dirname(fileURLToPath(import.meta.url));
const publicRoot = path.join(here, "public");
const port = Number(process.env.CLAUDE_WORKSPACE_PORT || 4310);
const host = "127.0.0.1";
const sessionStore = new SessionStore(workspaceRoot);
const jobs = new Map();

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

function json(response, status, value) {
  const body = JSON.stringify(value);
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body),
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
    "referrer-policy": "no-referrer"
  });
  response.end(body);
}

async function bodyJson(request, maxBytes = 1_000_000) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > maxBytes) throw new Error("Request body is too large.");
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function publicJob(job) {
  return {
    id: job.id,
    sessionId: job.sessionId,
    status: job.status,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
    events: job.events,
    result: job.result,
    error: job.error
  };
}

function createJob({ sessionId, message, allowWrites, maxRounds, maxTokens, model, unlimited, tokenBudget }) {
  const id = randomUUID();
  const controller = new AbortController();
  const job = {
    id,
    sessionId,
    status: "queued",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    events: [],
    result: null,
    error: null,
    controller
  };
  jobs.set(id, job);

  queueMicrotask(async () => {
    job.status = "running";
    job.updatedAt = new Date().toISOString();
    try {
      job.result = await runClaudeAgent({
        apiKey: process.env.NGHIMMO_API_KEY,
        model: model || DEFAULT_MODEL,
        message,
        sessionId,
        sessionStore,
        workspaceRoot,
        allowWrites,
        maxRounds,
        maxTokens,
        unlimited,
        tokenBudget,
        signal: controller.signal,
        onEvent(event) {
          job.events.push({ timestamp: new Date().toISOString(), ...event });
          if (job.events.length > 300) job.events.splice(0, job.events.length - 300);
          job.updatedAt = new Date().toISOString();
        }
      });
      job.status = "completed";
    } catch (error) {
      job.status = error?.name === "AbortError" ? "cancelled" : "error";
      job.error = error.message;
    }
    job.updatedAt = new Date().toISOString();
  });
  return job;
}

async function serveStatic(response, pathname) {
  const requestPath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const file = path.resolve(publicRoot, requestPath);
  if (!file.startsWith(publicRoot)) {
    json(response, 403, { error: "Forbidden." });
    return;
  }
  try {
    const content = await readFile(file);
    response.writeHead(200, {
      "content-type": mimeTypes[path.extname(file)] || "application/octet-stream",
      "content-length": content.length,
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      "x-frame-options": "DENY",
      "content-security-policy": "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'"
    });
    response.end(content);
  } catch (error) {
    json(response, error?.code === "ENOENT" ? 404 : 500, { error: "File not found." });
  }
}

await sessionStore.init();
await sessionStore.recoverInterruptedSessions();

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || `${host}:${port}`}`);
  try {
    if (request.method !== "GET" && !isAllowedOrigin(request.headers.origin, port)) {
      json(response, 403, { error: "Invalid request origin." });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/status") {
      json(response, 200, {
        ok: true,
        keyConfigured: Boolean(process.env.NGHIMMO_API_KEY),
        workspaceRoot,
        port,
        browser: await browserStatus()
      });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/sessions") {
      json(response, 200, { sessions: await sessionStore.list() });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/sessions") {
      const body = await bodyJson(request);
      json(response, 201, { session: await sessionStore.create(body.title || "Claude task") });
      return;
    }

    const sessionMatch = url.pathname.match(/^\/api\/sessions\/([a-z0-9-]+)$/i);
    if (request.method === "GET" && sessionMatch) {
      const sessionId = safeSessionId(sessionMatch[1]);
      json(response, 200, {
        session: await sessionStore.metadata(sessionId),
        transcript: await sessionStore.transcript(sessionId)
      });
      return;
    }

    const evidenceListMatch = url.pathname.match(/^\/api\/sessions\/([a-z0-9-]+)\/evidence$/i);
    if (request.method === "GET" && evidenceListMatch) {
      const sessionId = safeSessionId(evidenceListMatch[1]);
      const files = await sessionStore.evidenceFiles(sessionId);
      json(response, 200, {
        files: files.map((file) => ({
          name: file,
          url: `/api/evidence/${sessionId}/${encodeURIComponent(file)}`
        }))
      });
      return;
    }

    const evidenceFileMatch = url.pathname.match(/^\/api\/evidence\/([a-z0-9-]+)\/([^/]+)$/i);
    if (request.method === "GET" && evidenceFileMatch) {
      const sessionId = safeSessionId(evidenceFileMatch[1]);
      const fileName = decodeURIComponent(evidenceFileMatch[2]);
      if (!/^[a-z0-9][a-z0-9._-]+\.(?:png|jpe?g|webp)$/i.test(fileName)) {
        json(response, 400, { error: "Invalid evidence file." });
        return;
      }
      const file = path.join(sessionStore.evidenceDir(sessionId), fileName);
      const content = await readFile(file);
      response.writeHead(200, {
        "content-type": mimeTypes[path.extname(file).toLowerCase()] || "application/octet-stream",
        "content-length": content.length,
        "cache-control": "no-store",
        "x-content-type-options": "nosniff"
      });
      response.end(content);
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/chat") {
      if (!process.env.NGHIMMO_API_KEY) {
        json(response, 503, { error: "NGHIMMO_API_KEY is missing. Restart the workspace with the key set." });
        return;
      }
      const body = await bodyJson(request);
      const sessionId = safeSessionId(body.sessionId);
      await sessionStore.metadata(sessionId);
      const message = String(body.message || "").trim();
      if (!message) {
        json(response, 400, { error: "Message is required." });
        return;
      }
      const job = createJob({
        sessionId,
        message: message.slice(0, 60_000),
        allowWrites: Boolean(body.allowWrites),
        maxRounds: Math.max(1, Math.min(20, Number(body.maxRounds) || 12)),
        maxTokens: Math.max(1024, Math.min(32_000, Number(body.maxTokens) || 24_000)),
        unlimited: body.unlimited !== false,
        tokenBudget: Math.max(100_000, Math.min(9_500_000, Number(body.tokenBudget) || 8_500_000)),
        model: String(body.model || DEFAULT_MODEL)
      });
      json(response, 202, { job: publicJob(job) });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/handoff") {
      const body = await bodyJson(request);
      const sessionId = safeSessionId(body.sessionId);
      const job = createJob({
        sessionId,
        allowWrites: false,
        maxRounds: 4,
        maxTokens: 6000,
        unlimited: false,
        tokenBudget: 500_000,
        model: String(body.model || DEFAULT_MODEL),
        message: "Hãy tổng hợp toàn bộ phiên hiện tại thành gói bàn giao cho Codex. Kiểm tra git status/diff, đối chiếu test đã chạy, sau đó bắt buộc gọi create_handoff. Không sửa thêm code trong bước bàn giao."
      });
      json(response, 202, { job: publicJob(job) });
      return;
    }

    const jobMatch = url.pathname.match(/^\/api\/jobs\/([a-f0-9-]+)$/i);
    if (request.method === "GET" && jobMatch) {
      const job = jobs.get(jobMatch[1]);
      if (!job) {
        json(response, 404, { error: "Job not found." });
        return;
      }
      json(response, 200, { job: publicJob(job) });
      return;
    }

    const cancelMatch = url.pathname.match(/^\/api\/jobs\/([a-f0-9-]+)\/cancel$/i);
    if (request.method === "POST" && cancelMatch) {
      const job = jobs.get(cancelMatch[1]);
      if (!job) {
        json(response, 404, { error: "Job not found." });
        return;
      }
      job.controller.abort();
      json(response, 202, { ok: true });
      return;
    }

    if (request.method === "GET") {
      await serveStatic(response, url.pathname);
      return;
    }
    json(response, 404, { error: "Not found." });
  } catch (error) {
    json(response, 500, { error: error.message });
  }
});

server.listen(port, host, () => {
  console.log(`Claude Workspace: http://${host}:${port}`);
  console.log(`Workspace: ${workspaceRoot}`);
  console.log(`API key: ${process.env.NGHIMMO_API_KEY ? "configured" : "missing"}`);
});

async function shutdown() {
  for (const job of jobs.values()) job.controller.abort();
  await closeBrowser();
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
