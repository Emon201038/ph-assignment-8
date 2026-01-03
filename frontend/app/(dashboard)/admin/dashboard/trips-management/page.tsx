import { getTours } from "@/action/tour";
import TourManagementHeader from "@/components/module/tour/TourManagementHeader";
import ToursTable from "@/components/module/tour/TourTable";
import TripManagementHeader from "@/components/module/trip/TripManagementHeader";
import TripsTable from "@/components/module/trip/TripTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { ITour } from "@/interfaces/tour.interface";
import { ITrip } from "@/interfaces/trip.interface";
import { queryStringFormatter } from "@/lib/formatters";
import { getTrips } from "@/services/trip/trip.service";
import React, { Suspense } from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const data = await getTrips(queryString);
  return (
    <div className="space-y-4 p-6">
      <TripManagementHeader />
      <div className="flex gap-2">
        <SearchFilter />
        <SelectFilter
          options={[{ label: "Booked", value: "BOOKED" }]}
          paramsName="status"
        />
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <TripsTable trips={data?.data as ITrip[]} />
        <TablePagination
          currentPage={data?.meta?.page || 1}
          totalPages={data?.meta?.totalPages || 0}
        />
      </Suspense>
    </div>
  );
};

export default page;
