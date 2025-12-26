"use client";
import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { IColumn } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { ITourist } from "@/interfaces/user.interface";

export const touristsColumns: IColumn<ITourist>[] = [
  {
    header: "Tourists",
    accessor: (user) => (
      <UserInfoCell
        name={user.user.name}
        email={user.user.email}
        photo={user.user.profileImage}
      />
    ),
  },
  {
    header: "Phone",
    accessor: (guide) => (
      <div className="flex flex-col">
        <span className="text-sm">{guide?.user.phone}</span>
        {/* {guide.user.address ? (
          <span className="text-sm text-gray-500">{guide.user.address}</span>
        ) : (
          "N/A"
        )} */}
      </div>
    ),
  },
  {
    header: "Interests",
    accessor: (guide) => (
      <div className="flex gap-px flex-wrap">
        {guide?.interests?.length > 0
          ? guide?.interests?.map((interest) => (
              <Badge key={interest} className="text-sm font-semibold">
                {interest}
              </Badge>
            ))
          : "N/A"}
      </div>
    ),
  },
  {
    header: "Gender",
    accessor: (guide) => (
      <span className="text-sm capitalize">
        {(guide?.user?.gender || "").toLowerCase()}
      </span>
    ),
  },
  {
    header: "Status",
    accessor: (guide) => <StatusBadgeCell isDeleted={guide.user.isDeleted} />,
  },
  {
    header: "Joined",
    accessor: (guide) => <DateCell date={guide.user.createdAt} />,
  },
];
