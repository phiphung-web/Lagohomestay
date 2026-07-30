import { toolDefinitions, executeTool, clip } from "./tool-runner.mjs";

const API_URL = "https://api.nghimmo.com/v1/messages";
const DEFAULT_MODEL = "nghi/claude-opus-5-thinking";

function systemPrompt({ workspaceRoot, allowWrites }) {
  return `You are Claude working as the heavy-research and implementation agent for the LAKA Homestay repository.

WORKSPACE
- Root: ${workspaceRoot}
- Language with the user: Vietnamese.
- Stack: Next.js App Router, TypeScript, Tailwind CSS.
- Product direction: story-first premium nature retreat, cinematic but calm, full multi-page site, booking remains secondary, Vietnamese and English stay symmetrical.

OPERATING CONTRACT
1. Work autonomously and use tools for evidence. Do not claim you inspected a site, file, screenshot, test or build unless the corresponding tool result proves it.
2. Batch related reads, searches and browser viewports to reduce tool round-trips.
3. Public web research should use web_search, then browser_batch on primary pages. Inspect both desktop and mobile when visual behavior matters.
4. Never request, read, print or infer secrets, .env files, credentials, tokens, private keys, .git internals, Codex state or agent state.
5. Never commit, push, deploy, install packages, delete files, modify Git history or run arbitrary shell commands.
6. ${allowWrites
    ? "Code writes are enabled. Read before editing, keep replacements minimal, preserve unrelated work, and run proportional verification."
    : "Code writes are disabled. Analyze and prepare precise recommendations only."}
7. Respect existing LAKA constraints unless the user explicitly changes them: full-screen hero on main pages; zone tabs on stays; compact stay cards and in-place detail modal; no fake guest reviews; no dark-mode switch, scroll hijacking, custom cursor, heavy motion library or image-wide tint.
8. For a substantial completed task, call create_handoff with a factual summary, decisions, changed files, tests and remaining risks. This is how Codex continues without asking the user to repeat context.
9. Do not expose hidden chain-of-thought. Provide concise conclusions, evidence, decisions and actions.

QUALITY BAR
- Check responsive behavior at 360, 768 and 1440 when relevant.
- Prefer primary/official web sources.
- Accessibility: keyboard, focus, reduced motion, contrast and no page-level overflow.
- Performance: no unnecessary runtime dependency; accurate image sizing; do not add visual effects merely for spectacle.
- If a tool fails, diagnose it and continue with a safer alternative.`;
}

function visibleText(content) {
  return (content ?? [])
    .filter((item) => item.type === "text")
    .map((item) => item.text)
    .join("\n\n")
    .trim();
}

async function callClaude({ apiKey, model, messages, tools, signal, maxTokens }) {
  const body = JSON.stringify({
    model,
    max_tokens: maxTokens,
    temperature: 0.08,
    system: systemPrompt({
      workspaceRoot: process.cwd(),
      allowWrites: tools.some((tool) => tool.name === "replace_in_file")
    }),
    tools,
    messages
  });
  let lastError;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    if (signal?.aborted) throw new DOMException("Job cancelled.", "AbortError");
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01"
        },
        body,
        signal
      });
      const raw = await response.text();
      if (response.ok) return JSON.parse(raw);
      lastError = new Error(`Claude gateway HTTP ${response.status}: ${raw.slice(0, 800)}`);
      if (response.status !== 429 && response.status < 500) throw lastError;
    } catch (error) {
      if (error?.name === "AbortError") throw error;
      lastError = error;
    }
    const delay = Math.min(30_000, 1500 * (2 ** attempt));
    await new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, delay);
      signal?.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new DOMException("Job cancelled.", "AbortError"));
      }, { once: true });
    });
  }
  throw lastError ?? new Error("Claude gateway request failed.");
}

