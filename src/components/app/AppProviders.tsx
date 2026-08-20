"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { ReactNode } from "react";

interface AppProvidersProps {
  children: ReactNode;
  session: Session | null;
}

export default function AppProviders({ children, session }: AppProvidersProps) {
  // Seeding with the server-fetched session avoids the client hydration
  // "flash" where AppNav briefly renders logged-out before its own
  // useSession() fetch resolves.
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
