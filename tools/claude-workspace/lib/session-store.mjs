import path from "node:path";
import { mkdir, readFile, readdir, writeFile, appendFile } from "node:fs/promises";
import { safeSessionId } from "./security.mjs";

function nowIso() {
  return new Date().toISOString();
}

function slugPart(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 34) || "claude-task";
}

async function readJson(file, fallback) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") return fallback;
    throw error;
  }
}

export class SessionStore {
  constructor(workspaceRoot) {
    this.workspaceRoot = workspaceRoot;
    this.root = path.join(workspaceRoot, ".ai-handoff");
    this.sessionsRoot = path.join(this.root, "sessions");
  }

  async init() {
    await mkdir(this.sessionsRoot, { recursive: true });
  }

  async recoverInterruptedSessions() {
    const sessions = await this.list();
    const recovered = [];
    for (const session of sessions) {
      if (session.status !== "running") continue;
      await this.updateMetadata(session.id, { status: "interrupted" });
      recovered.push(session.id);
    }
    return recovered;
  }

  sessionDir(sessionId) {
    return path.join(this.sessionsRoot, safeSessionId(sessionId));
  }

  async create(title = "Claude task") {
    const stamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
    const sessionId = `${stamp}-${slugPart(title)}`;
    const dir = this.sessionDir(sessionId);
    await mkdir(path.join(dir, "evidence"), { recursive: true });
    const metadata = {
      id: sessionId,
      title: title.trim().slice(0, 120) || "Claude task",
      status: "ready",
      createdAt: nowIso(),
      updatedAt: nowIso(),
      messageCount: 0,
      changedFiles: [],
      lastModel: null
    };
    await writeFile(path.join(dir, "session.json"), JSON.stringify(metadata, null, 2), "utf8");
    await writeFile(path.join(dir, "messages.json"), "[]\n", "utf8");
    await writeFile(path.join(dir, "transcript.jsonl"), "", "utf8");
    await this.setActive(sessionId);
    return metadata;
  }

  async list() {
    await this.init();
    const entries = await readdir(this.sessionsRoot, { withFileTypes: true });
    const sessions = [];
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const metadata = await readJson(path.join(this.sessionsRoot, entry.name, "session.json"), null);
      if (metadata) sessions.push(metadata);
    }
    return sessions.sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
  }

  async metadata(sessionId) {
    const file = path.join(this.sessionDir(sessionId), "session.json");
    const metadata = await readJson(file, null);
    if (!metadata) throw new Error("Session not found.");
    return metadata;
  }

  async updateMetadata(sessionId, patch) {
    const metadata = await this.metadata(sessionId);
    const next = { ...metadata, ...patch, id: metadata.id, updatedAt: nowIso() };
    await writeFile(path.join(this.sessionDir(sessionId), "session.json"), JSON.stringify(next, null, 2), "utf8");
    return next;
  }

  async modelMessages(sessionId) {
    return readJson(path.join(this.sessionDir(sessionId), "messages.json"), []);
  }

  async saveModelMessages(sessionId, messages) {
    await writeFile(
      path.join(this.sessionDir(sessionId), "messages.json"),
      JSON.stringify(messages, null, 2),
      "utf8"
    );
    await this.updateMetadata(sessionId, { messageCount: messages.length });
  }

  async appendTranscript(sessionId, event) {
    const record = { timestamp: nowIso(), ...event };
    await appendFile(
      path.join(this.sessionDir(sessionId), "transcript.jsonl"),
      `${JSON.stringify(record)}\n`,
      "utf8"
    );
    return record;
  }

  async transcript(sessionId) {
    const file = path.join(this.sessionDir(sessionId), "transcript.jsonl");
    try {
      const content = await readFile(file, "utf8");
      return content
        .split(/\r?\n/)
        .filter(Boolean)
        .map((line) => JSON.parse(line));
    } catch (error) {
      if (error?.code === "ENOENT") return [];
      throw error;
    }
  }

  evidenceDir(sessionId) {
    return path.join(this.sessionDir(sessionId), "evidence");
  }

  async evidenceFiles(sessionId) {
    const dir = this.evidenceDir(sessionId);
    const entries = await readdir(dir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && /\.(?:png|jpe?g|webp)$/i.test(entry.name))
      .map((entry) => entry.name)
      .sort();
  }

  async setActive(sessionId) {
    const metadata = await this.metadata(sessionId);
    await writeFile(
      path.join(this.root, "active-session.json"),
      JSON.stringify({ id: metadata.id, title: metadata.title, updatedAt: nowIso() }, null, 2),
      "utf8"
    );
  }

  async writeHandoff(sessionId, handoff) {
    const dir = this.sessionDir(sessionId);
    const summary = `# Bàn giao từ Claude\n\n` +
      `- Phiên: \`${sessionId}\`\n` +
      `- Cập nhật: ${nowIso()}\n\n` +
      `## Kết quả\n\n${handoff.summary?.trim() || "Chưa có tóm tắt."}\n\n` +
      `## Việc còn lại\n\n${handoff.remaining?.trim() || "Không ghi nhận."}\n`;
    const decisions = `# Quyết định\n\n${handoff.decisions?.trim() || "Chưa ghi nhận."}\n`;
    const tests = `# Kiểm tra\n\n${handoff.tests?.trim() || "Chưa chạy kiểm tra."}\n`;
    await Promise.all([
      writeFile(path.join(dir, "summary.md"), summary, "utf8"),
      writeFile(path.join(dir, "decisions.md"), decisions, "utf8"),
      writeFile(path.join(dir, "test-results.md"), tests, "utf8"),
      writeFile(
        path.join(dir, "changed-files.json"),
        JSON.stringify(handoff.changedFiles ?? [], null, 2),
        "utf8"
      )
    ]);
    await this.updateMetadata(sessionId, {
      status: "handoff-ready",
      changedFiles: handoff.changedFiles ?? []
    });
    await this.setActive(sessionId);
    return { summary, decisions, tests };
  }
}
