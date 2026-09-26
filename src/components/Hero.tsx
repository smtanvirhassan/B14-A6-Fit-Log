import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
       
        <div className="flex flex-col items-start gap-6">
     
          <span className="inline-block rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
            Workout Library
          </span>

        
          <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Train with intent.{" "}
            <span className="text-accent">Log every set.</span>
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-background transition-colors hover:bg-accent/90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
            Browse Workouts
          </Link>
        </div>

        <div className="flex items-center justify-center md:justify-end">
          <Image
            src="/banner.png"
            alt="FitLog hero — anatomical figure on gym machine"
            width={500}
            height={500}
            priority
            className="h-auto w-full max-w-sm object-contain md:max-w-md lg:max-w-lg"
          />
        </div>
      </div>
    </section>
  );
}
