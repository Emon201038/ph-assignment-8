import { getGuides } from "@/action/guide";
import { getUsers } from "@/action/user";
import GuidesTable from "@/components/module/guide/GuideTable";
import TourManagementHeader from "@/components/module/tour/TourManagementHeader";
import UserManagementHeader from "@/components/module/tourist/TouristManagementHeader";
import UsersTable from "@/components/module/tourist/TouristTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { IMeta, IResponse } from "@/interfaces";
import { ITourist, IUser } from "@/interfaces/user.interface";
import { queryStringFormatter } from "@/lib/formatters";
import React, { Suspense } from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const data: IResponse<IUser<ITourist>[]> = await getUsers(queryString);

  return (
    <div className="space-y-4 p-6">
      <UserManagementHeader />
      <div className="flex gap-2">
        <SearchFilter />
        <SelectFilter
          options={[{ label: "Booked", value: "BOOKED" }]}
          paramsName="status"
        />
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <UsersTable tourists={data.data} />
        <TablePagination
          currentPage={data.meta?.page || 1}
          totalPages={data.meta?.totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default page;
