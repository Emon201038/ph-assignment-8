import HeroSection from "@/components/module/destination/HeroSection";
import WeatherCard from "@/components/module/destination/WeatherCard";
import { IResponse } from "@/interfaces";
import { IDestination } from "@/interfaces/destination.interface";
import { serverFetch } from "@/lib/server-fetch";
import { Car, CircleDollarSign, Globe, SunIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DestinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await serverFetch.get("/v2/destinations/" + id);
  const data: IResponse<IDestination> = await res.json();

  return (
    <main className="flex-1">
      {/* <!-- Hero Section --> */}
      <HeroSection destination={data.data} />
      <div className="max-w-300 mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* <!-- Main Content Column --> */}
        <div className="lg:col-span-2 space-y-12">
          {/* <!-- Overview --> */}
          <section id="overview">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-primary rounded-full"></span>
              Overview
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              <p className="mb-4">{data.data.overview}</p>
            </div>
          </section>
          {/* <!-- Top Attractions --> */}
          <section id="attractions">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-primary rounded-full"></span>
              Top Attractions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.data.attractions.map((attraction) => (
                <div
                  key={attraction.id}
                  className="group overflow-hidden rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all w-full"
                >
                  <Image
                    src={attraction.image}
                    alt={attraction.name}
                    width={500}
                    height={500}
                    className="h-48 bg-cover bg-center"
                    data-alt="Lush green Monkey Forest in Ubud with stone statues"
                    // style={{
                    //   backgroundImage: `url(${attraction.image});`,
                    // }}
                  ></Image>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2">
                      {attraction.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {attraction.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* <!-- Related Tours --> */}
          <section id="tours">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                Related Tours
              </h2>
              <a
                className="text-primary font-bold flex items-center gap-1 text-sm"
                href="#"
              >
                View all
                <span className="material-symbols-outlined">chevron_right</span>
              </a>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary/50 transition-all cursor-pointer">
                <div
                  className="size-24 rounded-lg bg-cover bg-center shrink-0"
                  data-alt="Couple enjoying a Balinese massage at a spa"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCVvmgvlJts50-8Gt8ulgm0so9YkicO8CMCS7Bu7hjsmE15yXEJECKp-FNifLt6D4D1hK-4KllWBb9w1rlVX6qwJBZxMEj60ar3VKDZ6sxWthcUGq8MeL_SbmXw2RuR7_jmc6x9n6pY8SkJZxSUM6gZHpfhJbjQhHysUTKOoWfwmdwnwQNT-65j0mQTS-wSqwNGbO9jN_CDF5ISMW5cJAxdwgFhHWtMGJwY4afUFjCTeHC_StvO8CXTEhFug45JEWSjCBHtlX-W5CE")`,
                  }}
                ></div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-lg">
                      Traditional Spa &amp; Flower Bath
                    </h4>
                    <p className="text-slate-500 text-sm">
                      Full-day relaxation experience in Ubud
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <span className="material-symbols-outlined text-[18px] fill-1">
                        star
                      </span>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        4.9 (120 reviews)
                      </span>
                    </div>
                    <span className="font-bold text-primary">$45 / person</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary/50 transition-all cursor-pointer">
                <div
                  className="size-24 rounded-lg bg-cover bg-center shrink-0"
                  data-alt="Surfer catching a wave in Canggu Bali"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuD9kOYJlWSAVMR1hv-6SYb6HPak0NLTkimehfFTAkfJnBOijyBl6IZo8mOQ6zlJOiMegzpSuFkHyoJ4SAoOB8w2rACmMER9wRjcfyQCXIYn376gdK3SU8A6zmreDBvjooBYJc5abzV6D9DFvWmVksI3VMt-GGmfSiNjJcH_Y1Uots45JWO-BlUQB5D0sFKKligR6WCoAypszQiy1xLPNl5XSKNvS_7nn5Bb-N1BAsTPZtBgLikC6EkbCDwnl8ZZLlqa89g9TtC-MeU")`,
                  }}
                ></div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-lg">
                      Beginner Surf Lesson in Canggu
                    </h4>
                    <p className="text-slate-500 text-sm">
                      2-hour lesson with certified instructors
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <span className="material-symbols-outlined text-[18px] fill-1">
                        star
                      </span>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        4.8 (340 reviews)
                      </span>
                    </div>
                    <span className="font-bold text-primary">$25 / person</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* <!-- Sidebar Content --> */}
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
                  <p className="text-slate-500 text-sm">
                    {data.data.languages}
                  </p>
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
      </div>
    </main>
  );
};

export default DestinationDetailsPage;
