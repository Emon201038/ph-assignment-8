import GuideSearch from "@/components/module/guide/GuideSearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Filter, Search } from "lucide-react";
import Head from "next/head";
import React from "react";

export default function GuidesLayout({
  children,
  topGuides,
}: {
  children: React.ReactNode;
  topGuides: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
          <main className="flex-1 w-full px-6 md:px-20 py-10">
            {/* Hero / Search Section */}
            <section className="mb-12">
              <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
                Local Experts
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mb-8">
                Discover and book the most knowledgeable guides for your next
                adventure. Authentic experiences led by locals who love their
                city.
              </p>
              <div className="w-full max-w-3xl">
                <GuideSearch />
              </div>
            </section>
            {topGuides}
            <section className="mb-20">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h2 className="text-slate-900 dark:text-white text-2xl font-bold">
                  Explore All Guides
                </h2>
                {/* <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="w-4 h-4" /> Filter
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    Sort: Popular <ChevronDown className="w-4 h-4" />
                  </Button>
                </div> */}
              </div>
              {children}
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
