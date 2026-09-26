"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Workout } from "@/types/workout";

interface PlanContextValue {
  planWorkouts: Workout[];
  savedWorkouts: Workout[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  planCount: number;
  savedCount: number;
}

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [planWorkouts, setPlanWorkouts] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);

  const addToPlan = useCallback((workout: Workout) => {
    setPlanWorkouts((prev) => {
      if (prev.some((w) => w.id === workout.id)) return prev;
      return [...prev, workout];
    });
  }, []);

  const addToSaved = useCallback((workout: Workout) => {
    setSavedWorkouts((prev) => {
      if (prev.some((w) => w.id === workout.id)) return prev;
      return [...prev, workout];
    });
  }, []);

  const removeFromPlan = useCallback((id: number) => {
    setPlanWorkouts((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const removeFromSaved = useCallback((id: number) => {
    setSavedWorkouts((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const markAsDone = useCallback((id: number) => {
    setPlanWorkouts((prev) => prev.filter((w) => w.id !== id));
  }, []);

  return (
    <PlanContext.Provider
      value={{
        planWorkouts,
        savedWorkouts,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
        planCount: planWorkouts.length,
        savedCount: savedWorkouts.length,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
