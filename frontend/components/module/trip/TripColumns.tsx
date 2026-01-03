"use client";
import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { IColumn } from "@/components/shared/ManagementTable";
import { Star } from "lucide-react";
import { ITrip } from "@/interfaces/trip.interface";
import { TourInfoCell } from "../tour/TourInfoCell";

export const tripsColumns: IColumn<ITrip>[] = [
  {
    header: "Trips",
    accessor: (trip) => (
      <TourInfoCell name={trip.tour.title} photo={trip.tour.images[0]} />
    ),
  },
  {
    header: "Location",
    accessor: (trip) => (
      <div className="flex flex-col">
        <span className="text-sm">{trip.tour?.city}</span>
        {trip.tour.country && (
          <span className="text-sm text-gray-500">{trip.tour.country}</span>
        )}
      </div>
    ),
  },
  {
    header: "Price",
    accessor: (trip) => (
      <span className="text-sm font-semibold text-green-500">
        ${trip?.tour?.price}
      </span>
    ),
  },
  {
    header: "Rating",
    accessor: (trip) => (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium">
          {(trip?.tour?.averageRating || 0)!.toFixed(1)}
        </span>
      </div>
    ),
  },
  {
    header: "Start Date",
    accessor: (trip) => (
      <span className="text-sm capitalize">
        {trip?.startDate?.toString() || ""}
      </span>
    ),
  },
  {
    header: "End Date",
    accessor: (trip) => (
      <span className="text-sm capitalize">
        {trip?.endDate?.toString() || ""}
      </span>
    ),
  },
  {
    header: "Status",
    accessor: (trip) => (
      <StatusBadgeCell
        isDeleted={!false}
        deletedText="In-active"
        activeText={trip.status}
      />
    ),
  },
];
