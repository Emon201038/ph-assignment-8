import { Skeleton } from "@/components/ui/skeleton";

function HeroSkeleton() {
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

function OverviewSkeleton() {
  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <Skeleton className="w-1.5 h-8 rounded-full" />
        <Skeleton className="h-9 w-36" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-5 w-full mt-4" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
      </div>
    </section>
  );
}

function AttractionCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-5">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6 mt-1" />
      </div>
    </div>
  );
}

function AttractionsSkeleton() {
  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <Skeleton className="w-1.5 h-8 rounded-full" />
        <Skeleton className="h-9 w-48" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AttractionCardSkeleton />
        <AttractionCardSkeleton />
        <AttractionCardSkeleton />
        <AttractionCardSkeleton />
      </div>
    </section>
  );
}

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

function ToursSkeleton() {
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

function WeatherWidgetSkeleton() {
  return (
    <div className="rounded-2xl bg-slate-200 dark:bg-slate-800 p-6">
      <Skeleton className="h-7 w-40 mb-4 bg-slate-300 dark:bg-slate-700" />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div>
            <Skeleton className="h-9 w-16 mb-1 bg-slate-300 dark:bg-slate-700" />
            <Skeleton className="h-4 w-24 bg-slate-300 dark:bg-slate-700" />
          </div>
        </div>
        <div className="text-right space-y-1">
          <Skeleton className="h-4 w-20 ml-auto bg-slate-300 dark:bg-slate-700" />
          <Skeleton className="h-3 w-28 bg-slate-300 dark:bg-slate-700" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between py-2 border-t border-slate-300 dark:border-slate-600">
          <Skeleton className="h-4 w-28 bg-slate-300 dark:bg-slate-700" />
          <Skeleton className="h-4 w-24 bg-slate-300 dark:bg-slate-700" />
        </div>
        <div className="flex items-center justify-between py-2 border-t border-slate-300 dark:border-slate-600">
          <Skeleton className="h-4 w-24 bg-slate-300 dark:bg-slate-700" />
          <Skeleton className="h-4 w-20 bg-slate-300 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  );
}

function LocalTipSkeleton() {
  return (
    <div className="flex gap-4">
      <Skeleton className="size-10 rounded-full shrink-0" />
      <div className="flex-1">
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4 mt-1" />
      </div>
    </div>
  );
}

function LocalTipsSkeleton() {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6">
      <Skeleton className="h-7 w-28 mb-6" />
      <div className="space-y-6">
        <LocalTipSkeleton />
        <LocalTipSkeleton />
        <LocalTipSkeleton />
      </div>
    </div>
  );
}

function MapSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-4 bg-white dark:bg-slate-900">
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}

export default function DestinationPageSkeleton() {
  return (
    <main className="flex-1">
      <HeroSkeleton />
      <div className="max-w-300 mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <OverviewSkeleton />
          <AttractionsSkeleton />
          <ToursSkeleton />
        </div>
        <div className="space-y-8">
          <WeatherWidgetSkeleton />
          <LocalTipsSkeleton />
          <MapSkeleton />
        </div>
      </div>
    </main>
  );
}
