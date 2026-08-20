"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { AlertCircle, Loader2, Lock, Mail } from "lucide-react";
import HeroShell from "@/components/ui/HeroShell";
import GlassCard from "@/components/ui/GlassCard";
import { inputClass } from "@/lib/form-styles";

interface PortalLoginClientProps {
  callbackUrl?: string;
  error?: string;
}

const DEMO_ACCOUNTS = [
  { label: "Admin", email: "admin@tyflex.co.zw", password: "Admin123!" },
  { label: "Client — Harare Logistics Group", email: "tendai@hararelogistics.co.zw", password: "Client123!" },
  { label: "Client — Zimbank Retail Division", email: "rutendo@zimbankretail.co.zw", password: "Client123!" },
];

export default function PortalLoginClient({ callbackUrl, error: initialError }: PortalLoginClientProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(initialError ? "Invalid email or password." : "");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const res = await signIn("credentials", { email, password, redirect: false });

    if (!res || res.error) {
      setErrorMsg("Invalid email or password.");
      setIsSubmitting(false);
      return;
    }

    // A client account landing here via a /tracker link (admin-only) would
    // just bounce straight back to sign-in — send them to their own
    // dashboard instead of following that callbackUrl.
    const session = await getSession();
    const wantsTracker = callbackUrl?.startsWith("/tracker");
    const isAdmin = session?.user.role === "admin";

    router.push(wantsTracker && !isAdmin ? "/portal/dashboard" : callbackUrl || "/portal/dashboard");
    router.refresh();
  }

  function fillDemo(account: (typeof DEMO_ACCOUNTS)[number]) {
    setEmail(account.email);
    setPassword(account.password);
    setErrorMsg("");
  }

  return (
    <HeroShell className="min-h-screen flex items-center" padTop={false}>
      <div className="w-full max-w-md mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <Image
              src="/logo.png"
              alt="Tyflex"
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg bg-white/90 p-0.5 object-contain"
            />
          </Link>
          <h1 className="text-3xl font-bold mb-2">Document Portal</h1>
          <p className="text-gray-400 text-sm">Sign in to access your Tyflex documents.</p>
        </div>

        <GlassCard interactive={false} className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${inputClass} pl-10`}
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-300">Password</label>
                <Link href="/portal/forgot-password" className="text-xs text-brand-red hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputClass} pl-10`}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white font-medium rounded-lg transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </GlassCard>

        {/* Demo credentials — remove before a real launch */}
        <div className="mt-6 p-4 rounded-xl border border-white/10 bg-white/5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Demo accounts</p>
          <div className="space-y-2">
            {DEMO_ACCOUNTS.map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => fillDemo(account)}
                className="w-full text-left px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <p className="text-xs font-medium text-gray-200">{account.label}</p>
                <p className="text-[11px] text-gray-500">{account.email}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </HeroShell>
  );
}
