import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-white">
      <section className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pitch-500">
          Football creator and analysis
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl">
          Regista
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          The frontend foundation is ready. Product features will be added in
          later development stages.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            className="rounded-lg bg-pitch-500 px-5 py-3 font-semibold text-slate-950 transition-colors hover:bg-pitch-100"
            href="/dashboard"
          >
            Dashboard placeholder
          </Link>
          <Link
            className="rounded-lg border border-white/20 px-5 py-3 font-semibold transition-colors hover:border-white/40"
            href="/tactics-board"
          >
            Tactics board placeholder
          </Link>
        </div>
      </section>
    </main>
  );
}
