"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import TypingIndicator from "@/components/motion/TypingIndicator";
import { MAX_CHAT_USER_MESSAGES } from "@/lib/validation";
import { isProtectedPath, COMPANY } from "@/lib/constants";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface Visitor {
  name: string;
  email: string;
}

const STORAGE_KEY = "tyflex-chat-messages";
const VISITOR_KEY = "tyflex-visitor";
const NUDGE_COUNT_KEY = "tyflex-chat-nudge-count";
const LEAD_CAPTURE_THRESHOLD = 3;
const MAX_NUDGES_PER_SESSION = 3;
const NUDGE_DELAY_MS = 8000;
const NUDGE_AUTO_HIDE_MS = 12000;

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || name;
}

/** Renders [label](url) links (internal ones navigate client-side via next/link,
 * so the widget stays open), **bold** and `code` spans as real elements — the
 * model's replies are plain text otherwise, so this syntax was showing up
 * literally instead of rendering/navigating. */
function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*|`(.+?)`/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text))) {
    if (m.index > lastIndex) parts.push(text.slice(lastIndex, m.index));
    if (m[1] !== undefined && m[2] !== undefined) {
      const label = m[1];
      const href = m[2];
      const isInternal = href.startsWith("/") || href.startsWith(COMPANY.url);
      const path = href.startsWith(COMPANY.url) ? href.slice(COMPANY.url.length) || "/" : href;
      parts.push(
        isInternal ? (
          <Link key={key++} href={path} className="underline decoration-1 underline-offset-2 hover:text-brand-red">
            {label}
          </Link>
        ) : (
          <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-2 hover:text-brand-red">
            {label}
          </a>
        )
      );
    } else if (m[3] !== undefined) {
      parts.push(<strong key={key++}>{m[3]}</strong>);
    } else if (m[4] !== undefined) {
      parts.push(<code key={key++} className="rounded bg-black/20 px-1 py-0.5 text-[0.85em]">{m[4]}</code>);
    }
    lastIndex = re.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

function renderMarkdownLite(text: string): ReactNode {
  const lines = text.split("\n");
  const nodes: ReactNode[] = [];
  let listBuffer: string[] = [];

  function flushList(key: string) {
    if (listBuffer.length === 0) return;
    nodes.push(
      <ul key={key} className="my-1 list-disc space-y-0.5 pl-4">
        {listBuffer.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>
    );
    listBuffer = [];
  }

  lines.forEach((line, i) => {
    const bulletMatch = /^[-*]\s+(.*)/.exec(line);
    if (bulletMatch) {
      listBuffer.push(bulletMatch[1]);
      return;
    }
    flushList(`ul-${i}`);
    nodes.push(<span key={`l-${i}`}>{renderInline(line)}</span>);
    if (i < lines.length - 1) nodes.push(<br key={`br-${i}`} />);
  });
  flushList("ul-end");
  return nodes;
}

export default function ChatWidget() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [visitor, setVisitor] = useState<Visitor | null>(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadDismissed, setLeadDismissed] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  const [showNudge, setShowNudge] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Restore an in-progress conversation within the same tab session, and a
  // remembered visitor (name/email, saved on this browser) across visits —
  // so a returning visitor isn't asked to re-enter details already given.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
    } catch {
      // ignore corrupt/unavailable storage
    }
    try {
      const savedVisitor = localStorage.getItem(VISITOR_KEY);
      if (savedVisitor) {
        setVisitor(JSON.parse(savedVisitor));
        setLeadCaptured(true);
      }
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

  // Gently nudge visitors toward the assistant as a way to find their way
  // around the site — a few times per browser session, not on every page.
  useEffect(() => {
    if (isProtectedPath(pathname) || isOpen || messages.length > 0) return;
    let count = 0;
    try {
      count = Number(sessionStorage.getItem(NUDGE_COUNT_KEY) || "0");
    } catch {
      // ignore
    }
    if (count >= MAX_NUDGES_PER_SESSION) return;

    const showTimer = setTimeout(() => {
      setShowNudge(true);
      try {
        sessionStorage.setItem(NUDGE_COUNT_KEY, String(count + 1));
      } catch {
        // ignore
      }
    }, NUDGE_DELAY_MS);

    return () => clearTimeout(showTimer);
  }, [pathname, isOpen, messages.length]);

  useEffect(() => {
    if (!showNudge) return;
    const hideTimer = setTimeout(() => setShowNudge(false), NUDGE_AUTO_HIDE_MS);
    return () => clearTimeout(hideTimer);
  }, [showNudge]);

  if (isProtectedPath(pathname)) {
    return null;
  }

  const welcomeMessage = visitor
    ? `Hey ${firstName(visitor.name)}, good to see you again! What can I help you find today?`
    : "Hi! I'm Nyasha, your Tyflex assistant. Tell me what your business needs, or ask about any of our solutions — I'll point you in the right direction.";

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
        body: JSON.stringify({ messages: outgoing, visitorName: visitor?.name }),
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
          confirmToVisitor: true,
        }),
      });
    } catch {
      // Non-critical — don't block the chat experience on this failing.
    } finally {
      const saved: Visitor = { name: leadName, email: leadEmail };
      setVisitor(saved);
      try {
        localStorage.setItem(VISITOR_KEY, JSON.stringify(saved));
      } catch {
        // ignore storage failures (private browsing, quota, etc.) — the
        // in-memory visitor state above still personalizes this session.
      }
      setLeadCaptured(true);
      setShowLeadCapture(false);
      setLeadSubmitting(false);
    }
  }

  return (
    <>
      {/* Nudge bubble — points visitors toward the assistant as a way to find their way around */}
      <AnimatePresence>
        {showNudge && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 max-w-[220px] rounded-2xl rounded-br-sm border border-white/10 bg-brand-card shadow-xl"
          >
            <button
              onClick={() => {
                setShowNudge(false);
                setIsOpen(true);
              }}
              className="block w-full px-4 py-3 text-left text-xs text-gray-200 hover:text-white"
            >
              Need a hand finding something? Ask Nyasha 👋
            </button>
            <button
              onClick={() => setShowNudge(false)}
              aria-label="Dismiss"
              className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-black text-gray-500 hover:text-white"
            >
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating trigger */}
      <motion.button
        onClick={() => {
          setShowNudge(false);
          setIsOpen((v) => !v);
        }}
        aria-label={isOpen ? "Close Nyasha, the Tyflex chat assistant" : "Open Nyasha, the Tyflex chat assistant"}
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
                <p className="font-semibold text-sm">Nyasha</p>
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
                  {welcomeMessage}
                </div>
              </div>

              {messages.map((m, i) => {
                const isLast = i === messages.length - 1;
                const isEmptyStreamingReply = isLast && isStreaming && m.role === "assistant" && !m.content;
                return (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "rounded-2xl rounded-br-sm bg-brand-red text-white"
                          : "rounded-2xl rounded-bl-sm bg-white/5 text-gray-200"
                      }`}
                    >
                      {isEmptyStreamingReply ? <TypingIndicator /> : renderMarkdownLite(m.content)}
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
