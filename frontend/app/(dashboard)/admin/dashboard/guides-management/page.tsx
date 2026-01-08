import { getGuides } from "@/action/guide";
import GuidesTable from "@/components/module/guide/GuideTable";
import GuideManagementHeader from "@/components/module/guide/GuideManagementHeader";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { IResponse } from "@/interfaces";
import { IGuide } from "@/interfaces/guide.interface";
import { IUser } from "@/interfaces/user.interface";
import { queryStringFormatter } from "@/lib/formatters";
import { Suspense } from "react";
import GuideFilter from "@/components/module/guide/GuideFilter";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const data: IResponse<IUser<IGuide>[]> = await getGuides(queryString);

  return (
    <div className="space-y-4 p-6">
      <GuideManagementHeader />
      <GuideFilter />
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <GuidesTable guides={data.data} />
        <TablePagination
          currentPage={data?.meta?.page || 1}
          totalPages={data?.meta?.totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default page;
