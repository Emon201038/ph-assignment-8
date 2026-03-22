import { IDestination } from "@/interfaces/destination.interface";
import { serverFetch } from "@/lib/server-fetch";
import Image from "next/image";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const res = await serverFetch.get(
    "/v2/destinations/nearby?" +
      new URLSearchParams(searchParamsObj as Record<string, string>).toString(),
  );
  const data = await res.json();

  return (
    <section className="w-full px-6 md:px-20 py-10">
      <h2 className="text-2xl font-bold mb-8">Popular Nearby</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Large Card 1 */}
        {data?.data?.map((destination: IDestination) => (
          <div
            key={destination.id}
            className="relative rounded-2xl overflow-hidden group h-80"
          >
            <Image
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={destination.image}
              fill
              alt={destination.name}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-2 block">
                {destination.continent}
              </span>
              <h3 className="text-2xl font-bold">
                {destination.city}, {destination.country}
              </h3>
              <p className="text-slate-200 text-sm mt-1 max-w-xs">
                {destination.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default page;
