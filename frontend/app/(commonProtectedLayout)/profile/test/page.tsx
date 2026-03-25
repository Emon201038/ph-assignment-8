import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  Users,
  HelpCircle,
  LogOut,
  Edit,
  PlaneTakeoff,
  ArrowRight,
  ChevronRight,
  Ticket,
  Heart,
  Trophy,
  MessageSquare,
  Star,
  Droplet,
  Leaf,
  Plus,
  Settings,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { headers } from "next/headers";

export default async function ProfilePage() {
  const user = {
    name: "Alex Rivers",
    email: "alexrivers@me.com",
    phone: "+1 (555) 123-4567",
    city: "San Francisco",
    country: "USA",
    avatar: "/images/default_avatar.png",
    bio: "Urban explorer who loves taking long walking tours to discover hidden city gems and street art.",
  };

  return (
    <main className="lg:ml-64 pb-12 px-4 lg:px-8 min-h-screen bg-surface w-full lg:w-[calc(100%-256px)]">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden mb-8 border border-slate-200 dark:border-slate-800">
        {/* Cover Image */}
        <div
          className="h-64 bg-linear-to-r from-primary to-blue-400 relative"
          data-alt="Blue abstract travel themed gradient background"
        >
          <button className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Edit Cover
          </button>
        </div>

        {/* Profile Info Container */}
        <div className="px-8 py-4 flex flex-col md:flex-row items-center md:items-end gap-3">
          {/* Avatar */}
          <div className="bg-white dark:bg-slate-900 p-1.5 rounded-full shadow-lg relative">
            <Image
              src={user.avatar}
              alt="User profile picture close up"
              width={128}
              height={128}
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-32"
            />
            {/* <div className="absolute bottom-2 right-2 bg-green-500 border-4 border-white dark:border-slate-900 size-6 rounded-full"></div> */}
          </div>

          {/* Name and Actions */}
          <div className="flex-1 flex flex-col md:flex-row justify-between items-center md:items-end w-full pb-2">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {user.name}
              </h1>
              <div className="flex items-center gap-2">
                <p className="opacity-70">{user.bio}</p>
                <div>
                  <Edit size={12} />
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mt-1 flex-wrap justify-center md:justify-start text-sm">
                <MapPin className="h-4 w-4" />
                <span>
                  {user.city}, {user.country}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mt-1 flex-wrap justify-center md:justify-start  text-sm">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
                <span className="mx-1">•</span>
                <Phone className="h-4 w-4" />
                <span>{user.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid Stats & Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Stats & Map */}
        <div className="md:col-span-8 flex flex-col gap-6">
          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: "42", label: "Total Trips" },
              { value: "18", label: "Countries" },
              { value: "124", label: "Reviews" },
              { value: "8.4k", label: "Wayfarer Points" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_24px_24px_rgba(25,28,30,0.06)] border border-outline-variant/15"
              >
                <span className="text-primary font-black text-3xl block mb-1">
                  {stat.value}
                </span>
                <span className="text-on-surface-variant text-xs font-bold uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div className="grow rounded-2xl mx-2 mb-2 relative overflow-hidden">
            {/* Recent Activity / Travel Milestones Component */}
            <div className="bg-surface-container-low rounded-3xl p-8 shadow-sm border border-outline-variant/10">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="font-bold text-lg">Travel Milestones</h3>
                  <p className="text-sm text-on-surface-variant">
                    Your latest wanderlust achievements
                  </p>
                </div>
                <button className="text-xs font-bold text-primary hover:underline">
                  View All History
                </button>
              </div>

              <div className="space-y-6">
                {/* Milestone Item 1 */}
                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-surface-container transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
                    <Ticket size={18} />
                  </div>
                  <div className="grow">
                    <div className="flex justify-between items-start gap-3">
                      <h4 className="font-bold text-sm text-on-surface">
                        Booked a tour to Kyoto
                      </h4>
                      <span className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wider whitespace-nowrap">
                        Today, 2:15 PM
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Confirmed 'Zen Gardens & Shrines' group expedition for Oct
                      2024.
                    </p>
                  </div>
                </div>

                {/* Milestone Item 2 */}
                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-surface-container transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-tertiary-container/20 flex items-center justify-center text-tertiary shrink-0">
                    <Heart size={18} className="fill-current" />
                  </div>
                  <div className="grow">
                    <div className="flex justify-between items-start gap-3">
                      <h4 className="font-bold text-sm text-on-surface">
                        Added Amalfi Coast to Favorites
                      </h4>
                      <span className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wider whitespace-nowrap">
                        Yesterday
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Saved for your Summer 2025 Mediterranean dream board.
                    </p>
                  </div>
                </div>

                {/* Milestone Item 3 */}
                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-surface-container transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary-fixed shrink-0">
                    <Trophy size={18} />
                  </div>
                  <div className="grow">
                    <div className="flex justify-between items-start gap-3">
                      <h4 className="font-bold text-sm text-on-surface">
                        Earned the 'Mountain King' badge
                      </h4>
                      <span className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wider whitespace-nowrap">
                        3 days ago
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Awarded for completing 5 high-altitude alpine expeditions.
                    </p>
                  </div>
                </div>

                {/* Milestone Item 4 */}
                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-surface-container transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
                    <MessageSquare size={18} />
                  </div>
                  <div className="grow">
                    <div className="flex justify-between items-start gap-3">
                      <h4 className="font-bold text-sm text-on-surface">
                        Published 'Patagonia Peak' Review
                      </h4>
                      <span className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wider whitespace-nowrap">
                        Aug 28, 2024
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Your detailed guide reached 1.2k other Wayfarers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Featured Trip & Activity */}
        <div className="md:col-span-4 flex flex-col gap-6">
          {/* Upcoming Trip Card */}
          <div className="bg-linear-to-br from-[#1d4fd7] to-primary rounded-3xl p-8 text-[#cbd3ff] shadow-2xl shadow-primary/30 relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <span className="text-[#cbd3ff] text-xs font-black uppercase tracking-widest mb-6 block">
                Next Expedition
              </span>
              <h2 className="text-3xl font-bold mb-2">Icelandic Fjords</h2>
              <p className="text-[#cbd3ff] text-sm font-medium mb-8">
                September 14 — 22, 2024
              </p>
              <div className="flex items-center gap-4 mb-10 bg-black/10 p-4 rounded-2xl backdrop-blur-sm">
                <div className="p-3 bg-white/10 rounded-xl">
                  <PlaneTakeoff size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#cbd3ff] opacity-70">
                    Flight Status
                  </p>
                  <p className="text-sm font-bold">Confirmed • KEF Intl</p>
                </div>
              </div>
              <Link
                href="#"
                className="inline-flex items-center gap-2 font-bold text-sm bg-white text-primary px-6 py-3 rounded-xl hover:bg-surface transition-colors active:scale-95"
              >
                Manage Booking
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Recent Activity / Journal Card */}
          <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-[0_24px_24px_rgba(25,28,30,0.06)] border border-outline-variant/15">
            <h3 className="font-bold text-lg mb-6">Journal Snippet</h3>
            <div className="group cursor-pointer">
              <div className="aspect-video w-full rounded-2xl overflow-hidden mb-4">
                <Image
                  alt="Kyoto Temple"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLHBMuYbKFVLSzqg4MzSHxTWO0egOmjFxODKZ-IvM3jOuH6zG-zNDncsRJzZFxOhG4vZQ3znp7bATxJovyNTS0Q4MYr5GlRAPOLBqC5Dx89cvJC3LzLi0tqJBVkGj_eCkF3If5rrqY0zHGYLgNG3-5uVc3-tb7y05h4zhqciMM_uGA7AYruuP8uHAmwYAlhvDhQgTeVV298pOar8GtvdDL5MSpPb4I0FpPNurKr7pyTbp1oh5px794FH1-cJT-weJN0dbqyKyaXOc"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h4 className="font-bold text-on-surface mb-2">
                Kyoto: The Silent Sunrise
              </h4>
              <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-2 mb-4">
                Waking up at 4 AM to catch the first light hitting the Fushimi
                Inari shrines was a spiritual experience unlike any other...
              </p>
              <Link
                href="#"
                className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                Read Entry
                <ChevronRight size={14} />
              </Link>
            </div>

            {/* Saved Favorites */}
            <div className="mt-8 pt-8 border-t border-outline-variant/10">
              <h4 className="text-xs font-black uppercase text-on-surface-variant tracking-widest mb-4">
                Saved Favorites
              </h4>
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-xl bg-surface-container-low overflow-hidden">
                  <Image
                    alt="Taj Mahal"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnsb1oghfQsCJIgaOEIqAxOpcGvvv_U7iW-61cvFJ4PwRx-zVXq2ftbJpKeofvmV_6SU41wD0F2a72zRVhw4zzGu6Mw1Wp0yPcEmyjxuKLcXIFYpwQa78Gz2M3mjYdsjRpFdfZvTrV9mstPsWNbLkongR94hdmOq6UgdBbiSr46cwUrGgYPvPP7ADLjAHv7GS9YFCcCgmEVa_Kt6aEsw3uojT9f8D5IgdNQ9vOll4NsZg0DK-4SuGqH0urzxcayo27-6nQv-_ZDG0"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-12 h-12 rounded-xl bg-surface-container-low overflow-hidden">
                  <Image
                    alt="Mountain Lake"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaC2auaXlHZIx9ucw1TAjyHZMfoDPVwwUtFlFvHrqlCLyDZN2vr3yk04kyQT1toz4ESm6qdTHK4sn4YPJkk-cxe7ALjFhYPd39ubEVi40L0PYMMbeFjpO2PyS-ZI9TUaiLpiFs3EeRID71v8ncX0EWRw1eoA80sLbiL3GWpnWdhfLezb6v_DeZFlAK24tNoIrDqYh6G5wXWL10Pvs9lb5oCmDiJg-6ZAvJ5v3iGJfT1_n3DXN-Y1SYAwq52LQ1TQeDozvQgl50pSo"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="w-12 h-12 rounded-xl border-2 border-dashed border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Badges / Rewards */}
          <div className="bg-secondary-container/30 rounded-3xl p-6 border border-secondary-container">
            <h3 className="font-bold text-sm mb-4">Achievements</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: Star, label: "Mountain King", color: "amber" },
                { icon: Droplet, label: "Coastal Nomad", color: "blue" },
                { icon: Leaf, label: "Eco-Warrior", color: "emerald" },
              ].map((badge) => {
                const Icon = badge.icon;
                const colorClass = {
                  amber: "text-amber-500",
                  blue: "text-blue-500",
                  emerald: "text-emerald-500",
                }[badge.color];

                return (
                  <span
                    key={badge.label}
                    className="px-3 py-1.5 rounded-full bg-surface-container-lowest text-[10px] font-bold text-on-secondary-container shadow-sm flex items-center gap-1"
                  >
                    <Icon size={12} className={colorClass} />
                    {badge.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
