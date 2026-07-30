const state = {
  sessions: [],
  activeSessionId: null,
  activeJobId: null,
  activeJobStartedAt: null,
  pollTimer: null,
  elapsedTimer: null,
  seenEventCount: 0
};

const $ = (selector) => document.querySelector(selector);
const elements = {
  sessionList: $("#session-list"),
  title: $("#session-title"),
  welcome: $("#welcome"),
  conversation: $("#conversation"),
  message: $("#message-input"),
  send: $("#send-button"),
  newSession: $("#new-session"),
  dialog: $("#new-session-dialog"),
  newSessionForm: $("#new-session-form"),
  newSessionTitle: $("#new-session-title"),
  handoff: $("#handoff-button"),
  stop: $("#stop-button"),
  jobPanel: $("#job-panel"),
  jobEvents: $("#job-events"),
  jobTitle: $("#job-title"),
  jobElapsed: $("#job-elapsed"),
  model: $("#model-input"),
  unlimited: $("#unlimited-input"),
  writes: $("#writes-input"),
  maxTokens: $("#max-tokens-input"),
  tokenBudget: $("#token-budget-input"),
  maxRounds: $("#max-rounds-input")
};

async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: { "content-type": "application/json", ...(options.headers || {}) }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
  return data;
}

function formatTime(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function renderSessions() {
  elements.sessionList.replaceChildren();
  for (const session of state.sessions) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `session-item${session.id === state.activeSessionId ? " active" : ""}`;
    const title = document.createElement("strong");
    title.textContent = session.title;
    const meta = document.createElement("span");
    meta.textContent = `${session.status} · ${formatTime(session.updatedAt)}`;
    button.append(title, meta);
    button.addEventListener("click", () => selectSession(session.id));
    elements.sessionList.append(button);
  }
}

function messageNode(role, content, subtype = "") {
  const article = document.createElement("article");
  article.className = `message ${role}${subtype ? ` ${subtype}` : ""}`;
  const label = document.createElement("span");
  label.className = "message-role";
  label.textContent = role === "user" ? "Bạn" : role === "assistant" ? "Claude" : "Công cụ";
  const body = document.createElement("div");
  body.className = "message-body";
  body.textContent = content;
  article.append(label, body);
  return article;
}

function renderTranscript(transcript) {
  elements.conversation.replaceChildren();
  for (const event of transcript) {
    if (event.type === "message") {
      elements.conversation.append(messageNode(event.role, event.content));
    } else if (event.type === "tool-call") {
      elements.conversation.append(messageNode("tool", `${event.name}\n${JSON.stringify(event.input, null, 2)}`, "tool"));
    } else if (event.type === "tool-result" && !event.ok) {
      elements.conversation.append(messageNode("tool", `${event.name}: ${event.content}`, "tool"));
    }
  }
  elements.conversation.scrollIntoView({ block: "end" });
}

async function renderEvidence(sessionId) {
  const section = $("#evidence");
  const grid = $("#evidence-grid");
  const data = await api(`/api/sessions/${sessionId}/evidence`);
  grid.replaceChildren();
  section.classList.toggle("hidden", !data.files.length);
  for (const file of data.files) {
    const link = document.createElement("a");
    link.className = "evidence-card";
    link.href = file.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    const image = document.createElement("img");
    image.src = file.url;
    image.alt = file.name;
    image.loading = "lazy";
    const label = document.createElement("span");
    label.textContent = file.name;
    link.append(image, label);
    grid.append(link);
  }
}

async function loadSessions() {
  const data = await api("/api/sessions");
  state.sessions = data.sessions;
  renderSessions();
}

async function selectSession(sessionId) {
  const data = await api(`/api/sessions/${sessionId}`);
  state.activeSessionId = sessionId;
  elements.title.textContent = data.session.title;
  elements.welcome.classList.add("hidden");
  elements.conversation.classList.remove("hidden");
  elements.message.disabled = false;
  elements.send.disabled = false;
  elements.handoff.disabled = false;
  renderTranscript(data.transcript);
  await renderEvidence(sessionId);
  renderSessions();
}

async function createSession(title) {
  const data = await api("/api/sessions", {
    method: "POST",
    body: JSON.stringify({ title })
  });
  await loadSessions();
  await selectSession(data.session.id);
}

function setRunning(running) {
  elements.send.disabled = running || !state.activeSessionId;
  elements.message.disabled = running || !state.activeSessionId;
  elements.handoff.disabled = running || !state.activeSessionId;
  elements.stop.classList.toggle("hidden", !running);
  elements.jobPanel.classList.toggle("hidden", !running);
}

