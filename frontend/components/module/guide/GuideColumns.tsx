"use client";
import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { IColumn } from "@/components/shared/ManagementTable";
import { IGuide } from "@/interfaces/guide.interface";
import { IUser } from "@/interfaces/user.interface";
import { Star } from "lucide-react";

export const guidesColumns: IColumn<IUser<IGuide>>[] = [
  {
    header: "Guides",
    accessor: (guide) => (
      <UserInfoCell
        name={guide.name}
        email={guide.email}
        photo={guide.profileImage}
      />
    ),
  },
  {
    header: "Contact",
    accessor: (guide) => (
      <div className="flex flex-col">
        <span className="text-sm">{guide?.phone}</span>
        {guide.address && (
          <span className="text-sm text-gray-500">{guide.address}</span>
        )}
      </div>
    ),
  },
  {
    header: "Fee (hourly)",
    accessor: (guide) => (
      <span className="text-sm font-semibold text-green-500">
        ${guide?.profile?.hourlyRate || 0}
      </span>
    ),
  },
  {
    header: "Rating",
    accessor: (guide) => (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium">
          {(guide?.profile?.averageRating || 0)!.toFixed(1)}
        </span>
      </div>
    ),
  },
  {
    header: "Gender",
    accessor: (guide) => (
      <span className="text-sm capitalize">
        {(guide?.gender || "").toLowerCase()}
      </span>
    ),
  },
  {
    header: "Status",
    accessor: (guide) => <StatusBadgeCell isDeleted={guide.isDeleted} />,
  },
  {
    header: "Joined",
    accessor: (guide) => <DateCell date={guide.createdAt} />,
  },
];
