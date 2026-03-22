"use client";

import { Compass, Globe, Clock, Star } from "lucide-react";
import GuideSignupForm from "@/components/module/auth/GuideSignupForm";

export default function GuideSignupPage() {
  const handleFormSubmit = (data: any) => {
    // Handle form submission here
  };

  return (
    <main className="flex-1 flex flex-col items-center">
      {/* Hero Section */}
      <div className="w-full max-w-300 px-6 md:px-10 py-8 md:py-12">
        <div className="@container">
          <div className="@[480px]:py-3">
            <div
              className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-slate-800 rounded-xl min-h-80 relative"
              style={{
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 60%), url('/images/guide_signup_banner.png')`,
              }}
            >
              <div className="flex p-8 flex-col gap-2">
                <h1 className="text-white tracking-tight text-3xl md:text-5xl font-black leading-tight">
                  Join the TourBuddy Guide Community
                </h1>
                <p className="text-slate-200 text-lg max-w-2xl">
                  Turn your local knowledge into a thriving business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats/Value Props */}
      <div className="w-full max-w-300 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
          <div className="flex flex-col gap-3">
            <div className="text-primary">
              <Compass className="w-10 h-10" />
            </div>
            <p className="text-slate-900 dark:text-white text-2xl font-black leading-tight tracking-tight">
              Turn your passion into a career
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal">
              Monetize your expertise and create unforgettable experiences for
              curious travelers.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-primary">
              <Globe className="w-10 h-10" />
            </div>
            <p className="text-slate-900 dark:text-white text-2xl font-black leading-tight tracking-tight">
              Reach travelers worldwide
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal">
              Our platform connects you with millions of explorers from over 190
              countries.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-primary">
              <Clock className="w-10 h-10" />
            </div>
            <p className="text-slate-900 dark:text-white text-2xl font-black leading-tight tracking-tight">
              Work on your own terms
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal">
              You set your own prices, schedule, and tour capacity. You're the
              boss.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-12">
          <div className="flex min-w-39.5 flex-1 flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <p className="text-slate-600 dark:text-slate-400 text-base font-medium leading-normal">
              Active Travelers
            </p>
            <p className="text-primary tracking-tight text-3xl font-bold leading-tight">
              500k+
            </p>
          </div>

          <div className="flex min-w-39.5 flex-1 flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <p className="text-slate-600 dark:text-slate-400 text-base font-medium leading-normal">
              Countries
            </p>
            <p className="text-primary tracking-tight text-3xl font-bold leading-tight">
              45+
            </p>
          </div>

          <div className="flex min-w-39.5 flex-1 flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <p className="text-slate-600 dark:text-slate-400 text-base font-medium leading-normal">
              Guide Rating
            </p>
            <div className="flex items-center gap-2">
              <p className="text-primary tracking-tight text-3xl font-bold leading-tight">
                4.9/5
              </p>
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="max-w-3xl mx-auto w-full px-6 mb-12 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        <GuideSignupForm onSubmit={handleFormSubmit} />
      </div>
    </main>
  );
}
