import { getTours } from "@/action/tour";
import TourManagementHeader from "@/components/module/tour/TourManagementHeader";
import ToursTable from "@/components/module/tour/TourTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import React, { Suspense } from "react";

const page = async () => {
  const data = await getTours();

  console.log(data);
  return (
    <div className="space-y-4 p-6">
      <TourManagementHeader />
      <div className="flex gap-2">
        <SearchFilter />
        <SelectFilter
          options={[{ label: "Booked", value: "BOOKED" }]}
          paramsName="status"
        />
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <ToursTable tours={data?.data || []} />
        <TablePagination
          currentPage={data?.meta.page || 1}
          totalPages={data?.meta.totalPages || 0}
        />
      </Suspense>
    </div>
  );
};

export default page;
