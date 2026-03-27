import { Skeleton } from "@/components/ui/skeleton";

export default function TravelMilestonesSkeleton() {
  return (
    <div className="grow rounded-2xl mx-2 mb-2 relative overflow-hidden">
      <div className="bg-surface-container-low rounded-3xl p-8 shadow-sm border border-outline-variant/10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-2">
            <h3 className="font-bold text-lg">Travel Milestones</h3>
            <p className="text-sm text-on-surface-variant">
              Your latest wanderlust achievements
            </p>
          </div>
          {/* <Skeleton className="h-4 w-24" /> */}
        </div>

        {/* Milestone Items */}
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-2xl">
              {/* Icon */}
              <Skeleton className="w-10 h-10 rounded-xl shrink-0" />

              {/* Content */}
              <div className="grow space-y-2">
                <div className="flex justify-between items-start gap-3">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-3 w-72" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
