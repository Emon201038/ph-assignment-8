import { getTourists } from "@/action/tourist";
import TouristFilter from "@/components/module/tourist/TouristFilter";
import TouristManagementHeader from "@/components/module/tourist/TouristManagementHeader";
import TouristsTable from "@/components/module/tourist/TouristTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { IResponse } from "@/interfaces";
import { ITourist, IUser } from "@/interfaces/user.interface";
import { queryStringFormatter } from "@/lib/formatters";
import { Suspense } from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const data: IResponse<IUser<ITourist>[]> = await getTourists(queryString);

  return (
    <div className="space-y-4 p-6">
      <TouristManagementHeader />
      <TouristFilter />
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <TouristsTable tourists={data?.data || []} />
        <TablePagination
          currentPage={data?.meta?.page || 1}
          totalPages={data?.meta?.totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default page;
