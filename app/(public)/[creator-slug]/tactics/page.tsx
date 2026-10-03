import { TacticsBoard } from "@/components/tactics/TacticsBoard";
import { creator } from "@/lib/mock/creator";
import type { Metadata } from "next";

interface TacticsPageProps {
  params: Promise<{
    "creator-slug": string;
  }>;
}

export async function generateMetadata({ params }: TacticsPageProps): Promise<Metadata> {
  const { "creator-slug": _slug } = await params;
  return {
    title: `Tactics Board | ${creator.name}`,
    description: `Explore tactical formations and analysis from ${creator.name}`,
  };
}

export default async function TacticsPage({ params }: TacticsPageProps) {
  const { "creator-slug": slug } = await params;

  if (slug !== creator.slug) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-16">
        <section className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-600">Not Found</p>
          <h1 className="mt-3 text-2xl font-bold tracking-tight">Creator not found</h1>
          <p className="mt-4 text-slate-600">{`No creator found with slug "@${slug}".`}</p>
        </section>
      </main>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <header className="mb-8">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-pitch-700">{creator.primaryTeam.name}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Tactics Board</h1>
            <p className="mt-1 text-slate-500">Explore formations, analyze tactics, and view match preparation.</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={creator.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-600 hover:text-slate-950"
            >
              YouTube
            </a>
            <a
              href={creator.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-600 hover:text-slate-950"
            >
              Twitter
            </a>
          </div>
        </div>
      </header>
      <TacticsBoard />
    </div>
  );
}