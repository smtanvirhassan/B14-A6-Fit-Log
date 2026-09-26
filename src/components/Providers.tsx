"use client";

import { PlanProvider } from "@/context/PlanContext";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <PlanProvider>{children}</PlanProvider>;
}
