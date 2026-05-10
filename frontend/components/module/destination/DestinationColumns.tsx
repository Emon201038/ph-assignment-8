"use client";
import { DateCell } from "@/components/shared/cell/DateCell";
import { IColumn } from "@/components/shared/ManagementTable";
import { Star, MapPin } from "lucide-react";
import { IDestination } from "@/interfaces/destination.interface";

export const destinationColumns: IColumn<IDestination>[] = [
  {
    header: "Destination",
    accessor: (destination) => (
      <div className="flex items-center gap-3">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-10 w-10 rounded object-cover"
        />
        <div>
          <p className="font-semibold text-sm">{destination.name}</p>
          <p className="text-xs text-gray-500">{destination.city}</p>
        </div>
      </div>
    ),
  },
  {
    header: "Country",
    accessor: (destination) => (
      <span className="text-sm">{destination.country}</span>
    ),
  },
  {
    header: "Category",
    accessor: (destination) => (
      <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
        {destination.category}
      </span>
    ),
  },
  {
    header: "Rating",
    accessor: (destination) => (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-semibold">{destination.rating}</span>
      </div>
    ),
  },
  {
    header: "Avg Cost",
    accessor: (destination) => (
      <span className="text-sm font-semibold text-green-600">
        ${destination.averageCost}
      </span>
    ),
  },
  {
    header: "Tours",
    accessor: (destination) => (
      <span className="text-sm font-semibold">{destination.tourCount}</span>
    ),
  },
  {
    header: "Best Season",
    accessor: (destination) => (
      <span className="text-sm">{destination.bestSeason?.join(", ")}</span>
    ),
  },
  {
    header: "Created",
    accessor: (destination) => <DateCell date={destination.createdAt} />,
  },
];