export async function runClaudeAgent({
  apiKey,
  model = DEFAULT_MODEL,
  message,
  sessionId,
  sessionStore,
  workspaceRoot,
  allowWrites = false,
  maxRounds = 12,
  maxTokens = 12_000,
  unlimited = false,
  tokenBudget = 8_500_000,
  signal,
  onEvent = () => {}
}) {
  if (!apiKey) throw new Error("NGHIMMO_API_KEY is not configured.");
  const tools = toolDefinitions({ allowWrites });
  const messages = await sessionStore.modelMessages(sessionId);
  const userMessage = { role: "user", content: message };
  messages.push(userMessage);
  await sessionStore.appendTranscript(sessionId, { type: "message", role: "user", content: message });
  await sessionStore.updateMetadata(sessionId, { status: "running", lastModel: model });
  onEvent({ type: "status", message: "Claude đang suy luận…" });

  let finalText = "";
  let totalUsage = { input_tokens: 0, output_tokens: 0 };

  try {
    const roundLimit = unlimited ? 60 : Math.max(1, Math.min(30, maxRounds));
    for (let round = 1; round <= roundLimit; round += 1) {
      if (signal?.aborted) throw new DOMException("Job cancelled.", "AbortError");
      onEvent({ type: "round", round, message: `Vòng ${round}: gọi ${model}` });
      const result = await callClaude({
        apiKey,
        model,
        messages,
        tools,
        signal,
        maxTokens: Math.max(1024, Math.min(32_000, maxTokens))
      });
      totalUsage.input_tokens += result.usage?.input_tokens ?? 0;
      totalUsage.output_tokens += result.usage?.output_tokens ?? 0;
      if ((totalUsage.input_tokens + totalUsage.output_tokens) > tokenBudget) {
        throw new Error(`Session token budget reached (${tokenBudget.toLocaleString()} tokens).`);
      }

      const assistantContent = result.content ?? [];
      messages.push({ role: "assistant", content: assistantContent });
      const text = visibleText(assistantContent);
      if (text) {
        finalText = text;
        await sessionStore.appendTranscript(sessionId, {
          type: "message",
          role: "assistant",
          content: text,
          round,
          model: result.model
        });
        onEvent({ type: "assistant", content: text, round });
      }

      const toolCalls = assistantContent.filter((item) => item.type === "tool_use");
      if (!toolCalls.length) {
        await sessionStore.saveModelMessages(sessionId, messages);
        const currentMetadata = await sessionStore.metadata(sessionId);
        await sessionStore.updateMetadata(sessionId, {
          status: currentMetadata.status === "handoff-ready" ? "handoff-ready" : "ready",
          lastModel: result.model ?? model,
          lastUsage: totalUsage
        });
        return {
          text: finalText || "Claude đã hoàn tất nhưng không trả phần văn bản.",
          usage: totalUsage,
          rounds: round,
          model: result.model ?? model
        };
      }

      const toolResults = [];
      for (const call of toolCalls) {
        if (signal?.aborted) throw new DOMException("Job cancelled.", "AbortError");
        onEvent({ type: "tool-start", name: call.name, id: call.id, input: call.input });
        await sessionStore.appendTranscript(sessionId, {
          type: "tool-call",
          name: call.name,
          toolUseId: call.id,
          input: call.input,
          round
        });
        try {
          const output = await executeTool({
            name: call.name,
            input: call.input ?? {},
            workspaceRoot,
            sessionId,
            sessionStore,
            allowWrites
          });
          const content = clip(output);
          toolResults.push({ type: "tool_result", tool_use_id: call.id, content });
          await sessionStore.appendTranscript(sessionId, {
            type: "tool-result",
            name: call.name,
            toolUseId: call.id,
            ok: true,
            content: clip(output, 12_000),
            round
          });
          onEvent({ type: "tool-end", name: call.name, id: call.id, ok: true });
        } catch (error) {
          const content = clip(`Tool error: ${error.message}`, 12_000);
          toolResults.push({
            type: "tool_result",
            tool_use_id: call.id,
            content,
            is_error: true
          });
          await sessionStore.appendTranscript(sessionId, {
            type: "tool-result",
            name: call.name,
            toolUseId: call.id,
            ok: false,
            content,
            round
          });
          onEvent({ type: "tool-end", name: call.name, id: call.id, ok: false, error: error.message });
        }
      }
      messages.push({ role: "user", content: toolResults });
      await sessionStore.saveModelMessages(sessionId, messages);
      onEvent({ type: "status", message: `Đã thực thi ${toolCalls.length} công cụ; Claude tiếp tục…` });
    }

    throw new Error(`Claude reached the safety cap of ${roundLimit} tool rounds without a final answer.`);
  } catch (error) {
    await sessionStore.saveModelMessages(sessionId, messages);
    await sessionStore.updateMetadata(sessionId, {
      status: error?.name === "AbortError" ? "cancelled" : "error",
      lastError: error.message,
      lastUsage: totalUsage
    });
    throw error;
  }
}

export { DEFAULT_MODEL };
