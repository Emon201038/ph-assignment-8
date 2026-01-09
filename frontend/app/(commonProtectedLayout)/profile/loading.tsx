import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function GuideProfileLoading() {
  return (
    <div className="space-y-4 mb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-6 w-32" />
      </div>

      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="p-6 border-primary/20 animate-pulse">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image */}
            <Skeleton className="w-full md:w-48 h-32 rounded-lg" />

            {/* Content */}
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2 w-full">
                  <Skeleton className="h-5 w-3/5" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>

                {/* Status Badge */}
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>

              {/* Stats */}
              <div className="flex gap-6">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40" />
              </div>

              {/* Button */}
              <Skeleton className="h-8 w-32" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
