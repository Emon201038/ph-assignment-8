import { Skeleton } from "@/components/ui/skeleton";

export default function HeroSkeleton() {
  return (
    <div className="relative w-full h-150 overflow-hidden">
      <Skeleton className="absolute inset-0 rounded-none" />
      <div className="absolute bottom-0 left-0 w-full px-6 md:px-20 pb-16">
        <div className="max-w-300 mx-auto">
          <Skeleton className="h-7 w-32 rounded-full mb-4" />
          <Skeleton className="h-14 md:h-20 w-full max-w-xl mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl" />
          <Skeleton className="h-6 w-3/4 max-w-xl mt-2" />
        </div>
      </div>
    </div>
  );
}
