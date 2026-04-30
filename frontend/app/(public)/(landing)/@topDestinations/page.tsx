import FeaturedCities from "@/components/module/home/FeaturedCities";
import { IDestination } from "@/interfaces/destination.interface";
import { serverFetch } from "@/lib/server-fetch";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FeaturedCitiesPage = async () => {
  const res = await serverFetch.get("/v2/destinations?popular=true&limit=4");
  const data: { data: IDestination[] } = await res.json();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.data.map((d) => (
        <Link
          href={`/destinations/${d.id}`}
          key={d.id}
          className="group cursor-pointer relative overflow-hidden rounded-2xl aspect-3/4 shadow-lg"
        >
          <Image
            fill
            alt={d.city}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            src={d.image}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6">
            <p className="text-white text-xl font-bold">
              {d.city}, {d.country}
            </p>
            <p className="text-slate-200 text-sm">{d.tourCount}+ Tours</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedCitiesPage;
