import Link from "next/link";

/** Shared 404 body: used by app/(site)/not-found.tsx and app/global-not-found.tsx. */
export default function NotFoundContent() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 py-32 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-red">404</p>
      <h1 className="mt-3 text-3xl font-bold text-white">This page could not be found</h1>
      <p className="mt-3 text-gray-400">The page you are looking for may have moved or no longer exists.</p>
      <Link href="/" className="mt-8 rounded-lg bg-brand-red px-6 py-3 font-semibold text-white hover:bg-brand-red-hover">
        Back to home
      </Link>
    </section>
  );
}
