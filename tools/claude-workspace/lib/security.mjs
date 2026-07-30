import path from "node:path";
import { stat } from "node:fs/promises";

const BLOCKED_PARTS = new Set([
  ".git",
  ".next",
  "node_modules",
  ".ai-handoff",
  ".env",
  ".ssh",
  ".codex",
  ".agents"
]);

const BLOCKED_FILE_PATTERNS = [
  /^\.env(?:\.|$)/i,
  /\.(?:pem|key|p12|pfx)$/i,
  /credentials?/i,
  /secrets?/i,
  /id_rsa/i
];

const WRITABLE_PREFIXES = [
  "src",
  "tests",
  "docs",
  "public",
  "scripts",
  "tools"
];

export function normalizeWorkspacePath(root, inputPath, { write = false } = {}) {
  if (typeof inputPath !== "string" || !inputPath.trim()) {
    throw new Error("Path is required.");
  }

  const normalizedInput = inputPath.replaceAll("\\", "/").replace(/^\.\/+/, "");
  if (path.isAbsolute(normalizedInput)) {
    throw new Error("Absolute paths are not allowed.");
  }

  const segments = normalizedInput.split("/").filter(Boolean);
  if (segments.some((segment) => segment === ".." || BLOCKED_PARTS.has(segment))) {
    throw new Error(`Blocked path: ${inputPath}`);
  }

  const fileName = segments.at(-1) ?? "";
  if (BLOCKED_FILE_PATTERNS.some((pattern) => pattern.test(fileName))) {
    throw new Error(`Sensitive file is blocked: ${inputPath}`);
  }

  if (write && !WRITABLE_PREFIXES.includes(segments[0])) {
    throw new Error(`Writes are limited to: ${WRITABLE_PREFIXES.join(", ")}`);
  }

  const resolvedRoot = path.resolve(root);
  const resolved = path.resolve(root, ...segments);
  const relative = path.relative(resolvedRoot, resolved);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error("Path escapes the workspace.");
  }
  return { absolute: resolved, relative: relative.replaceAll("\\", "/") };
}

export async function assertExistingFile(root, inputPath) {
  const resolved = normalizeWorkspacePath(root, inputPath);
  const info = await stat(resolved.absolute);
  if (!info.isFile()) throw new Error(`${inputPath} is not a file.`);
  return resolved;
}

export function safeSessionId(value) {
  if (typeof value !== "string" || !/^[a-z0-9][a-z0-9-]{5,79}$/i.test(value)) {
    throw new Error("Invalid session id.");
  }
  return value;
}

export function isAllowedOrigin(origin, port) {
  if (!origin) return false;
  return origin === `http://127.0.0.1:${port}` || origin === `http://localhost:${port}`;
}

