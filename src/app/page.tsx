import Hero from "@/components/Hero";
import Library from "@/components/Library";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Library />
    </main>
  );
}
