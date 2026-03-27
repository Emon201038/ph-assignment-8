import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((stat) => (
        <Skeleton key={stat} className="h-29 w-full" />
      ))}
    </div>
  );
};

export default loading;
