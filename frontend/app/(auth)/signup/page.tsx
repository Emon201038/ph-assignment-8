"use client";

import Link from "next/link";
import { Map, Users, Shield } from "lucide-react";
import SignupForm from "@/components/module/auth/SignupForm";
import Image from "next/image";

export default function SignupPage() {
  const handleSignupSubmit = (data: {
    formData: {
      fullName: string;
      email: string;
      password: string;
      gender: string;
      agreeToTerms: boolean;
    };
    interests: string[];
  }) => {
    console.log("Signup data:", data);
    // Handle signup logic here
  };

  return (
    <main className="flex flex-1 justify-center py-8 md:py-12 px-4 md:px-0">
      <div className="layout-content-container flex flex-col max-w-250 w-full gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Side: Content & Inspiration */}
          <div className="flex flex-col gap-6">
            <div className="@container">
              <div className="overflow-hidden rounded-xl h-80 relative shadow-lg group">
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                <Image
                  fill
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="/images/signup_banner.png"
                  alt="Group of friends hiking on a sunny mountain peak"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <p className="text-white text-3xl font-black leading-tight tracking-tight">
                    Join a community of explorers
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                  <Map className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    Book unique local experiences
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Access hidden gems and private tours led by passionate
                    locals who know their cities best.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Connect with travelers</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Share your journey, find travel buddies, and get real-time
                    advice from our global community.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Travel with confidence</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Verified hosts and secure payments ensure your adventures
                    are safe and worry-free.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Sign-up Form */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h1 className="text-2xl font-bold mb-2">
              Create your traveler profile
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
              Start your journey with TourBuddy today.
            </p>

            <SignupForm onSubmit={handleSignupSubmit} />

            <div className="relative flex items-center gap-4 my-8">
              <div className="grow border-t border-slate-200 dark:border-slate-800"></div>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                Or sign up with
              </span>
              <div className="grow border-t border-slate-200 dark:border-slate-800"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                className="flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                type="button"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  ></path>
                </svg>
                <span className="text-sm font-semibold">Google</span>
              </button>

              <button
                className="flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                type="button"
              >
                <svg
                  className="w-5 h-5 text-[#1877F2]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                </svg>
                <span className="text-sm font-semibold">Facebook</span>
              </button>
            </div>

            <p className="mt-8 text-center text-slate-600 dark:text-slate-400 text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-bold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
