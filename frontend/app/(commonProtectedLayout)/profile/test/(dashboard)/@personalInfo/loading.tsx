import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileHeaderSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden mb-8 border border-slate-200 dark:border-slate-800">
      {/* Cover Image Skeleton */}
      <div className="w-full relative aspect-video md:aspect-16/5">
        <Skeleton className="w-full h-full rounded-none" />
        <Skeleton className="absolute bottom-4 right-4 h-10 w-24 rounded-lg" />
      </div>

      {/* Profile Info Container */}
      <div className="px-8 py-4 flex flex-col md:flex-row items-center md:items-end gap-3">
        {/* Avatar Skeleton */}
        <div className="bg-white dark:bg-slate-900 p-1.5 rounded-full shadow-lg relative -mt-16 md:-mt-12">
          <Skeleton className="size-32 rounded-full" />
        </div>

        {/* Name and Info Skeleton */}
        <div className="flex-1 flex flex-col md:flex-row justify-between items-center md:items-end w-full pb-2">
          <div className="text-center md:text-left space-y-2">
            {/* Name */}
            <Skeleton className="h-9 w-48 mx-auto md:mx-0" />

            {/* Bio with edit icon */}
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Skeleton className="h-5 w-56" />
              <Skeleton className="h-3 w-3" />
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-32" />
            </div>

            {/* Email and Phone */}
            <div className="flex items-center gap-2 justify-center md:justify-start flex-wrap">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-2" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
