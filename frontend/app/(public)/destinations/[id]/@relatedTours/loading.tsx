import { Skeleton } from "@/components/ui/skeleton";

function TourItemSkeleton() {
  return (
    <div className="flex gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <Skeleton className="size-24 rounded-lg shrink-0" />
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-5 w-24" />
        </div>
      </div>
    </div>
  );
}

export default function ToursSkeleton() {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Skeleton className="w-1.5 h-8 rounded-full" />
          <Skeleton className="h-9 w-44" />
        </div>
        <Skeleton className="h-5 w-20" />
      </div>
      <div className="space-y-4">
        <TourItemSkeleton />
        <TourItemSkeleton />
      </div>
    </section>
  );
}
