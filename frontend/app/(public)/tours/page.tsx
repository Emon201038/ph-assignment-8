import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Star,
  Heart,
  ChevronRightIcon,
  ChevronLeftIcon,
  DollarSign,
  ChartBarStacked,
  Globe,
  Map,
  SortAsc,
  Clock,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import ToursFilter, {
  SheetFilters,
} from "@/components/module/tour/ToursFilter";
import ToursChip from "@/components/module/tour/ToursChip";
import TourSorting from "@/components/module/tour/TourSorting";
import { serverFetch } from "@/lib/server-fetch";
import { ITour } from "@/interfaces/tour.interface";
import { IResponse } from "@/interfaces";
import Pagination from "@/components/module/tour/TourPagination";
import TablePagination from "@/components/shared/TablePagination";

const ToursPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  if (!searchParamsObj.limit) searchParamsObj.limit = "6";
  // const queryString = queryStringFormatter(searchParamsObj);
  // const tours = await getTours(queryString);
  const res = await serverFetch.get(
    `/v2/tours?${new URLSearchParams(searchParamsObj as Record<string, string>).toString()}`,
  );
  const data: IResponse<ITour[]> = await res.json();

  const tours = [
    {
      id: 1,
      title: "Classic Rome & Colosseum Tour",
      category: "Cultural",
      location: "Rome, Italy",
      price: 120,
      rating: 4.9,
      reviews: "1.2k",
      duration: "4 Hours",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA8CmSY6poiJ8XFpeTy88BVufDintRbUDyf3hrzOpQ8fr6i2x8Z0zOvTeNhl4E3rdD08zLptrdSnBbbNrj_GbjTKulnEo9fQoLNMUS-p1K35jVZDXZZe7j-ksb-qXWod7bX6C1sSq8h9asZQbhQK7qmV0fln6m6PIbaXzljZ_naNnVkbx4kNI8Q2QCBpUO5JE7rIGn8WyObd5v4M2HwfsVmLaSyR7M--XSU8ELgScn55CLCSdzh6NQfVNxf5LZj1oTRTU3bOy8PhRg",
      description:
        "Explore the ancient wonders of the Roman Empire with an expert guide and skip-the-line access.",
    },
    {
      id: 2,
      title: "Kyoto Traditions & Zen Gardens",
      category: "Sightseeing",
      location: "Kyoto, Japan",
      price: 85,
      rating: 4.8,
      reviews: "850",
      duration: "1 Day",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCfL2UF2bfg-iZanVk5pqeK7xOlY0F8-_QZdoDRoOQPEIhuI3JkZfB-muoOdmb2ICD2nB2PPe4fRyU0A431g_ds2TtzdOG-eoigLlmKR8_QnKm8ye_m21j8zIci8FfnAnrDSg3-axcmDmMcpD1zGQzqgNoGGLJWSjfmQoz6uTqhL7yxLE9GT06F5svPSWzAg5Tq9P7GM9bqlAQ94TQO3Vnwvlsj8_kHfsIKvF4rSJaqVRAxFQ4zNmECT4zoQHijKFZlUxby6WdOstw",
      description:
        "Immerse yourself in the spiritual heart of Japan with visits to iconic shrines and traditional tea houses.",
    },
    {
      id: 3,
      title: "Seine River Dinner Cruise",
      category: "Luxury",
      location: "Paris, France",
      price: 250,
      rating: 5.0,
      reviews: "2.4k",
      duration: "3 Hours",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBErf42HX4tq8yzwkoJNbHvL4ET2AZjEG_LBx2Qmav5Pz5Am_peZXKanx2ZtcST9e4YPTglXAI1ywMpCZJ0F7NYX3e1TMpznwjppdHyT2NP_fuAalvqW6YtA7klkN_gkI5aVwtPqGHXvPzGCMRCMtmpGoZaf-nxi71wMqRd-MPGsS6HdKeFwlrpCPCMU3OwY_jAyx7_Elx8tzHPeROE19zaZFY_H3APSRykWXgSx-zdDvBzmwbf_UnXWQZs0d45FpxJWBndpd42AgA",
      description:
        "Enjoy a gourmet 5-course dinner while drifting past the illuminated monuments of the City of Light.",
    },
    {
      id: 4,
      title: "Cinque Terre Coastal Hike",
      category: "Adventure",
      location: "Cinque Terre, Italy",
      price: 145,
      rating: 4.7,
      reviews: "320",
      duration: "8 Hours",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBnzzqf7DqHreGuGdwEn3MuFdhBejbUyz8-ivUmJvVToAd75jD7Yg-y_BXRFrpukOxieyxFWBiZTyjGHB9Zh3pJfTJiD2RwykRWFRqhCgPLj-mlZX9YuHoe1cofMWD_gH20DuG1qun16ZdC6Q1Ftj4uB-aQh2YGSJ0Lrt7GhLlQf3X7bVWxBEZy9fjsXSh0EKb701crc6Ya6YZN4Ti_g0RcT_9aY600VMDN2twBkeMT37bw8OVHJi7iuJyQzT-AC18HX3NQtQ_fzLA",
      description:
        "Hike the famous blue trail connecting the five spectacular coastal villages of the Italian Riviera.",
    },
    {
      id: 5,
      title: "Hidden Gems: Tokyo Street Food",
      category: "Food & Drink",
      location: "Tokyo, Japan",
      price: 95,
      rating: 4.9,
      reviews: "1.5k",
      duration: "3 Hours",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDlYYWHXkP6oyjnbaSgnB4hBrjtmegV0PMecQgFfWgrauA078_XVR6dezv6lwJMaS_2owRcrHIjAAEjJT-1AWxz3FcGKaZgO6qVM1b3fGW80U2pAkrLirL_VMeI6JqgKQmhdQ6Gy5tHX7Mfo1iA61cehk9I1Ef_aYsO3v_6npRvsfNvF1Clrp93-MpOnLZ-F4flnE2ShD1oA5hHvW66Y8qO-QhWE_W6iIgEdM3tkzEy-5iYY0ITqS-Nb3AuPbwEFT7jTkZE3rK90W4",
      description:
        "Discover back-alley eateries and taste the best local ramen, gyoza, and yakitori in the heart of Tokyo.",
    },
    {
      id: 6,
      title: "Santorini Sunset Catamaran",
      category: "Luxury",
      location: "Santorini, Greece",
      price: 180,
      rating: 4.8,
      reviews: "640",
      duration: "5 Hours",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAnlGlTssOOukBqqsqKVVxv5dZ_KzUOcz0Ve2HLI9cpAZXrguvC1WL3XJqk5-5qrQA-UCVjduX4ftssRtOPkfhrFxU-fnxQR5OWKlOCUkagGUAc737PlYQuPDeJ1DpNWsCPaJ1xHohAh56IS7ELekSFP4UbjSxZcxrBHYiLfWOcTuI1X1Aw-TH90kTFNZYdeZYGJPn8J72PZzyZ9F5ERqsvfI7Xhwr1VEiststkaDDQWD2jj3mYgBnoty2kYJmIv39OeCw_nRJ8Cis",
      description:
        "Sail around the caldera, swim in volcanic hot springs, and watch the world-famous Oia sunset from the water.",
    },
  ];
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <main className="w-full px-6 md:px-20 py-8">
        {/* <!-- Breadcrumbs--> */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
                Explore Our Tours
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Discover a wide range of tours for your next adventure.
              </p>
            </div>
            <div className="flex md:justify-between items-center gap-4">
              <div className="md:hidden">
                <SheetFilters />
              </div>
              <TourSorting />
            </div>
          </div>
        </div>
        {/* <!-- Quick Filter Chips --> */}
        {/* <ToursChip /> */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* <!-- Sidebar Filters --> */}
          <aside className="w-full hidden md:block lg:w-72 shrink-0 space-y-8">
            <ToursFilter />
            {/* <!-- Promo Card --> */}
            <div className="md:hidden relative overflow-hidden rounded-xl bg-primary p-6 text-white">
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-2">Get 20% Off</h4>
                <p className="text-primary-20 text-sm mb-4">
                  Book your first tour today and save big on your next
                  adventure.
                </p>
                <button className="w-full rounded-lg bg-white py-2 text-sm font-bold text-primary">
                  Use Code: TOUR20
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-20">
                <span className="material-symbols-outlined text-9xl">
                  confirmation_number
                </span>
              </div>
            </div>
          </aside>
          {/* <!-- Tours Grid --> */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {data.data.map((tour) => (
                <div
                  key={tour.id}
                  className="group flex flex-col overflow-hidden rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      fill
                      alt={tour.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      data-alt={tour.title}
                      src={tour.image}
                    />
                    <div className="absolute top-4 left-4 rounded-full bg-white/90 dark:bg-slate-900/90 px-3 py-1 text-xs font-bold text-primary shadow-sm">
                      {tour.category}
                    </div>
                    <Button
                      variant={"ghost"}
                      className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-600 hover:text-red-500 shadow-sm transition-colors"
                    >
                      <Heart size={15} />
                    </Button>
                    <div className="absolute bottom-4 left-4 rounded-lg bg-primary px-3 py-1 text-sm font-bold text-white shadow-lg">
                      From ${tour.priceFrom}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="size-4" />
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {tour.rating}
                        </span>
                        <span className="text-xs font-medium text-slate-500">
                          ({tour.reviewCount || 0})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                        <Clock className="size-4" />
                        <span className="text-xs font-medium">
                          {tour.durationDays} days
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">
                      {tour.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">
                      {tour.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                      <Link
                        href={`/tours/${tour.id}`}
                        className="w-full text-center rounded-lg border-2 border-primary text-primary px-4 py-2 text-sm font-bold hover:bg-primary hover:text-white transition-all"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <Pagination
              meta={{
                limit: data.meta?.limit as number,
                page: data.meta?.page as number,
                total: data.meta?.total as number,
              }}
            /> */}
            <div className="mt-12">
              <TablePagination
                currentPage={data.meta?.page as number}
                totalPages={Math.ceil(
                  Number(data.meta?.total) / Number(data.meta?.limit),
                )}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ToursPage;
