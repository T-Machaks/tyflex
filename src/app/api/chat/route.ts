import Anthropic from "@anthropic-ai/sdk";
import { buildChatSystemPrompt } from "@/lib/chat-system-prompt";
import { chatSchema, MAX_CHAT_USER_MESSAGES } from "@/lib/validation";

// The Anthropic SDK needs the full Node runtime, not the Edge runtime.
export const runtime = "nodejs";

const MODEL = "claude-haiku-4-5";
const MAX_TOKENS = 1024;

const apiKey = process.env.ANTHROPIC_API_KEY;
const anthropic = apiKey ? new Anthropic({ apiKey }) : null;

const SYSTEM_PROMPT = buildChatSystemPrompt();

const RATE_LIMIT_MESSAGE = `You've reached the ${MAX_CHAT_USER_MESSAGES}-message limit for this conversation. For anything further, please use our contact form or request a quote directly — a real person will pick it up from there.`;

const DEV_FALLBACK_REPLY =
  "Thanks for reaching out! I'm running in local demo mode right now (no live AI connection configured), " +
  "but here's the short version: Tyflex offers 15 solutions spanning communications, networking, retail " +
  "technology, business messaging, and cloud infrastructure. Browse them all at /solutions, or head " +
  "straight to /get-quote and our team will follow up with a tailored quote.";

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** Streams the dev-mode canned reply word by word so the widget's typing UX still works without a live API key. */
function streamDevFallback(): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const words = DEV_FALLBACK_REPLY.split(" ");

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      for (const word of words) {
        controller.enqueue(encoder.encode(`${word} `));
        await new Promise((resolve) => setTimeout(resolve, 25));
      }
      controller.close();
    },
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  const parsed = chatSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError("Invalid message format.", 400);
  }

  const { messages } = parsed.data;

  // Rate limit: the client resends the full conversation on every request, so
  // counting user turns here needs no server-side session storage.
  const userMessageCount = messages.filter((m) => m.role === "user").length;
  if (userMessageCount > MAX_CHAT_USER_MESSAGES) {
    return jsonError(RATE_LIMIT_MESSAGE, 429);
  }

  if (!anthropic) {
    if (process.env.NODE_ENV === "production") {
      return jsonError(
        "The chat assistant is temporarily unavailable. Please use the contact form instead.",
        502
      );
    }
    console.log("[dev] ANTHROPIC_API_KEY not set — streaming a canned reply instead of calling the API.");
    return new Response(streamDevFallback(), {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  try {
    const messageStream = anthropic.messages.stream({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream<Uint8Array>({
      start(controller) {
        messageStream.on("text", (delta) => {
          controller.enqueue(encoder.encode(delta));
        });
        messageStream.on("end", () => {
          controller.close();
        });
        messageStream.on("error", (err) => {
          console.error("Chat stream error:", err);
          controller.error(err);
        });
      },
      cancel() {
        messageStream.abort();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("Failed to start chat stream:", err);
    return jsonError(
      "The chat assistant is temporarily unavailable. Please try again or use the contact form.",
      502
    );
  }
}
