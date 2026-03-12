import { IDestination } from "@/interfaces/destination.interface";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FavouriteBtn from "./FavouriteBtn";

interface DestinationCardProps {
  destination: IDestination;
  index: number;
}

const DestinationCard = ({ destination, index }: DestinationCardProps) => {
  return (
    <div
      key={destination.id}
      className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          alt={destination?.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={destination?.image}
          fill
        />
        <FavouriteBtn id={destination?.id} />
        {index === 0 && (
          <div className="absolute bottom-3 left-3 bg-primary/90 text-white text-xs font-bold px-2 py-1 rounded">
            TRENDING
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h4 className="text-lg font-bold">
            {destination?.city}, {destination?.country}
          </h4>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span className="text-sm font-bold">{destination?.rating}</span>
          </div>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">
          {destination?.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-slate-900 dark:text-slate-100 font-bold">
            From ${destination?.averageCost}
          </span>
          <Link
            href={`/destinations/${destination?.id}`}
            className="text-primary hover:text-primary-foreground hover:bg-primary font-bold text-sm px-4 py-2 rounded-md"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
