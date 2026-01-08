import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background via-primary/5 to-background">
      {/* Cover Skeleton */}
      <div className="relative h-64">
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 space-y-6">
        {/* Profile Card */}
        <Card className="p-6 border-primary/20">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <Skeleton className="h-32 w-32 rounded-full" />

            <div className="flex-1 space-y-4">
              {/* Name & action */}
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-7 w-48" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="h-9 w-24" />
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>

              {/* Expertise badges */}
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-20 rounded-full" />
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center space-y-2">
                <Skeleton className="h-7 w-16 mx-auto" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Info Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-32" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation Tabs */}
        <Card className="p-4">
          <div className="flex gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-md" />
            ))}
          </div>
        </Card>

        {/* Children Content */}
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-5 w-40 mb-4" />
              <Skeleton className="h-32 w-full rounded-lg" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
