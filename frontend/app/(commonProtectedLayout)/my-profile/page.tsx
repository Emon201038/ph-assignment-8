"use client";

import { useState } from "react";
import {
  MapPin,
  Edit,
  Share2,
  Map,
  MessageSquare,
  Globe,
  Calendar,
  Heart,
  Settings,
  Star,
} from "lucide-react";

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState("bookings");

  const iconMap = {
    map: "Map",
    rate_review: "MessageSquare",
    public: "Globe",
    event_available: "Calendar",
    favorite: "Heart",
    manage_accounts: "Settings",
  };
  const user = {
    name: "Alex Johnson",
    location: "San Francisco, CA",
    memberStatus: "GOLD MEMBER",
    profileImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCr2IxcSfPEvoVZTyuwWd_D0vz4dh-WU67nZkPnRj7-1wCB8zjWGftapFUznUlVvBoEgNOGjfdfCDGt1zBQ2e-_U6Ldbslc_XDDmt-te2iuHrf1Hu9vnqop4nvByXL2WFM4JYoGsnXjy2qnicP2UtdMEzXuPSz7_PgKz0hjToJFYrAoxot898hlrws7VvfQd4iaZ5rdr0FIyrtowB_Z8jIDBKL7wx3Rs6_F9o5Fa_Gr1BlT6DhE_KA63w26D_D0XxF8HateSCf83KI",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCr2IxcSfPEvoVZTyuwWd_D0vz4dh-WU67nZkPnRj7-1wCB8zjWGftapFUznUlVvBoEgNOGjfdfCDGt1zBQ2e-_U6Ldbslc_XDDmt-te2iuHrf1Hu9vnqop4nvByXL2WFM4JYoGsnXjy2qnicP2UtdMEzXuPSz7_PgKz0hjToJFYrAoxot898hlrws7VvfQd4iaZ5rdr0FIyrtowB_Z8jIDBKL7wx3Rs6_F9o5Fa_Gr1BlT6DhE_KA63w26D_D0XxF8HateSCf83KI",
  };

  const stats = [
    { icon: "map", label: "Tours Taken", value: "24" },
    { icon: "rate_review", label: "Reviews", value: "18" },
    { icon: "public", label: "Countries", value: "12" },
  ];

  const upcomingTours = [
    {
      id: 1,
      title: "Amalfi Coast Sunset Hike",
      status: "CONFIRMED",
      bookingId: "#TB-88231",
      dates: "Oct 12 - Oct 15, 2024",
      guides: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDwEU1wueFACIdydCWydSWSgNhB8pY7N4NFuV5xy__t1RbDPfSa-usf5CH6pAiSPvgocQh1ae8GvJaRhuaqBMpBgH2mbgXEXz61Z-NY6Rlg080hEzBv1kmzuyOtGHznPJ2d5_w8CGvd9NNMUxCivy-o_zxzrpQyAbcYiRbEcpFOM80WLhK5G0u2s6iSGCBYOrbbfKgV7Rfiz73WAH-CAILvUapwFtv13azpzOULKBdWJSpqufQWgiAAPDcFzzgcqSH76LdMZ0a169Q",
      ],
      moreGuides: 2,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB9k5jznONkbQXIFnMXXqgaQPv4s4-XCa6zAhWmYdOW3VIC_OsyWVm1ViwyTqBKmSg_4hVyZlyHZx1YSvMp_0ewoRA6zwmeOztNP_jM2Qdh-DM7_pkKi8Jkl9gE9KScQ9ytbwWhHHEl5NxFjjIxO4aai4YGyYNmtdhRBvwPAsAX_HouQF5FdDU03OcC67q4M3qVmeTzJLEHcZO9fx7Cil1oRo7G3TC3F7mZmaT6FngaaFseLL0wB3yZb_6hj0jgIqZBZi0CpnTzk4s",
    },
  ];

  const pastTours = [
    {
      id: 1,
      title: "Kyoto Zen Gardens Tour",
      date: "May 2024",
      rating: 5,
      reviewed: true,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDyBLx-Nf2gUl6SefdMdAi5815szptJCBrZkTxNPdH1-9yo_wpp0PW2oISxSKrBBpGIl0N54WZmHYc4IDWMvz0VIQtf8GDFT1FLAaty0WvIbCpIoLJ2Dd_Q7l7hTCsGDVhoCw8vySxIFKISORhw9bob2qdKccNyiO2J_C--2a-DgCJetZITwtEe3VctDpjuQVGhyGJOdKTXV6gH6cmBH-m5ooZEtTlFtiHmMUYBh_XaLSwM5U7KTn_8HObTjp6UsdV0lhx4RdxwZEI",
    },
    {
      id: 2,
      title: "Venice Hidden Waterways",
      date: "Mar 2024",
      rating: 0,
      reviewed: false,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBVRYliVGD9HydjW6gD7vNhJROJtOX53zem-3kJRs_SR5nuIkQXGqcbl4_fKAAXlQeZSp4IwqzzjGoCYEqfTOH9k-GFo3JuFkMqpHFlinP8OhBSkFQGwln10ESFjnEiux8h9H4OscUs3ny3Hc2U50lGUEjeLyTSqOreNWDsytlgQYgRIZrZf_Bg_CNxyum2k-1NEoSxeTuVM7DcLdHZtwjXge1aLuhkXDx8fBddrVqORjOPvbxhUMtrMwHRRCUJ9reuZFBw0rRd-9A",
    },
  ];

  const savedTours = [
    {
      country: "India",
      title: "Golden Triangle Explorer",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCEHBteosN3o163c7mCtd1oj5pJMtX1Udqk_dODkv0-OgVwUY1kdcaszIYkF0lsfTMfXYqa7LqPotOmdawYuxr4LQ1MR1OR0fDrfC1LV1cS5Lh85TC_Jj_MsnXte54LXa3mpqrrOOW4QtEHWkOr7cDHIl4HLX1aDRt4vHm-ATJJi91FN2h2e-jRxI2JYqzNlNbUI9sAbYEymMp54gK9ChL6M6iv2IBvmOI0PuVelKLX-l4oKFAtlftwL93bThpnZ1EbtkpiNGCEtBw",
    },
    {
      country: "France",
      title: "Paris Culinary Walking Tour",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDDpCNTkI13JxzqlrChm1oH9hy8wpLH03SpALt2RfeRwRqiURomxCcxQUH-1PHtuBeSAgLXfvtIe16vP4rn8Aa9spTlK9VD_iErspCH9Sz5j8nZpRAYhaC-RQTv3O8eCIG6sFoImQ2fwk05yhUMwSkvdK_MhOhsOlSOsYvaHNwjvriCJhj_XSItVfQiIsgU3u7OEG6oCizbzIVkyj0daen-ADFHKwmZg4dh4wBJXBE9yS86Uns2RnFjcim_XfKmki69K_PMFJL19hI",
    },
    {
      country: "Switzerland",
      title: "Alpine Peaks Helicopter Tour",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAhNixaed_rucyLutK3QevzHhmqbQNkmp9rQytWeZASpWnrvNJv3NyUhaEQATY5xbIqrSINRA-sxZZGM_PfIXHjlaCy4W3WDbZaiv4sd7QOIxjPGZFFAaWXcVlDl0Mb9gopffcKK0ek06zoT1gttR4AFChHpL06eL-cUqtXytiXSwgajBLSMd7kVKcf0qPvjMzfqwxZ6l4MJDRciWZJXotuD2U0nVu2Z599NS5cmX141gOl9oEyYEyERKogU98BTd0RKapq7vTK4-Q",
    },
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
                <span>{user.location}</span>
                <span className="mx-1">•</span>
                <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                  {user.memberStatus}
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
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === tab.id
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

          {/* Bookings Section */}
          {activeTab === "bookings" && (
            <div className="space-y-6">
              {/* Upcoming Tours */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Upcoming Tours</h2>
                  <button className="text-primary text-sm font-bold hover:underline">
                    View All
                  </button>
                </div>

                {upcomingTours.map((tour) => (
                  <div
                    key={tour.id}
                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col md:flex-row"
                  >
                    <div
                      className="md:w-64 h-48 md:h-auto bg-center bg-cover"
                      data-alt={tour.title}
                      style={{
                        backgroundImage: `url("${tour.image}")`,
                      }}
                    ></div>
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold rounded-full">
                            {tour.status}
                          </span>
                          <span className="text-slate-400 text-xs font-medium">
                            Booking ID: {tour.bookingId}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold mb-1">{tour.title}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1 mb-4">
                          <Calendar className="h-4 w-4" />
                          {tour.dates}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex -space-x-2">
                          {tour.guides.map((guideImg, idx) => (
                            <div
                              key={idx}
                              className="size-8 rounded-full border-2 border-white dark:border-slate-900 bg-center bg-cover"
                              style={{
                                backgroundImage: `url("${guideImg}")`,
                              }}
                            ></div>
                          ))}
                          {tour.moreGuides > 0 && (
                            <div className="size-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                              +{tour.moreGuides}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            Manage
                          </button>
                          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                            Get Tickets
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Past Tours */}
              <div>
                <h2 className="text-xl font-bold mb-4 pt-4">Past Tours</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pastTours.map((tour) => (
                    <div
                      key={tour.id}
                      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col"
                    >
                      <div
                        className="h-32 bg-center bg-cover filter grayscale"
                        data-alt={tour.title}
                        style={{
                          backgroundImage: `url("${tour.image}")`,
                        }}
                      ></div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-bold truncate">{tour.title}</h4>
                          <span className="text-xs text-slate-400">
                            {tour.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mb-3">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              className={`h-4 w-4 ${
                                idx < tour.rating
                                  ? "fill-yellow-500 text-yellow-500"
                                  : "text-slate-400"
                              }`}
                            />
                          ))}
                          <span className="text-xs text-slate-400 ml-1">
                            {tour.reviewed ? "(Reviewed)" : "(No review)"}
                          </span>
                        </div>
                        <button className="w-full py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                          {tour.reviewed ? "Rebook Tour" : "Write a Review"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Saved for Later */}
              <div>
                <h2 className="text-xl font-bold mb-4 pt-8 border-t border-slate-200 dark:border-slate-800">
                  Saved for Later
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {savedTours.map((tour, idx) => (
                    <div
                      key={idx}
                      className="group relative rounded-xl overflow-hidden aspect-3/4"
                    >
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        data-alt={tour.title}
                        src={tour.image}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                        <p className="text-white text-xs font-medium uppercase tracking-wider">
                          {tour.country}
                        </p>
                        <h4 className="text-white font-bold">{tour.title}</h4>
                        <button className="absolute top-3 right-3 bg-white/20 backdrop-blur-md rounded-full size-8 flex items-center justify-center text-white hover:bg-white/30 transition-all">
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Favorites Tab Content */}
          {activeTab === "favorites" && (
            <div className="p-8 text-center text-slate-500">
              <p>Favorites section coming soon</p>
            </div>
          )}

          {/* Settings Tab Content */}
          {activeTab === "settings" && (
            <div className="p-8 text-center text-slate-500">
              <p>Account settings section coming soon</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
