import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />

      {/* Library section — Stage 3 */}
      <section id="library" className="py-16 text-center">
        <p className="text-muted">Library will be displayed here.</p>
      </section>
    </main>
  );
}
