"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Workout } from "@/types/workout";

export default function WorkoutDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const res = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${id}`
        );
        if (!res.ok) throw new Error("Workout not found");
        const data: Workout = await res.json();
        setWorkout(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchWorkout();
  }, [id]);

  if (loading) {
    return (
      <main className="flex flex-1 items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-card-border border-t-accent" />
          <p className="text-sm text-muted">Loading workout…</p>
        </div>
      </main>
    );
  }

  if (error || !workout) {
    return (
      <main className="flex flex-1 items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-red-400">
            {error ?? "Workout not found."}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2 text-sm font-bold uppercase tracking-wider text-background"
          >
            Back to Library
          </Link>
        </div>
      </main>
    );
  }

  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: String(workout.sets) },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: String(workout.rating) },
  ];

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 md:gap-12 lg:px-8 lg:py-16">
        {/* Left — large image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-900 md:aspect-auto md:min-h-[500px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Right — details */}
        <div className="flex flex-col gap-6">
          {/* Title */}
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
            {workout.name}
          </h1>

          {/* Description */}
          <p className="text-base leading-relaxed text-muted">
            {workout.description}
          </p>

          {/* Category tags */}
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Key specs */}
          <div className="rounded-xl border border-card-border bg-card p-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {specs.map((spec) => (
                <div key={spec.label} className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                    {spec.label}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="mb-3 font-display text-lg font-bold uppercase tracking-wide text-foreground">
              Instructions
            </h2>
            <ol className="flex flex-col gap-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-background transition-colors hover:bg-accent/90"
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
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add to today&apos;s plan
            </button>

            <button
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-accent transition-colors hover:bg-accent/10"
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
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              Save for later
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
