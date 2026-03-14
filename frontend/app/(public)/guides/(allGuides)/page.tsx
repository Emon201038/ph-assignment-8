import { Star } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { serverFetch } from "@/lib/server-fetch";
import { IResponse } from "@/interfaces";
import { IUser } from "@/interfaces/user.interface";
import { IGuide } from "@/interfaces/guide.interface";
import TablePagination from "@/components/shared/TablePagination";
import Link from "next/link";

interface GuidesProps {
  topGuides: ReactNode;
}

export default async function Guides({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const allGuides = [
    {
      id: 1,
      shortName: "Julian V.",
      name: "Julian",
      location: "Barcelona, Spain",
      rating: 4.9,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD_H3nCvqrqbGXrhEVstqYgnKsfsYRB-w2g1UTCfZEHVBwtA7yCgNzNTJSP9dlKoNNZG3G6zZ-69NYXVLFYMRPsZgrJbFuMpIsMR9vwJtvnk6UkqIc1r6b4y-CUEVqBthSmTTF0su98mQFzg6RImhpCYOwNRrZeh_MyI72tYmvvrLIp4D9xgTYl6wIMN9tqxw368pQkX-jUe0IM5bTk8BiSVMLbqXQHHsDYUlXUGmIFMT0UfuRtuUmVz7RWh05Se4SlLB3pn3792vs",
      tags: ["Gaudí Architecture", "Tapas Tour"],
      quote:
        "I've lived in the Gothic Quarter for 15 years and know every secret alleyway and best tapas bar...",
    },
    {
      id: 2,
      shortName: "Amara L.",
      name: "Amara",
      location: "Paris, France",
      rating: 5.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC3N2x_LaJNmGt3jkRBpbUEvjoD1WMTJkLI_Z6Du7dlF7vAXNryydR1MuvUo9D7XRyaEKnNloxspWdQfDJLZudSEZAv7_eft1MjT_F58NcHDcoCL1kwV0A0X8afL6M4Mi42btnzebXqHVIoUdX8_g3eQLtM97fk2kjxmyjtz_5wnHRrORNKynjEaVomUNP0dvX7VYwede_waPHv9ydAZHuJCLfqhlKQdjtZfqz8LYDQgZvSeGa6s0JtatCez7NvHrd6TT3cCeFnKI0",
      tags: ["Art History", "Louvre Specialist"],
      quote:
        "Join me for a journey through the evolution of French art, from the Medieval eras to Modernism.",
    },
    {
      id: 3,
      shortName: "David S.",
      name: "David",
      location: "New York, USA",
      rating: 4.7,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBPFq5dfXMQWCMWhoCdF157Hyhv3qzyzGgChRCyIZNMCPA6HPGlaM6fEcPdbGedS64mcKLhgBVEqJqwiUFKL1V7UXAT-eBZnECNn37q2-dSdaiGnWnhhhLatPsuIkEFHt6iyGnBAGMYt9uSiL3xxdeDyCTc4vRH41k2dWuoIqFM2v8C6Lw4mmUh4w5PXYuLhq2AD2WnQXp-DCzq0vRMMyO8It3g_Dpgff5shpEuXfRtylhzz9ljUBGGOcgidxHFxnjOeImuFJYsAYI",
      tags: ["Street Art", "Brooklyn Local"],
      quote:
        "Discover the hidden murals of Bushwick and the untold stories of NYC's underground scene.",
    },
    {
      id: 4,
      shortName: "Mei W.",
      name: "Mei",
      location: "Shanghai, China",
      rating: 4.9,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD8aljptXxZ97aZrjAV-K-IaXPgj2jR-RB-40EeiI4XVBKHulub-_7Q8EdkS9Gu94No9Sc58s_GiuJy2YnCufRBsiRU271GfR5H6PcwqT3RMXYbIZd-9cBKVr3HFSU4m6PsHjjSDZVs1DZA2Bbaqlj3qFgS2L5ryZJqaGyEww2Z8V11MAt_Qm1f9eq-LDnVTZOqoS1Ab9v781iNT-lfLLcSUyPgOJSZTb5JKyr5Ys-JLnNjwEVMsCBMgxBwyPuFFE55AEw4hso25w4",
      tags: ["Old Town", "Architecture"],
      quote:
        "Contrast the historic shikumen houses with the futuristic skyline of Pudong with me.",
    },
    {
      id: 5,
      shortName: "Thomas K.",
      name: "Thomas",
      location: "Berlin, Germany",
      rating: 4.8,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDQYOIW7ssejmwuqovLaavOCttROjdkf69jmaWAzcKTtJexaqx6sRZL6yBwJSYnsjIJvqKPxtVzWvZNfdZgj_TcmySe44uuymfYEf1fGTi6Lspswic2GPvSV_t0JKzNeNO0jSLg51bkK7rVlWX1fk7SVGZjmkPo9k-3R08tGmqniBxreX_imTOP1RHRFw4DLDtTJ1O8Q5kM3CbuourJAqwnM0Ox18JheTM_H1zsHiu6AmM0cJffGxBFDtWPKmwJGbCOT7RKOzcbbSs",
      tags: ["Cold War History", "Nightlife"],
      quote:
        "Understanding the Wall and the reunification. Deep dives into Berlin's complex 20th century.",
    },
    {
      id: 6,
      shortName: "Fatima Z.",
      name: "Fatima",
      location: "Marrakech, Morocco",
      rating: 5.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBjr7cas0PpHLcqyw9S1OXcASSxdDutXtpRZdgqYeVEE7QdwsDMcok1byTYfmkvAnxM82Wba1VRTJwIRivm-SxvZNsttbUNMR770l7eWAyc_X_0Su1cZK1zgGXbdzGqz1x00Ixf0piT9Lq-jULwLEFh-cccz2e6Uj0UJkqNQ0rRSX_bVGkjZeNLEth8v0tGAFpDHHkl56ldMHhYqfBQs-MTMc5k_tDfxhQ7t1qezDaCxaJhUh_8M8ztZcVOOzJFTLVtPikoToQXMBc",
      tags: ["Souks Expert", "Moroccan Cooking"],
      quote:
        "Let's navigate the labyrinth of the Medina together and find the best artisan workshops.",
    },
  ];

  const { page = 1, limit = 6, ...params } = (await searchParams) || {};

  const res = await serverFetch.get(
    `/v2/users?page=${page || 1}&limit=${limit || 10}&role=guide&${new URLSearchParams(params as Record<string, string>).toString()}`,
  );
  const data: IResponse<IUser<IGuide>[]> = await res.json();
  return (
    <>
      <div
        id="all_guides"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {data.data.map((guide) => (
          <div
            key={guide.id}
            className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex p-5 gap-4">
              <div className="relative w-24 h-24 shrink-0">
                <Image
                  alt={guide.name}
                  className="rounded-lg object-cover"
                  src={guide.avatar || "/images/default_avatar.png"}
                  fill
                  sizes="96px"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-slate-900 dark:text-white font-bold">
                    {guide.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm font-bold">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    {guide.guideProfile.rating}
                  </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs mb-3">
                  {guide.city}, {guide.country}
                </p>
                <div className="flex flex-wrap gap-1">
                  {guide.guideProfile.specialties.map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-5 pb-5">
              <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 italic mb-4">
                "{guide.guideProfile.aboutMe}"
              </p>
              <Link
                href={`/guides/${guide.id}`}
                className="w-full py-2 flex justify-center items-center bg-primary text-primary-foreground rounded-md"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <TablePagination
          currentPage={data.meta?.page as number}
          totalPages={Math.ceil(
            Number(data.meta?.total || 0) / Number(data.meta?.limit || 10),
          )}
          limit={Number(data.meta?.limit)}
          target="#all_guides"
        />
      </div>
    </>
  );
}
