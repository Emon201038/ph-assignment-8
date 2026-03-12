import DestinationSearch from "@/components/module/destination/DestinationSearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  BadgePercent,
  Bike,
  BookOpenText,
  Calendar,
  CalendarCheck,
  Camera,
  Headphones,
  Heart,
  Landmark,
  MapPin,
  Mountain,
  Search,
  ShieldCheck,
  Star,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  const destinations = [
    {
      id: 1,
      location: "Bali, Indonesia",
      experiences: 120,
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCr0sTPaDajmy9CjjSLDRk1r0CH2ujv572ryTLNSeRzw_TaJM64mUXJpzqmqF5ZZ9JuEEZ9p5KgMRYg7nEcHsdvVUdFH9xdGZvQUF6g4UQaRXXgZovv1XaDirCtG6ZEjCNbtR-695qEuaCGhPlcDq4lO7N5YVZu3pycbQTpom6wZRtX44aVrIM4GAwS-w-PbfSNu-vaKH0lzpF5ddH5TZ1C2XYUAroECVOtGR5ioDDYEWntvuzIIj2jgV34qQ8u_KqOEajFzUb1b-s",
    },
    {
      id: 2,
      location: "Kyoto, Japan",
      experiences: 85,
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDCFxNAxum9AxwZiTPATLoL3226xC4wK-Z8vVCfkJY1XpakZMmL68mfYYeNY6DUpnJ8g9aQnApZhe4_QVd5Emo-iywXB5iT7kOKaHLBIjUFwE9W8_-_SqdFEDcHCBVUIvCwP-iVX0Z3V-SsAspzsmmXl8uVaCMo7i4fs1QtMi5d0uCwWgLl_xgTohobgNoyMZlCYkzECgRxC2fE0QydLy9-vLtRR8nls0xOrpoczrH0nF14956yZ1pWK1WVsqmeonmqxELH68PWDBA",
    },
    {
      id: 3,
      location: "Santorini, Greece",
      experiences: 65,
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCYM-SuOIsbXhAfZopfrRwM-YIWmGuecEavgnS167XV0uueXEtlEn7aRqLBOZymGSTpq_o7oq3RXIV7yjUGXLWAMIAxDxgSNWGWZLX4LgsDPu4VtkW0hxxrXb5wgIdI2tmHu25fsZfqcV3kyJUKQ4qrMqhnJSRfN4MqAe_BLPQ0kkXVoqHk3fCw7fEcHQFoBM4i4bcyPE0NAYNgCV1VeVjycRg8ZJzZKqk1lAAHnCFRs2ATdqH30N3zOovNLjZn5FN6yKmFNFtgOuI",
    },
    {
      id: 4,
      location: "Venice, Italy",
      experiences: 110,
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC57e2dUCfNHjsaC7cUmxlAXf3pNvoFOu-b7Jn5_dJb5ewUTFed60tmuMwUBji0zCe_P9oHi0GC0aD2f2KgxfyYFz-54yFJygqtmPOwl41BEVZvh156Ruq87h1ZGfGsvxDU_T9naOi6W9fb8qX-fwxLadoWtDiZtgWQd9QMrbu51PJV8T5o7U7t9LcHYeaFWa1VwD64AezORS0LxrR3u_fdPFRfsV62lRkWlPLzPdmMMVwSv18KLaozoSZcspr8CyjzerCTyVUW0fw",
    },
  ];
  const interests = [
    {
      name: "Nature",
      Icon: Mountain,
    },
    {
      name: "History",
      Icon: BookOpenText,
    },
    {
      name: "Photography",
      Icon: Camera,
    },
    {
      name: "Cultural",
      Icon: Utensils,
    },
    {
      name: "Culture",
      Icon: Landmark,
    },
    {
      name: "Adventure",
      Icon: Bike,
    },
  ];
  const experience = [
    {
      name: "Private Romantic Dinner on a Secret Beach",
      location: "Uluwatu, Bali",
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDuLKC0uV5rKCpylSJbWAxohE461RQyH1tIiSrRYuefXSeCweowd6tjHDXATAHj5geegqtd1z9oaNpPV9BH5uiYOWdRqZ_kW9_cLYFXZIwgeOkf7y_KH3Htsx_m6QHcXFrz6_WTpxN8mLUNi3oFc-u9-QxQA9_G_f2UUKYC3XGN9E1JvK1qxHdp3YL4CQdW1p7P5HS7hC_SMFfWESVFRDYywB5KciXqMIaYYM-RzZmW5OD5tYjgpAgXQl4coEe4jqyAxp7P3AL4uH4",
      rating: 4.9,
      ratingCount: 128,
      price: 85,
      duration: "3 Hours",
      isFavourite: false,
    },
    {
      name: "Authentic Homemade Pasta Class with a Chef",
      location: "Rome, Italy",
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBIWbBIKTN_uGSp-3Tbr7sxJLKdVd4JaOa1lo2iUwvunkmAUxHNYfDeuATJPh_pD9I3SUoIj7s5QqQiB0wZAJ8RbN_8jkoCYtzX0bgO5Uz0i3tqpBcF9NJM2dE8NhUADZBW33cOB5LLY2-wmb4KSJTYwEf0KJT69ldr8Crm6q9xRPYue_4S3-Ncr-anlHkpzZvyYm19bpy4gWfj7FZDYd43he8TBf1T4T9rPHiIWhql7qIsyq09cdfzACkEjrWpTN795N0ahkDk86s",
      rating: 5,
      ratingCount: 245,
      price: 65,
      duration: "4 Hours",
      isFavourite: true,
    },
    {
      name: "Night Market Street Food Exploration Tour",
      location: "Kyoto, Japan",
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBNDTGilw9h7ROey54i2KSP3ns0zUDChNgTf3UI6fhT2974Yq4vGO-_v2mUwk7zukUYjjSC15HKEBi33B4HSbO5xvFz8q0DiaRjU-UbYBQ6JhU4YPy3lqOU8MYBJwhCUGGMMM_L4xRLuLHlTwIa1N7PwVlJ9Fxd_C_lpy_DQVoYRB-S-3-8QSARvLK2kOHRfCPKijKoo0ph78lTKMfKX52njolMt5U60TnA8dNcMrL5l70siYf6BFl-XXdog0x87sz1CgfwL1k450s",
      rating: 4.8,
      ratingCount: 312,
      price: 45,
      duration: "2.5 Hours",
      isFavourite: true,
    },
  ];
  const guides = [
    {
      name: "Marco Rossi",
      location: "Florance, Italy",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCpEN_BETXf_uBvWQeXz7dVPLrpHYN6-6m6-HeFk1dXevQsfc_ItvO9G3lyyN8Vlep65aSoQdP349rUzZOmLwhsfXzR6qTD1_SW46kyz2zGjRAvFXzFNf5f7MZBY_Jm20dTy1u7qUKJqryZR71YvIuQsjfPdFJwF4r8bSbXwvGVc7Y9U9XNyZyyGlAZPbuVMehQYH-RMve0hJ15REJuwz7YkauyB99keZSetL75ynUSugjAme3a2DD8PXqRsOqF9iOCY9rex4gzAh8",
      ratting: 4.9,
    },
    {
      name: "Yuki Tanaka",
      location: "Tokyo, Japan",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCQKP0Z7drT2H2O8RbhXs3sZUxY0MokoC_FxTVP7h2sVk56vJGEAXz5CNTIjl5q9kwCTrTix_2kW1q-ZKXIecEp_aSa9H9FaaS3vgPjNLPcqyeYcwjsUouaKVc19C876lOWj9xYS_0cEV5BQBh2dcjzxxy61vHOFBjFHeo4Etstq4p_oIK6bXlvgx_MwfmePrp3fpvvL6V1-IbLKz3XgvaMU0ZIXjTiwfqGgLbncA7gxVK9tEiOo85xBVwdHMqNu-xQ-G5VUbwE7jw",
      ratting: 5,
    },
    {
      name: "Alex Johnson",
      location: "London, UK",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC6LUMln70RRewcsKp29DzqY3mnRKqTfmL5dyTly1ybomDyVryyR4sWE5A1k-xJgAXMAlR0sI8O0VRDdSQrlhLUcToDnKDYq-FLi282jdUZgoxZ8wlM_aFydbq3Yaa114wbd7B-9nMkLhcKerL5Y3fpsmc_wg1WYvzdn5zOlkg4aDF25s9DNvbqCJdxNmrwBB8T2fbRqaOWzE9QBvxdf11DaZznP-5OXbBe0clM0HrsS-2i1PFJKIz_glmWWPFAJhzGr8RAH9FzBIg",
      ratting: 4.9,
    },
    {
      name: "Sofia Garcia",
      location: "Madrid, Spain",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB2SqDHSS57MAKWcubXnGlu3esGqPF8kAPY-lT6b5aTknKTKRo1US9UZ1ZOXQ52RetT3j_ZqLgp_pjCU_X3QJHhupuKwpZuQ5KMXV-28jxWbcD1P46N1Y9mVQ1lo5gzeQMaPThUa27-zuQatHRSYqpwFVcu_PBPbtLYbO6AVZIqtcogqWyd-65sqHY2jgVFy-cDoq_-wEjeKOzKkpuWU0AX9Lgd2sUB-AMCcsIzWbPPVquoke7P738S_hufDHwb9WYQH5zrq4wh6U",
      ratting: 4.9,
    },
  ];
  const howItWorks = [
    {
      name: "Choose Experience",
      description:
        "Browse hundreds of unique activities curated by local experts.",
    },
    {
      name: "Book Safely",
      description:
        "Secure your spot with easy payment and instant confirmation.",
    },
    {
      name: "Meet Your Guide",
      description: "Show up, have fun, and experience the city like a local!",
    },
  ];
  const benifites = [
    {
      name: "Verified Guides",
      description: "Every guide background-checked and vetted.",
      Icon: ShieldCheck,
    },
    {
      name: "Fair Pricing",
      description: "Best price guarantee for authentic experiences.",
      Icon: BadgePercent,
    },
    {
      name: "24/7 Support",
      description: "We're here to help you every step of the way, anywhere.",
      Icon: Headphones,
    },
    {
      name: "Flexible Booking",
      description: "Easy cancellation and rescheduling options.",
      Icon: CalendarCheck,
    },
  ];
  const testimonials = [
    {
      user: {
        name: "Sarah Miller",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAknQqj0t51FPmblDWYuWxneYpsRojBUKKyNIGlg0LZjWRWb2J0EZGN3yu_n70Dl_fZSRwYLsWHXUrt_3sAWRhnH2dR2DbC6F-kEPVFE-E7oIyRG-hm2avws03E__yZkeemqbKyLAOXgKQL7vOgzT9mmFy3q0_IJYi6mUrQijlIMB-DW69U8Wl5-SWN58naWV8kbBoJ8VmN3Enu9DshqaqgycfEZxiYbhuI8iIAFCwps_uOTjjHEKuyAjhnE6Djy1RraZr4JybBUa4",
        country: "USA",
      },
      comment:
        "The street food tour in Tokyo was the highlight of our trip. Our guide Yuki took us to places we would never have found on our own. Truly authentic!",
      rating: 5,
    },
    {
      user: {
        name: "James Thompson",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuC00eVU5dVHHgqRqrJ2y_2EDmTavkfrVrwAocuZtzT58zpH8MoIYVRGo6VnHo-FtSV2IlSrJnVC3CfYIOCtzTp6RsryhEqpKsFXMsl6ukHKWPneLucSLQTS7AsV7UJV52nh_MLlklNpIHbzke7UWtafJQjxTGfAmYHir3ZP_FP_GWmjx5yHYWpcAxhw2x8Ad_Cce4RYh-Rx8kHmsfSRKa-THMUPiYEDsjBqR_5ZljdItoRGUUCK5rawCpeDQq_84-BqfGRRSDwKFeg",
        country: "UK",
      },
      comment:
        "Marco was an incredible guide in Florence. His knowledge of Renaissance art was mind-blowing, and he made the museum visit so engaging even for our kids.",
      rating: 5,
    },
    {
      user: {
        name: "Elena Rodriguez",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBqM2jXJi5y3PmtkjAIeNgbv2QiucBfEGrnU0HVN_UBMi0HJFlGWkbv8WxXOiSYv5PM--Z_5yrZ6EFGn7uepT1xdIkeYic60Sv8zwALdoSnlKo-8qJr-70eEpmEAiPZJWDGvo7HIO26YsQxGmR6UVk3ViNw2aF86xLi3y-Q2-m1xeofpK_FwEhgUAV6vuPnZNYSM_8kJXmVRcKLLyLspKB58Nu_zY8G4t0l7Jzu8sEQlK_mvNCATDapbwn-hyGhXVinEvDqD1fLp8s",
        country: "Spain",
      },
      comment:
        "Booking through TourBuddy was seamless. The private beach dinner in Bali was perfectly organized and way beyond our expectations. 10/10!",
      rating: 5,
    },
  ];
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {/* Top Navigation Bar */}

        <main className="flex flex-col">
          {/* Hero Section */}
          <section className="relative px-4 py-10 md:px-20 md:py-16">
            <div
              className="relative flex min-h-130 flex-col gap-8 items-center justify-center rounded-2xl overflow-hidden px-6 text-center bg-slate-900"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBx69fmi2Ht3QWUUpnIaEnEtkywOOo28l_Kv_XSTftpa31PyVASoKfUdImlL-gN9SwfJOaej7YDlOiWhBFwDIbM1aUKAbSNqFYVUkw2-OQeRe51H-J89jrQKa9dS1xFlL-bLep6StDyE1CS0CO8wp8WGkRUyOdrogEIll8dVkt-v9gacFk8tMGVPaFHvchEMeSm54L9gkxPVaABUlf1z7PVM3JtpgNUDSY6r9tfYBkPhnK9CYCfiMAyU7LxvwX6SbwYoGS9F0VrwIA")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="flex flex-col gap-4 max-w-3xl">
                <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">
                  Explore the World with Local Experts
                </h1>
                <p className="text-slate-200 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                  Discover unique experiences and hidden gems with passionate
                  local guides who know their city best.
                </p>
              </div>
              <DestinationSearch target="/tours" />
            </div>
          </section>
          {/* Explore by Interest */}
          <section className="px-6 md:px-20 py-10">
            <h2 className="text-slate-900 dark:text-white text-2xl font-bold mb-8">
              Explore by Interest
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {interests.map((i) => (
                <div
                  key={i.name}
                  className="flex flex-col items-center gap-3 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <i.Icon className="text-3xl" />
                  </div>
                  <span className="font-semibold">{i.name}</span>
                </div>
              ))}
            </div>
          </section>
          {/* Popular Destinations */}
          <section className="px-6 md:px-20 py-10 bg-slate-50 dark:bg-slate-800/50">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-slate-900 dark:text-white text-3xl font-bold">
                  Popular Destinations
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">
                  Handpicked places for your next adventure
                </p>
              </div>
              <Link
                className="text-primary font-bold flex items-center gap-1 hover:underline"
                href="#"
              >
                View all <ArrowRight className="w-4 h-4 text-primary" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {destinations.map((d) => (
                <div
                  key={d.id}
                  className="group cursor-pointer relative overflow-hidden rounded-2xl aspect-3/4 shadow-lg"
                >
                  <Image
                    fill
                    alt="Bali"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={d.thumbnail}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <p className="text-white text-xl font-bold">{d.location}</p>
                    <p className="text-slate-200 text-sm">
                      {d.experiences}+ Experiences
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Top-Rated Experiences */}
          <section className="px-6 md:px-20 py-16">
            <h2 className="text-slate-900 dark:text-white text-3xl font-bold mb-10">
              Top-Rated Experiences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Experience Card */}
              {experience.map((e) => (
                <div
                  key={e.name}
                  className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-shadow group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      fill
                      alt={e.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={e.thumbnail}
                    />
                    <Button
                      variant={"ghost"}
                      className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
                    >
                      <Heart
                        fill={e.isFavourite ? "currentColor" : "none"}
                        className="text-pink-500"
                      />
                    </Button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1 text-slate-500 text-sm mb-2">
                      <MapPin className="w-4 h-4 " />
                      <span>{e.location}</span>
                    </div>
                    <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-3">
                      {e.name}
                    </h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 font-bold text-slate-900 dark:text-white">
                          {e.rating}
                        </span>
                        <span className="ml-1 text-slate-400 font-normal">
                          ({e.ratingCount})
                        </span>
                      </div>
                      <span className="text-slate-300">|</span>
                      <span className="text-slate-500 text-sm">
                        {e.duration}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-50 dark:border-slate-800 pt-4">
                      <p className="text-slate-900 dark:text-white font-black text-xl">
                        From ${e.price}{" "}
                        <span className="text-sm font-normal text-slate-400">
                          / person
                        </span>
                      </p>
                      <button className="bg-primary/10 text-primary font-bold py-2 px-4 rounded-lg hover:bg-primary hover:text-white transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Meet Our Top Guides */}
          <section className="px-6 md:px-20 py-16 bg-slate-50 dark:bg-slate-800/50">
            <div className="text-center mb-12">
              <h2 className="text-slate-900 dark:text-white text-3xl font-bold mb-4">
                Meet Our Top Guides
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Expert locals ready to share their passion and knowledge with
                you.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {guides.map((g) => (
                <div key={g.name} className="flex flex-col items-center">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-4 ring-4 ring-white dark:ring-slate-900 shadow-xl relative">
                    <Image
                      fill
                      alt={g.name}
                      className="w-full h-full object-cover"
                      src={g.avatar}
                    />
                  </div>
                  <h4 className="font-bold text-lg">{g.name}</h4>
                  <p className="text-primary text-sm font-semibold">
                    {g.location}
                  </p>
                  <div className="flex items-center mt-2 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold text-slate-700 ml-1">
                      {g.ratting}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* How It Works */}
          <section className="px-6 md:px-20 py-16">
            <h2 className="text-slate-900 dark:text-white text-3xl font-bold text-center mb-16">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-1/4 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-slate-200 dark:border-slate-800 -z-10"></div>
              {howItWorks.map((item, index) => (
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-xl">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.name}</h3>
                  <p className="text-slate-500">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
          {/* Why Choose Us */}
          <section className="px-6 md:px-20 py-16 bg-slate-900 text-white rounded-3xl mx-4 md:mx-20 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Why Choose TourBuddy?
                </h2>
                <p className="text-slate-400 text-lg mb-8">
                  We connect you with the heartbeat of every city through people
                  who live and breathe its culture.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {benifites.map((i) => (
                    <div key={i.name} className="flex gap-4">
                      <div className="text-primary">
                        <i.Icon className="text-3xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">{i.name}</h4>
                        <p className="text-slate-400 text-sm">
                          {i.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img
                  alt="Group travel"
                  className="rounded-2xl shadow-2xl"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4qEdvd_2fvC5bV9TqWI4WqX9_M3w5lv9-4PxrHPcutNb9Mm0p_uvUwiw10fIVViJXjlgEOZ8Hqx6Wu9rRlejPVu0X4VV34AjGYNj5NmMSmNaQWlxsK6Q4tC9t2nxB8YaxrJ3hpBzRL4P0TRSObZH5HfVDl9R6ro2VW0gchkI9zdMn2j794uwGAdsNX5_HQOuHJvyl2foWVkQRcC4ULwA5RFRD3ISG_P3Ht5bUQDQl7V34uSJS7mDZWvzZJq7FaXvfP5G3Ptwj8BQ"
                />
                <div className="absolute -bottom-6 -left-6 bg-primary p-6 rounded-2xl shadow-xl hidden md:block">
                  <p className="text-3xl font-black">10k+</p>
                  <p className="text-sm font-semibold text-slate-200">
                    Happy Travelers
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* Testimonials */}
          <section className="px-6 md:px-20 py-16">
            <h2 className="text-slate-900 dark:text-white text-3xl font-bold text-center mb-16">
              What Travelers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm"
                >
                  {/* Rating */}
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`material-symbols-outlined ${i + 1 >= testimonial.rating ? "" : "fill-current"}`}
                      >
                        star
                      </Star>
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-slate-600 dark:text-slate-400 italic mb-6 leading-relaxed">
                    "{testimonial.comment}"
                  </p>

                  {/* User */}
                  <div className="flex items-center gap-4">
                    <Image
                      width={48}
                      height={48}
                      src={testimonial.user.avatar}
                      alt={testimonial.user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold">{testimonial.user.name}</p>
                      <p className="text-slate-400 text-xs">
                        {testimonial.user.country}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Become a Guide CTA */}
          <section className="mx-6 md:mx-20 my-16 bg-primary rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="p-10 lg:p-20 lg:w-3/5 text-white">
                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                  Turn Your Passion Into a Career
                </h2>
                <p className="text-blue-100 text-lg mb-10 leading-relaxed">
                  Join our global community of local experts and share the soul
                  of your city with travelers from around the world. Set your
                  own schedule, prices, and build your brand.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-primary font-bold py-4 px-10 rounded-xl shadow-lg hover:scale-105 transition-transform">
                    Apply to Guide
                  </button>
                  <button className="bg-blue-600 text-white font-bold py-4 px-10 rounded-xl border border-blue-400 hover:bg-blue-700 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
