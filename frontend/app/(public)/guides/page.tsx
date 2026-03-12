"use client";

import {
  ArrowRight,
  Camera,
  ChevronDown,
  Filter,
  Flag,
  Globe,
  Mail,
  Search,
  Star,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Guides() {
  const guides = [
    {
      id: 1,
      name: "Marco Rossi",
      location: "Rome, Italy",
      specialty: "History Expert",
      rating: 5.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDNYVYVy45mZeXYotgj4SEnxtHBh1CsIcxRVCImRnRVu-v-qT5UvNOs3LdORiRx6VmOXgAJDhEcisBxoeg8a17E1lCo-QxFKINopAEt_obnT3OZhtmF7FR562cbMgo78J20HMmvNtgaD85KxE3vSCcyvhYTk9304fDSNqIbIM0cc9UmYBenSOrD-7-O9PpnZI_8cGLaDuRuqI63ioflqPb3bwXz8JLHwExKf6YhsmDVRpJblO52XDBKghdC_i2ovAD5ZkstZ9I85ME",
      tags: ["Gaudí Architecture", "Tapas Tour"],
      quote:
        "I've lived in the Gothic Quarter for 15 years and know every secret alleyway and best tapas bar...",
    },
    {
      id: 2,
      name: "Elena Petrova",
      location: "Athens, Greece",
      specialty: "Archeology",
      rating: 4.9,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDTqVyCCME4GFoWzwV8WmRMYevYJn3NRHub-OrmwKYaI9TbAsTdr34BdA9xTapi3sqFUPmw_VXd4J_fAe7GYFDwHz9Jjl9RYcYtVAbi-ADK4ak_BpmcoC4Uh-NGxp37sTS9GW3j1aRu04u48Pn17vlzPh2K9eyZjiP-bmTDPuu7--o_32eSxXNSoqwpf1AUDikYRUH1BHUnbg-VtGXaIupnePe0BQfmZI5H412XWx81n2yvXJEC3gYXFXP3HMiBLATDoGMjm-3Fwmg",
      tags: ["Art History", "Louvre Specialist"],
      quote:
        "Join me for a journey through the evolution of French art, from the Medieval eras to Modernism.",
    },
    {
      id: 3,
      name: "Kenji Tanaka",
      location: "Kyoto, Japan",
      specialty: "Tea Ceremony",
      rating: 5.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA0ujDiamAimqt1lcf4Ms0TbqprLndOKs25kmZMTR9CgW68LwLKSte7uZoySfqSquXA56eb17V5ITGoH_GPFBkKpRSUDsnKZNU8j35LL-2_CPHJ5X-R3VXKxNrM_Gv5xrkLsTXt8Xpsl_CIboTzsQTCnUWx4oDcG4lcds1pyVfcWEPUyPePiFmfx-NXdhX4VhTf2z2Lu79NSBlN5r8aiV218jbPMbqGrqmHN7BbMOUsIYE-qDefmZsVPSj9l-WBapCqAdfPbupnkQo",
      tags: ["Architecture", "Tea Ceremony"],
      quote:
        "Experience the traditional ways of Kyoto with a guide who understands every detail.",
    },
    {
      id: 4,
      name: "Sarah Jenkins",
      location: "London, UK",
      specialty: "Food & Drinks",
      rating: 4.8,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDmY-TJDc0HgE3fmNRxdzu4cMmkP_nTgeBD8VOWTcnJPSXBjK-DOpAakyTcItzDp-1A6U2HAzxSzNLXbIJsQ4u7fALeyfzB0WZ_6wjFwY9aTTNotY-XNyVyI6coNPqQxZTcOVxIR1fltwxx138b1q23vP_8IjuqPzBBO8Lp0e-p5g1k-U8cABHq8Y3ptunsh4kk9FdG25LLcwamgDf5PIxOcN_QEJ7P1C5LF7p0aYi29YQMciWIrWs3O2BsSpkeNn7zdDngGophP1I",
      tags: ["Food & Drinks", "London Tour"],
      quote:
        "Discover the hidden gems of London's food scene with an expert who knows every corner.",
    },
  ];

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

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <main className="flex-1 w-full px-6 md:px-20 py-10">
          {/* Hero / Search Section */}
          <div className="mb-12">
            <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
              Local Experts
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mb-8">
              Discover and book the most knowledgeable guides for your next
              adventure. Authentic experiences led by locals who love their
              city.
            </p>
            <div className="w-full max-w-3xl">
              <div className="relative flex items-center gap-2">
                <Search className="absolute left-4 text-slate-400 w-5 h-5" />
                <div className="w-full flex-1">
                  <Input
                    className="pl-12 pr-30 h-14 text-base w-full flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-0"
                    placeholder="Search by city or expertise (e.g. History, Foodie, Street Art)"
                    type="text"
                  />
                </div>
                <Button className="absolute right-2">Find Guides</Button>
              </div>
            </div>
          </div>

          {/* Top Rated Guides Horizontal Scroll */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-slate-900 dark:text-white text-2xl font-bold">
                Top Rated Guides
              </h2>
              <Link
                className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline"
                href="#"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              {guides.map((guide) => (
                <div key={guide.id} className="flex-none w-72 group">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-3">
                    <Image
                      alt={guide.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={guide.image}
                      fill
                      sizes="(max-width: 768px) 100vw, 288px"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      {guide.rating}
                    </div>
                  </div>
                  <h3 className="text-slate-900 dark:text-white font-bold text-lg">
                    {guide.name}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    {guide.location} • {guide.specialty}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* All Guides Grid */}
          <section className="mb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h2 className="text-slate-900 dark:text-white text-2xl font-bold">
                Explore All Guides
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Filter
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  Sort: Popular <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allGuides.map((guide) => (
                <div
                  key={guide.id}
                  className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex p-5 gap-4">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        alt={guide.name}
                        className="rounded-lg object-cover"
                        src={guide.image}
                        fill
                        sizes="96px"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-slate-900 dark:text-white font-bold">
                          {guide.shortName}
                        </h3>
                        <div className="flex items-center gap-1 text-sm font-bold">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          {guide.rating}
                        </div>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mb-3">
                        {guide.location}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {guide.tags.map((tag) => (
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
                      "{guide.quote}"
                    </p>
                    <Button className="w-full">View Profile</Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Button variant="outline" className="px-8 py-3 text-base">
                Load More Guides
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
