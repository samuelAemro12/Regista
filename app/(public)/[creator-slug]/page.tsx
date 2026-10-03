type CreatorPageProps = {
  params: Promise<{
    "creator-slug": string;
  }>;
};

export default async function CreatorPage({ params }: CreatorPageProps) {
  const { "creator-slug": creatorSlug } = await params;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-pitch-700">
          Public creator page
        </p>
        <h1 className="mt-3 break-words text-4xl font-bold tracking-tight">
          {creatorSlug}
        </h1>
        <p className="mt-4 text-slate-600">
          Creator hub placeholder for @{creatorSlug}.
        </p>
      </section>
    </main>
  );
}
