"use client";
import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { IColumn } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { ITourist, IUser } from "@/interfaces/user.interface";

export const touristsColumns: IColumn<IUser & { profile: ITourist }>[] = [
  {
    header: "Tourists",
    accessor: (user) => (
      <UserInfoCell
        name={user.name}
        email={user.email}
        photo={user.profileImage}
      />
    ),
    sortKey: "name",
  },
  {
    header: "Phone",
    accessor: (tourist) => (
      <div className="flex flex-col">
        <span className="text-sm">{tourist?.phone}</span>
        {/* {tourist.user.address ? (
          <span className="text-sm text-gray-500">{tourist.user.address}</span>
        ) : (
          "N/A"
        )} */}
      </div>
    ),
  },
  {
    header: "Interests",
    accessor: (tourist) => (
      <div className="flex gap-px flex-wrap">
        {tourist?.profile?.interests?.length > 0
          ? tourist?.profile?.interests?.map((interest) => (
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
    accessor: (tourist) => (
      <span className="text-sm capitalize">
        {(tourist?.gender || "").toLowerCase()}
      </span>
    ),
  },
  {
    header: "Status",
    accessor: (tourist) => <StatusBadgeCell isDeleted={tourist.isDeleted} />,
  },
  {
    header: "Joined",
    accessor: (tourist) => <DateCell date={tourist.createdAt} />,
    sortKey: "createdAt",
  },
];
