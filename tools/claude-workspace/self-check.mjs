import { normalizeWorkspacePath, isAllowedOrigin, safeSessionId } from "./lib/security.mjs";
import { toolDefinitions, browserStatus, closeBrowser } from "./lib/tool-runner.mjs";
import { SessionStore } from "./lib/session-store.mjs";

const root = process.cwd();
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function expectThrow(callback, message) {
  try {
    callback();
    failures.push(message);
  } catch {}
}

check(normalizeWorkspacePath(root, "src/app/page.tsx").relative === "src/app/page.tsx", "Valid source path failed.");
expectThrow(() => normalizeWorkspacePath(root, "../secret.txt"), "Parent path traversal was not blocked.");
expectThrow(() => normalizeWorkspacePath(root, ".env"), ".env was not blocked.");
expectThrow(() => normalizeWorkspacePath(root, ".git/config"), ".git was not blocked.");
expectThrow(() => normalizeWorkspacePath(root, "package.json", { write: true }), "Root write was not blocked.");
check(normalizeWorkspacePath(root, "docs/claude-workspace.md", { write: true }).relative === "docs/claude-workspace.md", "Docs write path failed.");
check(isAllowedOrigin("http://127.0.0.1:4310", 4310), "Local origin should be allowed.");
check(!isAllowedOrigin("https://example.com", 4310), "Remote origin should be blocked.");
check(safeSessionId("20260730-laka-audit") === "20260730-laka-audit", "Session id validation failed.");
check(!toolDefinitions({ allowWrites: false }).some((tool) => tool.name === "replace_in_file"), "Write tool leaked into read-only mode.");
check(toolDefinitions({ allowWrites: true }).some((tool) => tool.name === "replace_in_file"), "Write tool missing in write mode.");

const store = new SessionStore(root);
await store.init();
check(store.root.endsWith(".ai-handoff"), "Session store root is incorrect.");

const browser = await browserStatus();
await closeBrowser();
if (!browser.available) failures.push(`Browser unavailable: ${browser.error}`);

if (failures.length) {
  console.error(`Claude Workspace self-check failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`Claude Workspace self-check passed.`);
console.log(`Browser: ${browser.provider}`);
console.log(`Tools: ${toolDefinitions({ allowWrites: true }).map((tool) => tool.name).join(", ")}`);

