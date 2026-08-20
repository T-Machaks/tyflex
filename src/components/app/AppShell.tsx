import type { ReactNode } from "react";
import AppProviders from "@/components/app/AppProviders";
import AppNav from "@/components/app/AppNav";
import { getPortalSession } from "@/lib/auth";

/** Shared chrome for authenticated app sections (document portal, project tracker). */
export default async function AppShell({ children }: { children: ReactNode }) {
  const session = await getPortalSession();

  return (
    <AppProviders session={session}>
      <div className="min-h-screen flex flex-col">
        <AppNav />
        <main className="flex-1">{children}</main>
      </div>
    </AppProviders>
  );
}
