"use client";

import { useEffect, useState } from "react";
import type { Workout, WorkoutsResponse } from "@/types/workout";
import WorkoutCard from "@/components/WorkoutCard";

type SortKey = "duration" | "caloriesBurned" | "rating";

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "Duration", value: "duration" },
  { label: "Calories", value: "caloriesBurned" },
  { label: "Rating", value: "rating" },
];

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>("duration");
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        if (!res.ok) throw new Error("Failed to fetch workouts");
        const data: WorkoutsResponse = await res.json();
        if (Array.isArray(data)) {
          setWorkouts(data);
        } else if (data && Array.isArray(data.Workouts)) {
          setWorkouts(data.Workouts);
        } else if (data && Array.isArray(data.workouts)) {
          setWorkouts(data.workouts);
        } else {
          setWorkouts([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchWorkouts();
  }, []);

  const safeWorkouts = Array.isArray(workouts) ? workouts : [];
  const sorted = [...safeWorkouts].sort((a, b) => {
    if (sortBy === "rating") return (b[sortBy] ?? 0) - (a[sortBy] ?? 0);
    return (a[sortBy] ?? 0) - (b[sortBy] ?? 0);
  });

  const currentLabel =
    SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "Duration";

  return (
    <section id="library" className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
              The Library
            </h2>
            <p className="mt-2 text-sm text-muted sm:text-base">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/40"
            >
              Sort By: {currentLabel}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform ${sortOpen ? "rotate-180" : ""}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {sortOpen && (
              <div className="absolute right-0 z-10 mt-1 w-40 overflow-hidden rounded-lg border border-card-border bg-card shadow-xl">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setSortOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-accent/10 ${
                      sortBy === option.value
                        ? "font-semibold text-accent"
                        : "text-muted"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-card-border border-t-accent" />
            <p className="mt-4 text-sm text-muted">Loading workouts…</p>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-10 text-center">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
