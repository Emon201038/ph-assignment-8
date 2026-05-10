import DestinationManagementHeader from "@/components/module/destination/DestinationManagementHeader";
import DestinationsTable from "@/components/module/destination/DestinationsTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { IDestination } from "@/interfaces/destination.interface";
import { queryStringFormatter } from "@/lib/formatters";
import { serverFetch } from "@/lib/server-fetch";
import React, { Suspense } from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const res = await serverFetch.get(`/v2/destinations?${queryString}`);
  const data = await res.json();

  return (
    <div className="space-y-4 p-6">
      <DestinationManagementHeader />
      <div className="flex gap-2">
        <SearchFilter />
        <SelectFilter
          options={[{ label: "Active", value: "ACTIVE" }]}
          paramsName="status"
        />
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <DestinationsTable destinations={data?.data as IDestination[]} />
        <TablePagination
          currentPage={data?.meta?.page || 1}
          totalPages={data?.meta?.totalPages || 0}
        />
      </Suspense>
    </div>
  );
};

export default page;
