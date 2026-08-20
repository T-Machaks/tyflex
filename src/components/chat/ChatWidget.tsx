"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import TypingIndicator from "@/components/motion/TypingIndicator";
import { MAX_CHAT_USER_MESSAGES } from "@/lib/validation";
import { isProtectedPath } from "@/lib/constants";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE =
  "Hi! I'm the Tyflex Assistant. Tell me what your business needs, or ask about any of our solutions — I'll point you in the right direction.";

const STORAGE_KEY = "tyflex-chat-messages";
const LEAD_CAPTURE_THRESHOLD = 3;

export default function ChatWidget() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadDismissed, setLeadDismissed] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Restore an in-progress conversation within the same tab session.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
    } catch {
      // ignore corrupt/unavailable storage
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore storage failures (private browsing, quota, etc.)
    }
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming, showLeadCapture]);

  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const atLimit = userMessageCount >= MAX_CHAT_USER_MESSAGES;

  useEffect(() => {
    if (
      userMessageCount >= LEAD_CAPTURE_THRESHOLD &&
      !leadCaptured &&
      !leadDismissed &&
      !showLeadCapture &&
      !isStreaming
    ) {
      setShowLeadCapture(true);
    }
  }, [userMessageCount, leadCaptured, leadDismissed, showLeadCapture, isStreaming]);

  if (isProtectedPath(pathname)) {
    return null;
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isStreaming || atLimit) return;

    const outgoing: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages([...outgoing, { role: "assistant", content: "" }]);
    setInput("");
    setErrorMsg(null);
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: outgoing }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        const snapshot = acc;
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: snapshot };
          return next;
        });
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setMessages((prev) => {
        const next = [...prev];
        if (next[next.length - 1]?.role === "assistant" && next[next.length - 1]?.content === "") {
          next.pop();
        }
        return next;
      });
    } finally {
      setIsStreaming(false);
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendMessage(input);
  }

  async function handleLeadSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLeadSubmitting(true);

    const transcript = messages
      .slice(-8)
      .map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.content}`)
      .join("\n");

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          subject: "Chatbot Lead",
          message: `Captured from the website chat assistant after ${userMessageCount} messages.\n\nRecent conversation:\n${transcript}`,
        }),
      });
    } catch {
      // Non-critical — don't block the chat experience on this failing.
    } finally {
      setLeadCaptured(true);
      setShowLeadCapture(false);
      setLeadSubmitting(false);
    }
  }

  return (
    <>
      {/* Floating trigger */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-brand-red text-white flex items-center justify-center shadow-lg shadow-brand-red/30 animate-glow-pulse"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.15 }}
          >
            {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed z-50 inset-x-0 bottom-0 sm:inset-x-auto sm:right-6 sm:bottom-24 w-full sm:w-[380px] h-[75vh] sm:h-[560px] max-h-[75vh] sm:max-h-[70vh] rounded-t-2xl sm:rounded-2xl border border-white/10 bg-brand-card shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 shrink-0">
              <div className="h-9 w-9 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red">
                <Bot className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">Tyflex Assistant</p>
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Online
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white/5 text-gray-200 px-4 py-2.5 text-sm leading-relaxed">
                  {WELCOME_MESSAGE}
                </div>
              </div>

              {messages.map((m, i) => {
                const isLast = i === messages.length - 1;
                const isEmptyStreamingReply = isLast && isStreaming && m.role === "assistant" && !m.content;
                return (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                        m.role === "user"
                          ? "rounded-2xl rounded-br-sm bg-brand-red text-white"
                          : "rounded-2xl rounded-bl-sm bg-white/5 text-gray-200"
                      }`}
                    >
                      {isEmptyStreamingReply ? <TypingIndicator /> : m.content}
                    </div>
                  </div>
                );
              })}

              {showLeadCapture && (
                <motion.form
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleLeadSubmit}
                  className="rounded-2xl border border-brand-red/20 bg-brand-red/5 p-4 space-y-2.5"
                >
                  <p className="text-xs text-gray-300 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-brand-red" />
                    Want the team to follow up? Leave your details.
                  </p>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand-red/50"
                  />
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand-red/50"
                  />
                  <div className="flex items-center gap-3 pt-0.5">
                    <button
                      type="submit"
                      disabled={leadSubmitting}
                      className="px-3.5 py-1.5 bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white text-xs font-medium rounded-lg transition-colors"
                    >
                      {leadSubmitting ? "Sending..." : "Send"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowLeadCapture(false);
                        setLeadDismissed(true);
                      }}
                      className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      No thanks
                    </button>
                  </div>
                </motion.form>
              )}

              {errorMsg && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs px-3 py-2">
                  {errorMsg}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Footer */}
            <div className="border-t border-white/5 p-3 shrink-0">
              {atLimit ? (
                <div className="text-center py-1.5">
                  <p className="text-xs text-gray-400 mb-2">
                    You&apos;ve reached the limit for this conversation.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-block px-4 py-2 bg-brand-red hover:bg-brand-red-dark text-white text-xs font-medium rounded-lg transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about a solution..."
                      disabled={isStreaming}
                      className="flex-1 px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-brand-red/50 disabled:opacity-60 transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={isStreaming || !input.trim()}
                      aria-label="Send message"
                      className="h-10 w-10 shrink-0 flex items-center justify-center bg-brand-red hover:bg-brand-red-dark disabled:opacity-40 disabled:pointer-events-none text-white rounded-lg transition-colors"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                  <p className="text-center text-[11px] text-gray-600 mt-2">
                    Looking for pricing?{" "}
                    <Link href="/get-quote" className="text-brand-red hover:underline">
                      Get a free quote
                    </Link>
                  </p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
