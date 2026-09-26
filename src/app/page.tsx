export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero section — Stage 2 */}
      <section className="py-20 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight">
          FITLOG
        </h1>
        <p className="mt-2 text-muted">Workout Library — Coming Soon</p>
      </section>

      {/* Library section — Stage 3 */}
      <section id="library" className="py-16 text-center">
        <p className="text-muted">Library will be displayed here.</p>
      </section>
    </main>
  );
}
