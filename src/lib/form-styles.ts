/** Shared input styling used across the site's forms. */
export const inputClass =
  "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-red/50 transition-colors";

/**
 * Explicit background + text color for every <option> inside a dark <select>.
 * Browsers render a <select>'s dropdown list as native/OS-level chrome and
 * often don't apply the <select>'s own background-color to it, while still
 * inheriting its (light) text color — so without this, options can render as
 * near-invisible light text on the browser's default light popup background.
 * Setting both colors directly on each <option> is what browsers reliably
 * respect.
 */
export const selectOptionClass = "bg-brand-dark text-white";