function appendJobEvent(event) {
  const row = document.createElement("div");
  row.className = "job-event";
  const label = document.createElement("b");
  const text = document.createElement("span");
  if (event.type === "tool-start") {
    label.textContent = "Công cụ";
    text.textContent = event.name;
  } else if (event.type === "tool-end") {
    label.textContent = event.ok ? "Hoàn tất" : "Lỗi";
    text.textContent = event.ok ? event.name : `${event.name}: ${event.error}`;
  } else if (event.type === "round") {
    label.textContent = `Vòng ${event.round}`;
    text.textContent = event.message;
  } else {
    label.textContent = "Trạng thái";
    text.textContent = event.message || "Claude đang tiếp tục…";
  }
  row.append(label, text);
  elements.jobEvents.append(row);
  elements.jobEvents.scrollTop = elements.jobEvents.scrollHeight;
}

function startElapsed() {
  clearInterval(state.elapsedTimer);
  state.activeJobStartedAt = Date.now();
  state.elapsedTimer = setInterval(() => {
    const seconds = Math.floor((Date.now() - state.activeJobStartedAt) / 1000);
    const minutes = Math.floor(seconds / 60);
    elements.jobElapsed.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  }, 1000);
}

async function pollJob() {
  if (!state.activeJobId) return;
  try {
    const data = await api(`/api/jobs/${state.activeJobId}`);
    const job = data.job;
    for (const event of job.events.slice(state.seenEventCount)) appendJobEvent(event);
    state.seenEventCount = job.events.length;
    if (["completed", "error", "cancelled"].includes(job.status)) {
      clearTimeout(state.pollTimer);
      clearInterval(state.elapsedTimer);
      state.activeJobId = null;
      setRunning(false);
      await loadSessions();
      await selectSession(job.sessionId);
      if (job.status === "error") window.alert(`Claude gặp lỗi: ${job.error}`);
      if (job.status === "cancelled") window.alert("Đã dừng tác vụ Claude.");
      return;
    }
    state.pollTimer = setTimeout(pollJob, 1800);
  } catch (error) {
    state.pollTimer = setTimeout(pollJob, 3000);
  }
}

async function startJob(endpoint, payload) {
  if (state.activeJobId) return;
  elements.jobEvents.replaceChildren();
  elements.jobTitle.textContent = endpoint === "/api/handoff" ? "Claude đang tạo bàn giao" : "Claude đang làm việc";
  state.seenEventCount = 0;
  const data = await api(endpoint, { method: "POST", body: JSON.stringify(payload) });
  state.activeJobId = data.job.id;
  setRunning(true);
  startElapsed();
  pollJob();
}

async function sendMessage() {
  const message = elements.message.value.trim();
  if (!message || !state.activeSessionId) return;
  elements.message.value = "";
  elements.conversation.append(messageNode("user", message));
  await startJob("/api/chat", {
    sessionId: state.activeSessionId,
    message,
    model: elements.model.value.trim(),
    allowWrites: elements.writes.checked,
    unlimited: elements.unlimited.checked,
    maxTokens: Number(elements.maxTokens.value),
    tokenBudget: Number(elements.tokenBudget.value),
    maxRounds: Number(elements.maxRounds.value)
  });
}

elements.newSession.addEventListener("click", () => {
  elements.newSessionTitle.value = "";
  elements.dialog.showModal();
  setTimeout(() => elements.newSessionTitle.focus(), 50);
});

elements.newSessionForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = elements.newSessionTitle.value.trim();
  if (!title) return;
  elements.dialog.close();
  await createSession(title);
});
$("#cancel-new-session").addEventListener("click", () => elements.dialog.close());

elements.send.addEventListener("click", sendMessage);
elements.message.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

elements.stop.addEventListener("click", async () => {
  if (!state.activeJobId) return;
  await api(`/api/jobs/${state.activeJobId}/cancel`, { method: "POST", body: "{}" });
});

elements.handoff.addEventListener("click", async () => {
  if (!state.activeSessionId) return;
  await startJob("/api/handoff", {
    sessionId: state.activeSessionId,
    model: elements.model.value.trim()
  });
});

document.querySelectorAll(".preset-card").forEach((button) => {
  button.addEventListener("click", () => {
    elements.message.value = button.dataset.prompt || "";
    elements.message.focus();
  });
});

async function init() {
  try {
    const status = await api("/api/status");
    $("#key-status").textContent = status.keyConfigured ? "Claude key sẵn sàng" : "Thiếu NGHIMMO_API_KEY";
    $("#key-dot").classList.add(status.keyConfigured ? "ok" : "bad");
    $("#browser-status").textContent = status.browser.available
      ? `${status.browser.provider} sẵn sàng`
      : "Không mở được Chrome/Edge";
    $("#browser-dot").classList.add(status.browser.available ? "ok" : "bad");
    $("#workspace-path").textContent = status.workspaceRoot;
    await loadSessions();
  } catch (error) {
    $("#key-status").textContent = error.message;
    $("#key-dot").classList.add("bad");
  }
}

init();
