"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { ClipboardList, FileText, LayoutDashboard, LogOut, Receipt } from "lucide-react";
import type { PortalRole } from "@/lib/portal/types";

interface NavLink {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  roles: PortalRole[];
}

const NAV_LINKS: NavLink[] = [
  { href: "/portal/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["admin", "client"] },
  { href: "/portal/documents", label: "Documents", icon: FileText, roles: ["admin", "client"] },
  { href: "/tracker", label: "Tracker", icon: ClipboardList, roles: ["admin"] },
  { href: "/accounts", label: "Accounts", icon: Receipt, roles: ["admin"] },
];

function sectionLabel(pathname: string | null): string {
  if (pathname?.startsWith("/tracker")) return "Tracker";
  if (pathname?.startsWith("/accounts")) return "Accounts";
  return "Portal";
}

function sectionHomeHref(pathname: string | null): string {
  if (pathname?.startsWith("/tracker")) return "/tracker";
  if (pathname?.startsWith("/accounts")) return "/accounts";
  return "/portal/dashboard";
}

export default function AppNav() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const links = session?.user ? NAV_LINKS.filter((link) => link.roles.includes(session.user.role)) : [];
  const brandLabel = sectionLabel(pathname);
  const homeHref = session ? sectionHomeHref(pathname) : "/portal";

  return (
    <header className="sticky top-0 z-40 bg-brand-black/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Link href={homeHref} className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/logo.png"
            alt="Tyflex"
            width={40}
            height={40}
            className="h-8 w-8 rounded-lg bg-white/90 p-0.5 object-contain"
          />
          <span className="font-bold text-lg hidden sm:inline">
            Tyflex <span className="text-brand-red">{brandLabel}</span>
          </span>
        </Link>

        {links.length > 0 && (
          <nav className="flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors flex items-center gap-1.5"
              >
                <link.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3 shrink-0">
          {session?.user && (
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium leading-tight">{session.user.name}</p>
              <p className="text-xs text-gray-500 leading-tight">
                {session.user.role === "admin" ? "Administrator" : session.user.company}
              </p>
            </div>
          )}
          {session && (
            <button
              onClick={() => signOut({ callbackUrl: "/portal" })}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
