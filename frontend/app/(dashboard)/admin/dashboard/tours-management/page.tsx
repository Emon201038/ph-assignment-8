import { getTours } from "@/action/tour";
import TourManagementHeader from "@/components/module/tour/TourManagementHeader";
import ToursTable from "@/components/module/tour/TourTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { ITour } from "@/interfaces/tour.interface";
import { queryStringFormatter } from "@/lib/formatters";
import React, { Suspense } from "react";
import languages from "@/data/iso/languages.json";
import { TOUR_CATEGORIES } from "@/constants/user";
import TourFilter from "@/components/module/tour/TourFilter";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const data = await getTours(queryString);
  return (
    <div className="space-y-4 p-6">
      <TourManagementHeader />
      <TourFilter />
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <ToursTable tours={data?.data as ITour[]} />
        <TablePagination
          currentPage={data?.meta?.page || 1}
          totalPages={data?.meta?.totalPages || 0}
        />
      </Suspense>
    </div>
  );
};

export default page;
