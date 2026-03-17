import { IUser } from "@/interfaces/user.interface";
import {
  Calendar,
  Edit,
  Globe,
  Heart,
  Map,
  MapPin,
  MessageSquare,
  Settings,
  Share2,
} from "lucide-react";
import React from "react";

interface IProps {
  user: IUser;
  children: React.ReactNode;
}
const TravelerLayout = ({ user, children }: IProps) => {
  const stats = [
    { icon: "map", label: "Tours Taken", value: "24" },
    { icon: "rate_review", label: "Reviews", value: "18" },
    { icon: "public", label: "Countries", value: "12" },
  ];
  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-10 py-8">
      {/* Hero Profile Section */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden mb-8 border border-slate-200 dark:border-slate-800">
        {/* Cover Image */}
        <div
          className="h-48 bg-linear-to-r from-primary to-blue-400 relative"
          data-alt="Blue abstract travel themed gradient background"
        >
          <button className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Edit Cover
          </button>
        </div>

        {/* Profile Info Container */}
        <div className="px-8 pb-8 flex flex-col md:flex-row items-end gap-6 -mt-12">
          {/* Avatar */}
          <div className="bg-white dark:bg-slate-900 p-1.5 rounded-full shadow-lg relative">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-32"
              data-alt="User profile picture close up"
              style={{
                backgroundImage: `url("${user.profileImage}")`,
              }}
            ></div>
            <div className="absolute bottom-2 right-2 bg-green-500 border-4 border-white dark:border-slate-900 size-6 rounded-full"></div>
          </div>

          {/* Name and Actions */}
          <div className="flex-1 flex flex-col md:flex-row justify-between items-center md:items-end w-full pb-2">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {user.name}
              </h1>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mt-1 flex-wrap justify-center md:justify-start">
                <MapPin className="h-4 w-4" />
                <span>
                  {user.city}, {user.country}
                </span>
                <span className="mx-1">•</span>
                <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                  {"Verified Traveler"}
                </span>
              </div>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </button>
              <button className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-2.5 rounded-lg font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Stats */}
        <aside className="lg:col-span-3 space-y-6">
          {/* Travel Stats Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-4">Travel Stats</h3>
            <div className="space-y-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {stat.icon === "map" && (
                      <Map className="h-5 w-5 text-primary" />
                    )}
                    {stat.icon === "rate_review" && (
                      <MessageSquare className="h-5 w-5 text-primary" />
                    )}
                    {stat.icon === "public" && (
                      <Globe className="h-5 w-5 text-primary" />
                    )}
                    <span className="text-sm font-medium">{stat.label}</span>
                  </div>
                  <span className="font-bold">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* About Me Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-4">About Me</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Adventure seeker and landscape photographer. Always looking for
              the next hidden gem in Europe and SE Asia.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-xs rounded-md">
                #Hiking
              </span>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-xs rounded-md">
                #Photography
              </span>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-xs rounded-md">
                #LocalFood
              </span>
            </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="lg:col-span-9">
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 overflow-x-auto whitespace-nowrap">
            {[
              {
                id: "bookings",
                label: "My Bookings",
                icon: "event_available",
              },
              {
                id: "favorites",
                label: "Favorites",
                icon: "favorite",
              },
              {
                id: "settings",
                label: "Account Settings",
                icon: "manage_accounts",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                // onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                  false
                    ? "border-primary text-primary"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                {tab.icon === "event_available" && (
                  <Calendar className="h-4 w-4" />
                )}
                {tab.icon === "favorite" && <Heart className="h-4 w-4" />}
                {tab.icon === "manage_accounts" && (
                  <Settings className="h-4 w-4" />
                )}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          {children}
        </div>
      </div>
    </main>
  );
};

export default TravelerLayout;
