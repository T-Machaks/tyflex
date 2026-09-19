import { BedrockRuntimeClient, ConverseStreamCommand } from "@aws-sdk/client-bedrock-runtime";
import { buildChatSystemPrompt } from "@/lib/chat-system-prompt";
import { chatSchema, MAX_CHAT_USER_MESSAGES } from "@/lib/validation";
import { solutions } from "@/lib/data/solutions";

// The AWS SDK needs the full Node runtime, not the Edge runtime.
export const runtime = "nodejs";

// Bare "anthropic.claude-haiku-4-5-..." IDs 400 on Bedrock (on-demand
// throughput isn't supported for this model) — the "us." cross-region
// inference profile prefix is required. Same ID already proven working in
// the Omniflex and ADMA projects.
const MODEL_ID = process.env.BEDROCK_MODEL_ID || "us.anthropic.claude-haiku-4-5-20251001-v1:0";
const REGION = process.env.BEDROCK_REGION || "us-east-1";
const MAX_TOKENS = 1024;

// No API key — auth is the instance's IAM role in production (or the
// local AWS credential chain in dev). Needs bedrock:InvokeModel /
// InvokeModelWithResponseStream on the model/inference-profile ARN.
const bedrock = new BedrockRuntimeClient({ region: REGION });

const RATE_LIMIT_MESSAGE = `You've reached the ${MAX_CHAT_USER_MESSAGES}-message limit for this conversation. For anything further, please use our contact form or request a quote directly — a real person will pick it up from there.`;

const DEV_FALLBACK_REPLY =
  "Thanks for reaching out! I'm running in local demo mode right now (no live AI connection configured), " +
  `but here's the short version: Tyflex offers ${solutions.length} solutions spanning communications, networking, retail ` +
  "technology, business messaging, and cloud infrastructure. Browse them all at /solutions, or head " +
  "straight to /get-quote and our team will follow up with a tailored quote.";

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** Streams the dev-mode canned reply word by word so the widget's typing UX still works without live Bedrock access. */
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

  const { messages, visitorName } = parsed.data;

  // Rate limit: the client resends the full conversation on every request, so
  // counting user turns here needs no server-side session storage.
  const userMessageCount = messages.filter((m) => m.role === "user").length;
  if (userMessageCount > MAX_CHAT_USER_MESSAGES) {
    return jsonError(RATE_LIMIT_MESSAGE, 429);
  }

  // First name only — keeps what's injected into the system prompt short,
  // since this comes straight from what the visitor typed into the form.
  const firstName = visitorName?.trim().split(/\s+/)[0];

  try {
    const response = await bedrock.send(
      new ConverseStreamCommand({
        modelId: MODEL_ID,
        system: [{ text: buildChatSystemPrompt(firstName) }],
        messages: messages.map((m) => ({ role: m.role, content: [{ text: m.content }] })),
        inferenceConfig: { maxTokens: MAX_TOKENS },
      })
    );

    const encoder = new TextEncoder();
    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          if (response.stream) {
            for await (const event of response.stream) {
              const text = event.contentBlockDelta?.delta?.text;
              if (text) controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (err) {
          console.error("Bedrock stream error:", err);
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      console.error("Failed to invoke Bedrock:", err);
      return jsonError(
        "The chat assistant is temporarily unavailable. Please try again or use the contact form.",
        502
      );
    }
    // Local dev without AWS credentials configured — fall back to a canned
    // reply so the widget's UX is still testable.
    console.log("[dev] Bedrock call failed (expected without local AWS credentials) — streaming a canned reply.", err);
    return new Response(streamDevFallback(), {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
