/**
 * Light-touch screening for "Memories & messages". Posts publish immediately unless one of
 * these trips, in which case the post waits for an admin. It deliberately errs toward review
 * for anything that could be spam, a scam, or an attempt to redirect payments.
 */
const LINK = /(https?:\/\/|www\.|wa\.me|bit\.ly|t\.me|\b[a-z0-9-]+\.(com|net|org|co|io|me|ly|info|biz|xyz|app|link|top|shop|site|online|club|vip|cc|tk|ru|cn)\b)/i;
const EMAIL = /[^\s@]+@[^\s@]+\.[^\s@]+/;
// Long digit runs (phone / account numbers) — people shouldn't post payment details in the memories.
const LONG_NUMBER = /(?:\d[\s\-.]?){8,}/;

const FLAGGED_WORDS = [
  "fuck", "fucking", "shit", "bitch", "bastard", "asshole", "cunt", "dick", "whore", "slut", "prick", "wanker", "bullshit",
  "bitcoin", "crypto", "forex", "investment", "invest", "loan", "casino", "betting", "jackpot", "giveaway", "viagra", "porn", "sex",
  "whatsapp me", "dm me", "inbox me", "click here", "send money", "western union", "mukuru", "ecocash", "paypal", "bank account", "account number",
];

const norm = (s: string) =>
  s.toLowerCase().replace(/0/g, "o").replace(/[1!|]/g, "i").replace(/3/g, "e").replace(/[@4]/g, "a").replace(/\$/g, "s").replace(/[^a-z\s]/g, " ").replace(/\s+/g, " ");

/** Returns why a post needs review, or null if it can publish straight away. */
export function reviewReason(...texts: string[]): string | null {
  const joined = texts.join(" \n ");
  if (LINK.test(joined)) return "contains a link";
  if (EMAIL.test(joined)) return "contains an email address";
  if (LONG_NUMBER.test(joined)) return "contains a long number (phone/account)";
  const n = ` ${norm(joined)} `;
  const hit = FLAGGED_WORDS.find((w) => n.includes(` ${w} `) || (w.includes(" ") && n.includes(w)));
  return hit ? `contains a flagged word ("${hit}")` : null;
}
