import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-6 w-96" />
      </div>

      <div className="flex gap-8">
        {/* Sidebar Skeleton */}
        <aside className="hidden lg:block lg:w-80 shrink-0">
          <Card>
            <CardContent className="p-6 space-y-6">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </aside>

        {/* Main Content Skeleton */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-6">
            <Skeleton className="h-9 w-24 lg:hidden" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-40 ml-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <Skeleton className="h-56 w-full rounded-t-lg" />
                <CardContent className="p-5 space-y-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-9 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
