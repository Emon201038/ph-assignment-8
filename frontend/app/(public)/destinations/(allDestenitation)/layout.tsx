import DestinationFilterClearBtn from "@/components/module/destination/DestinationFilterClearBtn";
import DestinationSearch from "@/components/module/destination/DestinationSearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import React from "react";

const layout = ({
  children,
  nearby,
}: {
  children: React.ReactNode;
  nearby: React.ReactNode;
}) => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <main className="flex flex-col">
          {/* Hero Search Section */}
          <section
            className="relative h-125 w-full overflow-hidden flex items-center justify-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/images/destination_hero.png')`,
            }}
          >
            <div className="relative z-10 w-full max-w-4xl px-6 md:px-20 flex flex-col items-center text-center gap-6">
              <h1 className="text-white text-4xl md:text-6xl font-black tracking-tight drop-shadow-lg">
                Discover Your Next Paradise
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl font-medium drop-shadow-md">
                From hidden mountain escapes to vibrant city centers, find the
                perfect spot for your next journey.
              </p>
              {/* Search Bar */}
              <DestinationSearch />
            </div>
          </section>
          {/* Category Pills */}
          {/* <section className="w-full px-6 md:px-20 py-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Browse by Type</h3>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
              <Button className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-white px-6 md:px-20 py-2 shadow-md">
                <Grip className="text-lg" />
                <span className="text-sm font-semibold">All</span>
              </Button>
              <Button
                variant="outline"
                className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 md:px-20 py-2 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all"
              >
                <Umbrella className="text-lg" />
                <span className="text-sm font-semibold">Beach</span>
              </Button>
              <Button
                variant="outline"
                className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 md:px-20 py-2 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all"
              >
                <MountainSnow className="text-lg" />
                <span className="text-sm font-semibold">Mountain</span>
              </Button>
              <Button
                variant="outline"
                className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 md:px-20 py-2 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all"
              >
                <Building2 className="text-lg" />
                <span className="text-sm font-semibold">City</span>
              </Button>
              <Button
                variant="outline"
                className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 md:px-20 py-2 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all"
              >
                <MountainSnow className="text-lg" />
                <span className="text-sm font-semibold">Desert</span>
              </Button>
              <Button
                variant="outline"
                className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 md:px-20 py-2 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all"
              >
                <Trees className="text-lg" />
                <span className="text-sm font-semibold">Nature</span>
              </Button>
              <Button
                variant="outline"
                className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 md:px-20 py-2 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all"
              >
                <Church className="text-lg" />
                <span className="text-sm font-semibold">Culture</span>
              </Button>
            </div>
          </section> */}
          {/* Trending Destinations Grid */}
          <section className="w-full px-6 md:px-20 py-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Trending Destinations
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  Most loved places by our travelers right now.
                </p>
              </div>
              <DestinationFilterClearBtn />
            </div>
            {children}
          </section>

          {/* Featured Destinations Banner */}
          <section className="w-full px-6 md:px-20 py-10">
            <div
              className="relative rounded-3xl overflow-hidden h-87.5 flex items-center p-8 md:p-16 bg-no-repeat bg-center bg-cover"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(17, 21, 33, 0.9) 0%, rgba(17, 21, 33, 0.2) 100%), url('/images/destination_banner.png')`,
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
          {nearby}
          {/* Newsletter Section */}
          <section className="bg-primary/5 dark:bg-primary/10 py-16 px-6 md:px-20 mt-10">
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
      </div>
    </div>
  );
};

export default layout;
