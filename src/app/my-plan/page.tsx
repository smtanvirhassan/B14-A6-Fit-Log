"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";
import type { Workout } from "@/types/workout";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const {
    planWorkouts,
    savedWorkouts,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = usePlan();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [loading, setLoading] = useState(true);

  // Simulate brief loading state
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const currentList: Workout[] =
    activeTab === "plan" ? planWorkouts : savedWorkouts;

  // Metrics (based on plan workouts only)
  const exercises = planWorkouts.length;
  const minutes = planWorkouts.reduce((sum, w) => sum + w.duration, 0);
  const calories = planWorkouts.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const handleMarkAsDone = (id: number) => {
    markAsDone(id);
    showToast("Workout marked as done!");
  };

  const handleRemoveFromPlan = (id: number) => {
    removeFromPlan(id);
    showToast("Removed from plan");
  };

  const handleRemoveFromSaved = (id: number) => {
    removeFromSaved(id);
    showToast("Removed from saved");
  };

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
            My Plan
          </h1>
          <p className="mt-2 text-sm text-muted sm:text-base">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          {[
            { label: "Exercises", value: exercises },
            { label: "Minutes", value: minutes },
            { label: "Calories", value: calories },
          ].map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col items-center gap-1 rounded-xl border border-card-border bg-card p-4 sm:p-6"
            >
              <span className="font-display text-2xl font-bold text-accent sm:text-3xl">
                {metric.value}
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-lg border border-card-border bg-card p-1">
          <button
            onClick={() => setActiveTab("plan")}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
              activeTab === "plan"
                ? "bg-accent text-background"
                : "text-muted hover:text-foreground"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
              activeTab === "saved"
                ? "bg-accent text-background"
                : "text-muted hover:text-foreground"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm text-muted">Loading workouts…</p>
          </div>
        )}

        {/* Content */}
        {!loading && currentList.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-card-border bg-card px-6 py-16 text-center">
            <h3 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
              Nothing here yet
            </h3>
            <p className="max-w-sm text-sm text-muted">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-background transition-colors hover:bg-accent/90"
            >
              Go to workouts
            </Link>
          </div>
        )}

        {!loading && currentList.length > 0 && (
          <div className="flex flex-col gap-4">
            {currentList.map((workout) => (
              <div
                key={workout.id}
                className="flex flex-col gap-4 rounded-xl border border-card-border bg-card p-4 sm:flex-row sm:items-center"
              >
                {/* Thumbnail */}
                <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-lg bg-zinc-900 sm:h-20 sm:w-20">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col gap-1">
                  <h3 className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
                    {workout.name}
                  </h3>
                  <p className="text-xs text-muted">{workout.equipment}</p>
                  <div className="flex items-center gap-4 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {workout.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 12c0-3 2.5-6 2.5-6s2.5 3 2.5 6a2.5 2.5 0 1 1-5 0Z" />
                        <path d="M12 21a8 8 0 0 1-8-8c0-5 4-9 4-9s1.5 1 2.5 3c.5-1.5 1.5-3 1.5-3s4 4 4 9a8 8 0 0 1-4.5 7.2" />
                      </svg>
                      {workout.caloriesBurned} kcal
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      {workout.rating}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:shrink-0">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="rounded-lg border border-card-border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    View Details
                  </Link>
                  {activeTab === "plan" && (
                    <>
                      <button
                        onClick={() => handleMarkAsDone(workout.id)}
                        className="rounded-lg bg-green-600/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-400 transition-colors hover:bg-green-600/30 flex items-center gap-1"
                        title="Mark as Done"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleRemoveFromPlan(workout.id)}
                        className="rounded-lg bg-red-600/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-400 transition-colors hover:bg-red-600/30 flex items-center gap-1"
                        title="Remove"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </>
                  )}
                  {activeTab === "saved" && (
                    <button
                      onClick={() => handleRemoveFromSaved(workout.id)}
                      className="rounded-lg bg-red-600/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-400 transition-colors hover:bg-red-600/30 flex items-center gap-1"
                      title="Remove"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
