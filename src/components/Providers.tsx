"use client";

import { PlanProvider } from "@/context/PlanContext";
import { ToastProvider } from "@/context/ToastContext";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <PlanProvider>{children}</PlanProvider>
    </ToastProvider>
  );
}
