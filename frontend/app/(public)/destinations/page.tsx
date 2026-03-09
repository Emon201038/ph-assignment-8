import {
  Building2,
  Calendar,
  Camera,
  ChevronRight,
  Church,
  Grip,
  Heart,
  Mail,
  MapPin,
  Medal,
  MountainSnow,
  Search,
  Share2,
  Star,
  Trees,
  Umbrella,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Destinations() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        {/* Navigation */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark px-6 md:px-10 py-3 sticky top-0 z-50">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-primary">
              <div className="size-6">
                <svg
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">
                TourBuddy
              </h2>
            </div>
            <nav className="hidden md:flex items-center gap-9">
              <Link
                className="text-primary text-sm font-bold leading-normal border-b-2 border-primary"
                href="#"
              >
                Destinations
              </Link>
              <Link
                className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors"
                href="#"
              >
                Tours
              </Link>
              <Link
                className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors"
                href="#"
              >
                Deals
              </Link>
              <Link
                className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors"
                href="#"
              >
                About
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 justify-end gap-4 md:gap-8">
            <label className="hidden lg:flex flex-col min-w-40 h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-slate-100 dark:bg-slate-800">
                <div className="text-slate-500 flex items-center justify-center pl-4">
                  <Search size={16} />
                </div>
                <Input
                  className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent placeholder:text-slate-500 px-4 pl-2 text-base font-normal focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 outline-none shadow-none"
                  placeholder="Search destinations"
                />
              </div>
            </label>
            <Button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold transition-opacity hover:opacity-90">
              <span>Sign Up</span>
            </Button>
          </div>
        </header>
        <main className="flex flex-col">
          {/* Hero Search Section */}
          <section
            className="relative h-[500px] w-full overflow-hidden flex items-center justify-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuD8Ox1r4KRUMckco---NmtMHU65kordxDwcrKOg5f_04RKqgsG9Rs-haoFYg08eamam-HOklQVbCwZ9TmnLVE_Uh_yXXNdxBcHjffPPDNbgdgB7kEX472gZHyGrSIqU0C4WscbBvno1m_q_6eAcXaIfLlqQYFcXbY6mhXL-BgpNVO7p5oElnlLHmuXIfrTLfc9iIoZ5NgP_cgMJKmAmL405BDVJ9HVMH43HMKeon1U12d9-4WcMv78x8Dgf1Z7d8lcsO9uHsZpexS8')`,
            }}
          >
            <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center gap-6">
              <h1 className="text-white text-4xl md:text-6xl font-black tracking-tight drop-shadow-lg">
                Discover Your Next Paradise
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl font-medium drop-shadow-md">
                From hidden mountain escapes to vibrant city centers, find the
                perfect spot for your next journey.
              </p>
              {/* Search Bar */}
              <div className="w-full max-w-2xl bg-white dark:bg-background-dark p-2 rounded-xl shadow-2xl flex flex-col md:flex-row gap-2 mt-4">
                <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 py-3 md:py-0">
                  <MapPin />
                  <Input
                    className="w-full border-none bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 outline-none shadow-none"
                    placeholder="Where are you going?"
                    type="text"
                  />
                </div>
                <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 py-3 md:py-0">
                  {/* <span className="material-symbols-outlined text-primary">
                    calendar_month
                  </span> */}
                  <Calendar className="text-primary" />
                  <Input
                    className="w-full border-none focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 outline-none shadow-none bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                    placeholder="When?"
                    type="text"
                  />
                </div>
                <Button className="bg-primary text-white font-bold py-3 md:py-0 px-8 rounded-lg hover:bg-blue-700 transition-colors h-10">
                  Explore
                </Button>
              </div>
            </div>
          </section>
          {/* Category Pills */}
          <section className="max-w-7xl mx-auto w-full px-6 py-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Browse by Type</h3>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
              <Button className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-white px-6 py-2 shadow-md">
                <Grip className="text-lg" />
                <span className="text-sm font-semibold">All</span>
              </Button>
              <Button
                variant="outline"
                className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 py-2 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all"
              >
                <Umbrella className="text-lg" />
                <span className="text-sm font-semibold">Beach</span>
              </Button>
              <Button
                variant="outline"
                className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 py-2 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all"
              >
                <MountainSnow className="text-lg" />
                <span className="text-sm font-semibold">Mountain</span>
              </Button>
              <Button
                variant="outline"
                className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 py-2 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all"
              >
                <Building2 className="text-lg" />
                <span className="text-sm font-semibold">City</span>
              </Button>
              <Button
                variant="outline"
                className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 py-2 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all"
              >
                <MountainSnow className="text-lg" />
                <span className="text-sm font-semibold">Desert</span>
              </Button>
              <Button
                variant="outline"
                className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 py-2 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all"
              >
                <Trees className="text-lg" />
                <span className="text-sm font-semibold">Nature</span>
              </Button>
              <Button
                variant="outline"
                className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 py-2 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all"
              >
                <Church className="text-lg" />
                <span className="text-sm font-semibold">Culture</span>
              </Button>
            </div>
          </section>
          {/* Trending Destinations Grid */}
          <section className="max-w-7xl mx-auto w-full px-6 py-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Trending Destinations
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  Most loved places by our travelers right now.
                </p>
              </div>
              <Button
                variant="ghost"
                className="text-primary font-bold flex items-center gap-1 hover:underline"
              >
                View all <ChevronRight className="text-lg" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    alt="Bali, Indonesia"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVC_jIU8Rae28oc4zkdYebCTzvjTf0L6amlJnDaBvPvg7k9dKo-cXIbnzjyyw8mT0sYB42Y7UGSO4zJYaMqDc_E7kbLZhn9eau8BhJtlg4jc43oXtsvguVtl5SNWJa36k_iVwQQlrlK_fQrDdDozBDn-RkPdQzFOGOSe27AtXGmx6BQemACPBqJzHPozGQ9HYNZnDEcU9sAFQlyhWVJoUb0VIvp1E8JWeczJb74y_jyAxqkHnRv74RkN2ABp1qb9rgd8uAHLXfFbQ"
                    fill
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full p-2 cursor-pointer shadow-md">
                    <Heart className="text-pink-500 text-xl" />
                  </div>
                  <div className="absolute bottom-3 left-3 bg-primary/90 text-white text-xs font-bold px-2 py-1 rounded">
                    TRENDING
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-bold">Bali, Indonesia</h4>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-bold">4.9</span>
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">
                    Tropical paradise known for its forested volcanic mountains,
                    iconic rice paddies and beaches.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-slate-900 dark:text-slate-100 font-bold">
                      From $850
                    </span>
                    <Button
                      variant="ghost"
                      className="text-primary font-bold text-sm"
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </div>
              {/* Card 2 */}
              <div className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    alt="Venice, Italy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXUtuMSSHHqpzAD5ldyWR3LIKfqp1umfy0o5XgkxJMwN9Q5GiMfAq2yCUbFL_EEwwxz9Tni41S-kjeXeDXvT3W6Il-xlTF261O778PnK1veXqaNCeNBpuSDW9Hs18fr03pK1btX65dDTl9erZjPJhw2dMMoyGTF5yVHtbZ75VRGZ00Br0Q23cCt6pJr4py1VX7QnDNH3dKtBtJaUh11ATCQNdd9r_p-hMteizzuORfMxsOS_6cpQmwzHRm-_d-Py6i0wfOiaJZIeo"
                    fill
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full p-2 cursor-pointer shadow-md">
                    <Heart className="text-pink-500 text-xl" />
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-bold">Venice, Italy</h4>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-bold">4.8</span>
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">
                    The romantic city of canals, historic bridges, and stunning
                    architecture.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-slate-900 dark:text-slate-100 font-bold">
                      From $1,200
                    </span>
                    <Button
                      variant="ghost"
                      className="text-primary font-bold text-sm"
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    alt="Kyoto, Japan"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6hkMSTEJIh5pNMxPtD1QGJicNZ7IyNkl7TuVkn4xDYLuEXaOsmNafmouiazpXCTYI-WKUlyLUz09rEgH5A2bCevRsDJhfbHVBRE9uiDnm-3OZ3KZptjF9ARD27bnxpV_N5xplfiKKp6Mw0Q7rBkS3UmX1ff3MNh84mU-wwRNKE27EtkFTkCUp56GDjHBQfPdWW5PYx4Tz5pK2Ahza6lE8pkqS8l_D8QrOTMiBEd1jEhYbmkWGEfQgHGV4xExmzghymXFjMlsXJ8o"
                    fill
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full p-2 cursor-pointer shadow-md">
                    <Heart className="text-pink-500 text-xl" />
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-bold">Kyoto, Japan</h4>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-bold">4.9</span>
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">
                    Famous for its numerous classical Buddhist temples, as well
                    as gardens and imperial palaces.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-slate-900 dark:text-slate-100 font-bold">
                      From $990
                    </span>
                    <Button
                      variant="ghost"
                      className="text-primary font-bold text-sm"
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </div>
              {/* Card 4 */}
              <div className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    alt="Santorini, Greece"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfLOjMehwgKACv1ZfFG5MeqAc1rrSAKA1rBbe3tm3xi0kMEHlK-mqgrSRBO_suPVGBgXSBNi1hOPF__z1OOLHom7CxboemIXsJw4N9HuhwlmKARj8tJZlOC5CV4qTLZ_sgVDTYvvJy_HpMoW5XAA6k3U7DFOoy4nc5bCFZrQPyI-U3KfM3Ay6sLnXVVr0lb9ZMeKDxYWLUGfZWlXeunFPy-Ld2oegReyNikdx2Wu9D6XS0llbiqdmtBQf8AGTwO9m6ziVX2Lsc1nc"
                    fill
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full p-2 cursor-pointer shadow-md">
                    <Heart className="text-pink-500 text-xl" />
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-bold">Santorini, Greece</h4>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-bold">4.7</span>
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">
                    Breathtaking views of the Aegean Sea from white houses
                    perched on high cliffs.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-slate-900 dark:text-slate-100 font-bold">
                      From $1,150
                    </span>
                    <Button
                      variant="ghost"
                      className="text-primary font-bold text-sm"
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Featured Destinations Banner */}
          <section className="max-w-7xl mx-auto w-full px-6 py-10">
            <div
              className="relative rounded-3xl overflow-hidden h-[350px] flex items-center p-8 md:p-16 bg-no-repeat bg-center bg-cover"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(17, 21, 33, 0.9) 0%, rgba(17, 21, 33, 0.2) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuB4qW6pBtH0O6hz4QSGZ95pl8XZF12VbBb1lLp3FWt9ul29CHJUYTZGbmbLKsFPh4oftt3nUvLeznztQG3iQjqYublTgtz-EnUNLrX0EYWQ71l-gCF8IQvJqxDf3Ds4zQ79EP1rEY82hN0BQbnwJutwHJE_4jQ5htYnNHMDytOwhWt9keA510bnu-Q1LfCIR7R5kRkayT4-eROdRjJjhP8fE5XwIfWbguEQOLi44tcOpBKQd4qD-cwnPzNkKTRIGRC6E98CY04cb7M')`,
              }}
            >
              <div className="relative z-10 max-w-lg flex flex-col gap-4">
                <h2 className="text-white text-3xl md:text-4xl font-black">
                  Escape to the Wild
                </h2>
                <p className="text-slate-200 text-lg">
                  Book our exclusive mountain retreats this winter and get 20%
                  off on all guided treks.
                </p>
                <Button className="w-fit bg-primary text-white font-bold px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all">
                  Explore Nature
                </Button>
              </div>
            </div>
          </section>
          {/* More Destinations Grid */}
          <section className="max-w-7xl mx-auto w-full px-6 py-10">
            <h2 className="text-2xl font-bold mb-8">Popular Nearby</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Large Card 1 */}
              <div className="relative rounded-2xl overflow-hidden group h-80">
                <Image
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5RIe7nX_WMU3TCG5aiA15PhsMEFLse6LruXRUxsLhwqZgtT4nPzmRSE7J49orG_N9uRNSDVfy0pKkMRlAT3vwSUqp34Wnrjd2hpOO2mnOXQe_OlgUAmh4mwqjp6vaLH66TeKrzoLxurZHfcZPMTN3mUrvBnI-VXgipmC45GWuGjEX0Pku8iJX7wFkpRtX6_LqQJENojlORlKMlODAgBwaa1PRTTUl1jK_JDUleFV3IAb7CuGY_-MLYChG-CFakBoNvPtvRHtns9c"
                  fill
                  alt="banff_canada"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-2 block">
                    North America
                  </span>
                  <h3 className="text-2xl font-bold">Banff, Canada</h3>
                  <p className="text-slate-200 text-sm mt-1 max-w-xs">
                    Crystal clear lakes and majestic Rocky Mountain peaks.
                  </p>
                </div>
              </div>
              {/* Large Card 2 */}
              <div className="relative rounded-2xl overflow-hidden group h-80">
                <Image
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9nVTCeLmq84csuWhvUXKcwzs1X2Ym10XyqM_uiEL2Vm1bapdj32vbCsWNsKq3SWFQB2X_36FiqBa2aD9zdDTmXcnvHzhtE_SLh1E3PxKn8zgRLF_AWyOAabyCY-hBWYYwoDiyi8NEhQXyMuqyW9ujLWsFdXZgR-R10aazMFMSKN5cAJDEWiSfd73C2kGlAtSUBeJMUcSHGtK8B7IeZt3Lur-QAQRLBeYfuUV7Mh6L0Xjty29k-N-AgV5KE9TEqPBSgzAjdNI4c7g"
                  fill
                  alt="paris_france"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-2 block">
                    Europe
                  </span>
                  <h3 className="text-2xl font-bold">Paris, France</h3>
                  <p className="text-slate-200 text-sm mt-1 max-w-xs">
                    The city of light, art, fashion and gastronomy.
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* Newsletter Section */}
          <section className="bg-primary/5 dark:bg-primary/10 py-16 px-6 mt-10">
            <div className="max-w-4xl mx-auto text-center flex flex-col gap-6">
              <Mail size={48} className="mx-auto text-2xl" />
              <h2 className="text-3xl font-bold">
                Get Travel Inspiration in Your Inbox
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Join 50,000+ travelers and get the best deals and tips delivered
                weekly.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 mt-2 ">
                <div className="w-full ">
                  <Input
                    className="rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus-visible:outline-none focus:ring-0 outline-none shadow-none px-4 py-3 focus-visible:ring-0 shrink-0 grow w-full! h-10"
                    placeholder="Your email address"
                    type="email"
                  />
                </div>
                <Button
                  className="bg-primary text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 w-auto h-10"
                  type="submit"
                >
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-slate-400">
                We care about your data. See our Privacy Policy.
              </p>
            </div>
          </section>
        </main>
        {/* Footer */}
      </div>
    </div>
  );
}
