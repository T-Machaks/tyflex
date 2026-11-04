// Runs once when the Next.js server starts (production only): schedules the nightly /paida data archive.
// The inline NEXT_RUNTIME check lets the bundler drop the Node-only import from the Edge build.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" && process.env.NODE_ENV === "production") {
    const { scheduleNightlyArchive } = await import("@/lib/paida/archive");
    scheduleNightlyArchive();
  }
}
