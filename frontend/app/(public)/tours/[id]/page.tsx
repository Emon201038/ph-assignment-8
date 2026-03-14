import {
  Clock,
  Globe,
  MapPin,
  Star,
  Trees,
  Users,
  Sofa,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { serverFetch } from "@/lib/server-fetch";
import { ITour } from "@/interfaces/tour.interface";

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await serverFetch.get(`/v2/tours/${id}`);
  const data: { data: ITour } = await res.json();

  return (
    <main className="flex-1">
      {/* <!-- Hero Section --> */}
      <div className="relative h-112.5 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          data-alt="High quality aerial view of Tokyo city skyline at sunset"
          style={{
            backgroundImage: `url(${data.data.image})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="relative h-full max-w-300 mx-auto px-6 flex flex-col justify-end pb-12">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 inline-block max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-primary px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-white">
                {data.data.category}
              </span>
              <div className="flex items-center text-yellow-400">
                <Star className="h-4 w-4" />
                <span className="text-white text-sm font-bold ml-1">
                  {data.data.rating} ({data.data.reviewCount || 0} Reviews)
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {data.data.title}
            </h1>
            <div className="flex items-center gap-2 text-white/90">
              <MapPin size={18} />
              <span className="text-lg font-medium">
                {data.data.destination.city}, {data.data.destination.country}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Content Grid --> */}
      <div className="max-w-300 mx-auto px-6 py-10 grid grid-cols-1  gap-10">
        {/* <!-- Left Column: Details --> */}
        <div className="lg:col-span-2 space-y-12">
          {/* <!-- Quick Info Tabs --> */}
          <div className="border-b border-slate-200 dark:border-slate-800 sticky top-20 bg-primary-foreground dark:bg-background-dark z-40 py-2">
            <div className="flex gap-8 overflow-x-auto no-scrollbar">
              <Link
                className="text-primary font-bold border-b-2 border-primary pb-2 whitespace-nowrap"
                href="#about"
              >
                About
              </Link>
              <Link
                className="text-slate-500 hover:text-primary pb-2 whitespace-nowrap transition-colors"
                href="#included"
              >
                What's Included
              </Link>
              <Link
                className="text-slate-500 hover:text-primary pb-2 whitespace-nowrap transition-colors"
                href="#expect"
              >
                Expectations
              </Link>
              <Link
                className="text-slate-500 hover:text-primary pb-2 whitespace-nowrap transition-colors"
                href="#reviews"
              >
                Reviews
              </Link>
            </div>
          </div>
          {/* <!-- About Section --> */}
          <section className="scroll-mt-24" id="about">
            <h2 className="text-2xl font-bold mb-4">About This Tour</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              {data.data.description}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm flex flex-col justify-center items-center">
                <Clock className="text-primary mb-2" />
                <p className="text-xs text-slate-500 uppercase font-bold">
                  Duration
                </p>
                <p className="font-semibold">{data.data.durationDays} days</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm flex flex-col justify-center items-center">
                <Users2 className="text-primary mb-2" />
                <p className="text-xs text-slate-500 uppercase font-bold">
                  Max Size
                </p>
                <p className="font-semibold">{data.data.maxGroupSize} People</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm flex flex-col justify-center items-center">
                <Globe className="text-primary mb-2" />
                <p className="text-xs text-slate-500 uppercase font-bold">
                  Languages
                </p>
                <p className="font-semibold">
                  {data.data.destination.languages.join(", ")}
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm flex flex-col justify-center items-center">
                <Trees className="text-primary mb-2" />
                <p className="text-xs text-slate-500 uppercase font-bold">
                  Theme
                </p>
                <p className="font-semibold">{data.data.category}</p>
              </div>
            </div>
          </section>
          {/* <!-- Available Trips --> */}
          <section className="scroll-mt-24 mt-12" id="available-trips">
            <h2 className="text-2xl font-bold mb-8">Available Trips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Trip Card 1 */}
              {data.data.trips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm flex flex-col"
                >
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xs font-bold uppercase text-primary mb-1">
                          {trip.status}
                        </p>
                        <h3 className="text-xl font-bold">
                          {new Date(trip.startDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </h3>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          ${trip.price}
                        </p>
                        <p className="text-[10px] text-slate-500 uppercase">
                          per person
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Users className="w-[18px] h-[18px] text-slate-400" />
                        <span>Max {trip.maxGuests}Guests</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Sofa className="w-[18px] h-[18px] text-slate-400" />
                        <span>
                          {trip.maxGuests - trip.bookedSeats} Seats Left
                        </span>
                      </div>
                    </div>
                    <div className="mb-6">
                      <p className="text-xs font-bold uppercase text-slate-500 mb-2">
                        What's Included
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {trip.includes.map((i) => (
                          <span
                            key={i.title}
                            className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs"
                          >
                            {i.title}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-700">
                      <div className="flex items-center gap-3">
                        <div
                          className="size-8 rounded-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${trip.guide.avatar})`,
                          }}
                        ></div>
                        <div>
                          <p className="text-xs text-slate-500">Lead Guide</p>
                          <p className="text-sm font-bold">{trip.guide.name}</p>
                        </div>
                      </div>
                      <button className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* <!-- Tour Itinerary --> */}
          <section className="scroll-mt-24" id="itinerary">
            <h2 className="text-2xl font-bold mb-8">Tour Itinerary</h2>
            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              {/* Item 1 */}
              {data.data.itineraries.map((i) => (
                <div key={i.title} className="relative flex items-start">
                  <div className="absolute left-0 flex size-10 items-center justify-center rounded-full border-4 border-background-light dark:border-background-dark bg-primary">
                    <div className="size-2 rounded-full bg-white"></div>
                  </div>
                  <div className="ml-16">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Day - {i.dayNumber}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {i.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                      {i.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* <!-- Reviews Section --> */}
          <section className="scroll-mt-24" id="reviews">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Reviews</h2>
              <button className="text-primary font-bold text-sm hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {/* <!-- Review Card 1 --> */}
              <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-12 rounded-full bg-cover"
                      data-alt="Portrait of a female traveler smiling"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDmlNe73hDjw9uJs1eFOwwif_54VTUUxXkGuol-8_F4muMx7pmYgZ9p7uYwofzCx3tJ_b_BIqdY7SpZYMpEFFKKXe4Z9gA6_Qmt5sTHPVWkXUylmsBUjUsEVk4L3dcKQLo6jR_iPWboaRCUKh4ViboqZvn_rHO6gkRFSm1dD9zRR1N5qee2msNFPL4W5xn4q0AquPYu48euRMUgDDGnK4MycDKMr9cpEd1ESIwedg_LB8PS7myydduMFob0Mt-owXSp31gXUGsRSk')",
                      }}
                    ></div>
                    <div>
                      <h5 className="font-bold">Sarah Jenkins</h5>
                      <p className="text-xs text-slate-500">
                        London, UK • June 2023
                      </p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 gap-1">
                    <Star className="w-[18px] h-[18px] fill-current" />
                    <Star className="w-[18px] h-[18px] fill-current" />
                    <Star className="w-[18px] h-[18px] fill-current" />
                    <Star className="w-[18px] h-[18px] fill-current" />
                    <Star className="w-[18px] h-[18px] fill-current" />
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  "The best tour I've ever taken in Tokyo. Our guide Kenji was
                  incredibly knowledgeable and showed us hidden gems we would
                  never have found on our own. The snacks were delicious!"
                </p>
              </div>
              {/* <!-- Review Card 2 --> */}
              <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-12 rounded-full bg-cover"
                      data-alt="Portrait of a male traveler with glasses"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCTbu3p27FjAnB_OBLttpnMZ7zrBdKsnx3x2V0QhyV8Hb-fO-5VTWo_VeEXamKs_KLRGWQkJAeNCbJTWxj4hu_dY-CYwm8TtPH4K0f6rbd3XHBRM-uitLmI95yMkQIzN5sMUwH_SOJmyH9fjtmcuJvGPWlpzVaOLtFM4VO_YoXibbpPxZKO-boFcMM4x9LXJuOkk4buQT8srgtPtXD0H6cOU8J7msnrE9WyzLcgq4PiZtAIz7DWxX9E2pXiuaAF1b-QpaKuqVMkjEU');",
                      }}
                    ></div>
                    <div>
                      <h5 className="font-bold">Mark Thompson</h5>
                      <p className="text-xs text-slate-500">
                        Sydney, AU • May 2023
                      </p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 gap-1">
                    <Star className="w-[18px] h-[18px] fill-current" />
                    <Star className="w-[18px] h-[18px] fill-current" />
                    <Star className="w-[18px] h-[18px] fill-current" />
                    <Star className="w-[18px] h-[18px] fill-current" />
                    <Star className="w-[18px] h-[18px]" />
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  "Very well paced and informative. I loved the balance between
                  history and modern life in the neighborhood. Highly recommend
                  for history buffs."
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
