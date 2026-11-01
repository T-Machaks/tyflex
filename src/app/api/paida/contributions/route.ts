import { NextResponse } from "next/server";
import { allow, clientIp } from "@/lib/paida/ratelimit";
import { canWrite } from "@/lib/paida/store";
import { contributionFields, createContribution, listContributions } from "@/lib/paida/contributions";

const MAX_PENDING = 500;

const fail = (message: string, status = 400) => NextResponse.json({ ok: false, message }, { status });

/** Public "I've sent my contribution" form. The response never echoes any submitted data. */
export async function POST(req: Request) {
  if (!canWrite) return fail("This form is not available right now.", 503);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail("Could not read your form. Please try again.");
  }

  // Honeypot: real visitors never see this field. Pretend success so bots don't adapt.
  if (String(form.get("website") ?? "").trim() !== "") return NextResponse.json({ ok: true });

  const ip = clientIp(req);
  if (!allow(`contrib:${ip}`, 3, 10 * 60_000) || !allow("contrib:all", 60, 60 * 60_000)) {
    return fail("You're sending very quickly — please wait a few minutes and try again.", 429);
  }

  const currencyChoice = String(form.get("currency") ?? "USD");
  const parsed = contributionFields.safeParse({
    name: String(form.get("name") ?? ""),
    phone: String(form.get("phone") ?? ""),
    amount: String(form.get("amount") ?? ""),
    currency: currencyChoice === "Other" ? String(form.get("currencyOther") ?? "") : currencyChoice,
    method: String(form.get("method") ?? ""),
    reference: String(form.get("reference") ?? ""),
    dateSent: String(form.get("dateSent") ?? ""),
    relationship: String(form.get("relationship") ?? ""),
    message: String(form.get("message") ?? ""),
    showName: form.get("showName") === "on" || form.get("showName") === "true",
  });
  if (!parsed.success) {
    const field = String(parsed.error.issues[0]?.path[0] ?? "");
    const hints: Record<string, string> = {
      name: "Please enter your full name.",
      amount: "Please enter the amount you sent.",
      currency: "Please enter a currency code, e.g. USD.",
      method: "Please choose how you sent it.",
      dateSent: "Please choose the date you sent it.",
    };
    return fail(hints[field] ?? "Please check the form and try again.");
  }
  if ((parsed.data.message.match(/https?:\/\//gi) ?? []).length > 1) return fail("Please leave links out of your message.");

  const pending = (await listContributions().catch(() => [])).filter((c) => c.status === "pending").length;
  if (pending >= MAX_PENDING) return fail("The family is catching up on confirmations. Please try again later.", 503);

  await createContribution(parsed.data, { source: "web" });
  return NextResponse.json({ ok: true });
}
