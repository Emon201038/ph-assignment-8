import WeatherCard from "@/components/module/destination/WeatherCard";
import { IResponse } from "@/interfaces";
import { IDestination } from "@/interfaces/destination.interface";
import { serverFetch } from "@/lib/server-fetch";
import { Car, CircleDollarSign, Globe } from "lucide-react";
import Link from "next/link";
import React from "react";

const SidebarPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await serverFetch.get("/v2/destinations/" + id);
  const data: IResponse<IDestination> = await res.json();
  return (
    <div className="space-y-8">
      {/* <!-- Weather Widget --> */}
      <WeatherCard
        lat={data.data.lat}
        lng={data.data.lng}
        monthRange={data.data.bestSeason}
      />
      {/* <!-- Local Tips --> */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-xl font-bold mb-6">Local Tips</h3>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <CircleDollarSign className="text-primary text-[20px]" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Currency</h4>
              <p className="text-slate-500 text-sm">{data.data.currency}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Globe className="text-primary text-[20px]" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Language</h4>
              <p className="text-slate-500 text-sm">{data.data.languages}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Car className="text-primary text-[20px]" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Transport</h4>
              <p className="text-slate-500 text-sm">
                {data.data.transportation}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Map/Location --> */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <div
          className="bg-cover bg-center h-48"
          data-alt="Simplified map showing Bali island location"
          data-location="Bali, Indonesia"
        >
          <iframe
            width="100%"
            height="300"
            frameBorder="0"
            loading="lazy"
            src={`https://maps.google.com/maps?q=${data.data.lat},${data.data.lng}&z=15&output=embed`}
          ></iframe>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 text-center">
          <Link
            href={`https://google.com/maps?q=${data.data.lat},${data.data.lng}&z=15`}
            target="_blank"
            className="w-full bg-primary text-white p-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
          >
            Open in Maps
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarPage;
