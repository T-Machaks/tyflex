"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react";
import HeroShell from "@/components/ui/HeroShell";
import GlassCard from "@/components/ui/GlassCard";
import { inputClass } from "@/lib/form-styles";

type Status = "idle" | "submitting" | "success" | "error";

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/portal/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <HeroShell className="min-h-screen flex items-center" padTop={false}>
      <div className="w-full max-w-md mx-auto px-6 py-16">
        <Link
          href="/portal"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
        <h1 className="text-2xl font-bold mb-2">Reset your password</h1>
        <p className="text-gray-400 text-sm mb-8">
          Enter your email and we&apos;ll send you a link to reset your password.
        </p>

        <GlassCard interactive={false} className="p-8">
          {status === "success" ? (
            <div className="text-center py-6">
              <CheckCircle2 className="h-8 w-8 text-brand-red mx-auto mb-3" />
              <p className="text-sm text-gray-300">
                If that email is on file, we&apos;ve sent a password reset link. Check your inbox.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {status === "error" && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-300">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  {errorMsg}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${inputClass} pl-10`}
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white font-medium rounded-lg transition-colors"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          )}
        </GlassCard>
      </div>
    </HeroShell>
  );
}
