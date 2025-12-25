import { getTourists } from "@/action/tourist";
import TouristManagementHeader from "@/components/module/tourist/TouristManagementHeader";
import TouristsTable from "@/components/module/tourist/TouristTable";
import UsersTable from "@/components/module/tourist/TouristTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { IResponse } from "@/interfaces";
import { ITourist } from "@/interfaces/user.interface";
import { queryStringFormatter } from "@/lib/formatters";
import { Suspense } from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  searchParamsObj.populate =
    "userId:name;profileImage;email;phone;isDeleted;interests;preferredLanguages;preferredCurrency;totalSpent;createdAt;gender;address";
  const queryString = queryStringFormatter(searchParamsObj);
  const data: IResponse<ITourist[]> = await getTourists(queryString);

  return (
    <div className="space-y-4 p-6">
      <TouristManagementHeader />
      <div className="flex gap-2">
        <SearchFilter />
        <SelectFilter
          options={[{ label: "Deleted", value: "true" }]}
          paramsName="isDeleted"
        />
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <TouristsTable tourists={data.data} />
        <TablePagination
          currentPage={data?.meta?.page || 1}
          totalPages={data?.meta?.totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default page;
