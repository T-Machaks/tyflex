// Shared by server code and client components — keep free of server-only imports.

export type Role = "owner" | "admin" | "editor";

export const ROLE_RANK: Record<Role, number> = { editor: 1, admin: 2, owner: 3 };
export const ROLE_LABEL: Record<Role, string> = { owner: "Owner", admin: "Admin", editor: "Editor" };

export const atLeast = (role: Role, min: Role) => ROLE_RANK[role] >= ROLE_RANK[min];

/**
 * Content fields an Editor may change: program, updates, her story and gallery.
 * Everything else (payment details, contacts, hero, links, basics) needs Admin.
 * Enforced on the server in the content API, not just by hiding tabs.
 */
export const EDITOR_CONTENT_FIELDS = ["updates", "program", "storyText", "timeline", "gallery"] as const;

/** Section label for each content field, used for readable activity-log lines. */
export const FIELD_SECTION: Record<string, string> = {
  name: "Basics", nickname: "Basics", born: "Basics", died: "Basics", tagline: "Basics", heroImage: "Basics", ogImage: "Basics", shareText: "Basics",
  updates: "Updates",
  program: "Program",
  supportIntro: "Support details", supportLocal: "Support details", supportAbroad: "Support details",
  storyText: "Her Story", timeline: "Her Story",
  channelName: "Her Voice", channelUrl: "Her Voice", videos: "Her Voice", social: "Her Voice",
  gallery: "Gallery",
  contacts: "Contacts",
};

export type AdminTab =
  | "basics" | "updates" | "program" | "support" | "story" | "voice" | "gallery" | "contacts"
  | "tributes" | "notifications" | "contributions" | "activity" | "team" | "json";

/** Which tabs each role sees. The API enforces the same rules independently. */
export const TABS_FOR_ROLE: Record<Role, AdminTab[]> = {
  editor: ["updates", "program", "story", "gallery", "tributes", "notifications"],
  admin: ["basics", "updates", "program", "support", "story", "voice", "gallery", "contacts", "tributes", "notifications", "contributions", "activity", "json"],
  owner: ["basics", "updates", "program", "support", "story", "voice", "gallery", "contacts", "tributes", "notifications", "contributions", "activity", "team", "json"],
};

export interface TeamMember {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: "admin" | "editor";
  status: "active" | "invited";
  inviteExpiresAt: string | null;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface ActivityEntry {
  at: string;
  actorId: string;
  actorName: string;
  actorRole: Role;
  action: string;
}
