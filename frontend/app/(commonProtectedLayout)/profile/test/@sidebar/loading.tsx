import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSidebarSkeleton() {
  return (
    <aside className="hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 pt-24 p-6 z-40 border-r">
      {/* User Info */}
      <div className="flex gap-3 mb-4 items-center">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <div className="flex-1">
          <Skeleton className="h-5 w-28" />
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2 grow">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl">
            <Skeleton className="w-5 h-5" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </nav>

      {/* Bottom Navigation - Support & Logout */}
      <div className="mt-auto flex flex-col gap-2 border-t border-slate-200/50 pt-6">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-2 rounded-xl">
            <Skeleton className="w-4.5 h-4.5" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </aside>
  );
}
