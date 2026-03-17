import { IUser } from "@/interfaces/user.interface";
import React from "react";
import {
  MapPin,
  Mail,
  CheckCircle,
  LayoutDashboard,
  Map,
  Star,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

type Props = {
  user: IUser;
  children: React.ReactNode;
};

const GuideLayout = ({ user, children }: Props) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col flex-1 max-w-7xl mx-auto px-4 md:px-10 py-8">
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
            <div className="relative">
              <img
                className="size-32 rounded-full border-4 border-white dark:border-slate-800 shadow-md object-cover"
                data-alt="Alex Johnson professional profile picture"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU86KBTBUkwe-ZqMQ4WKzAYlvKGMG9s7bB6NWOERNXm1ICIc5FQ-Y759HQR7Nf7_FEoXLefamJwel7dhyvx72Y-irsKfbsakyGYGxio7ZRK7sfy-StApCyb7UOC7ftJg1zmOR1mrA65wAWu6drQXePFBsAGLNuqlznM6vzV9Wypfw1MrlYBlHjyq8tkXAgiwY6Z1rxGNgSP5SY13j4VJSVFFEgx5Ly92nWWfq5AR-H20XW17nS1M7FFouNIi6ilMSmHx_TldkOqjo"
              />
              <span className="absolute bottom-0 right-0 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-white dark:border-slate-800 uppercase tracking-wider">
                Top Rated
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Alex Johnson
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center md:justify-start gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                Certified Local Guide • Tokyo, Japan
              </p>
              <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-3">
                <span className="inline-flex items-center gap-1 text-sm bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-slate-600 dark:text-slate-300">
                  <Mail className="h-3 w-3" />
                  alex.j@tourbuddy.com
                </span>
                <span className="inline-flex items-center gap-1 text-sm bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-slate-600 dark:text-slate-300">
                  <CheckCircle className="h-3 w-3" />
                  Certified Pro
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 md:flex-none px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors">
              Edit Profile
            </button>
            <button className="flex-1 md:flex-none px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              Share
            </button>
          </div>
        </div>
      </div>
      <div className="border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto no-scrollbar">
        <nav className="flex gap-8 min-w-max">
          <Link
            className="border-b-2 border-primary text-primary pb-4 font-bold flex items-center gap-2"
            href="#"
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            className="border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 pb-4 font-medium transition-colors flex items-center gap-2"
            href="/"
          >
            <Map className="h-5 w-5" /> My Tours
          </Link>
          <Link
            className="border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 pb-4 font-medium transition-colors flex items-center gap-2"
            href="#"
          >
            <Star className="h-5 w-5" />
            Reviews
          </Link>
          <Link
            className="border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 pb-4 font-medium transition-colors flex items-center gap-2"
            href="#"
          >
            <DollarSign className="h-5 w-5" />
            Earnings
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default GuideLayout;
