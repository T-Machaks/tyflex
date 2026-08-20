"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2, Lock } from "lucide-react";
import HeroShell from "@/components/ui/HeroShell";
import GlassCard from "@/components/ui/GlassCard";
import { inputClass } from "@/lib/form-styles";

type Status = "idle" | "submitting" | "success" | "error";

interface ResetPasswordClientProps {
  token?: string;
}

export default function ResetPasswordClient({ token }: ResetPasswordClientProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (!token) {
    return (
      <HeroShell className="min-h-screen flex items-center" padTop={false}>
        <div className="w-full max-w-md mx-auto px-6 py-16">
          <GlassCard interactive={false} className="p-8 text-center">
            <AlertCircle className="h-8 w-8 text-brand-red mx-auto mb-3" />
            <p className="text-sm text-gray-300 mb-4">
              This reset link is missing its token. Please request a new one.
            </p>
            <Link href="/portal/forgot-password" className="text-brand-red text-sm hover:underline">
              Request a new link
            </Link>
          </GlassCard>
        </div>
      </HeroShell>
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirm) {
      setErrorMsg("Passwords don't match.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/portal/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("success");
      setTimeout(() => router.push("/portal"), 1800);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <HeroShell className="min-h-screen flex items-center" padTop={false}>
      <div className="w-full max-w-md mx-auto px-6 py-16">
        <h1 className="text-2xl font-bold mb-2">Set a new password</h1>
        <p className="text-gray-400 text-sm mb-8">Choose a new password for your Document Portal account.</p>

        <GlassCard interactive={false} className="p-8">
          {status === "success" ? (
            <div className="text-center py-6">
              <CheckCircle2 className="h-8 w-8 text-brand-red mx-auto mb-3" />
              <p className="text-sm text-gray-300">Password updated. Redirecting you to sign in...</p>
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
                <label className="block text-sm font-medium text-gray-300 mb-1.5">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${inputClass} pl-10`}
                    placeholder="At least 8 characters"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className={`${inputClass} pl-10`}
                    placeholder="Re-enter password"
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
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </button>
            </form>
          )}
        </GlassCard>
      </div>
    </HeroShell>
  );
}
