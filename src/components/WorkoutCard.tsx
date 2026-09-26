import Image from "next/image";
import Link from "next/link";
import type { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-card-border bg-card transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent"
            >
              {group}
            </span>
          ))}
        </div>

       
        <h3 className="font-display text-base font-bold uppercase tracking-wide text-foreground">
          {workout.name}
        </h3>

       
        <p className="text-xs text-muted">{workout.equipment}</p>

      
        <div className="mt-auto flex items-center gap-4 border-t border-card-border pt-3 text-xs text-muted">
          
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
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
              width="14"
              height="14"
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

          {/* Rating */}
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
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
    </Link>
  );
}
