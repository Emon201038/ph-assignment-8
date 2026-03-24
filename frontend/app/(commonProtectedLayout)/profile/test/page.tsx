"use client";

import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  Luggage,
  Users,
  HelpCircle,
  LogOut,
  CheckCircle2,
  Edit,
  PlaneTakeoff,
  ArrowRight,
  ChevronRight,
  Star,
  Droplet,
  Leaf,
  Plus,
  Menu,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function ProfilePage() {
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "#" },
    { name: "Expeditions", icon: Compass, href: "#" },
    { name: "Journal", icon: BookOpen, href: "#" },
    { name: "Gear", icon: Luggage, href: "#" },
    { name: "Community", icon: Users, href: "#" },
  ];

  const bottomNavItems = [
    { name: "Support", icon: HelpCircle, href: "#" },
    { name: "Logout", icon: LogOut, href: "#", isError: true },
  ];

  return (
    <div className="flex min-h-screen bg-surface">
      {/* SideNavBar (Shared Component) - Desktop Only */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 pt-24 p-6 bg-slate-50 z-40 border-r">
        <div className="flex flex-col gap-1 mb-10 px-4">
          <div className="w-12 h-12 rounded-xl bg-primary mb-2 overflow-hidden">
            <Image
              alt="Traveler's profile picture"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTrDMs9-LQEXjBnlOqWi305MXgd52w5h9_DLzu2rXP4VNXyLys08dglpV1dRcM2S_PLloVSKoEMw9PhCTnjugZsUz-jZM1fObsn6mII5O_0i2cp8M8IEO8-g9n7LyGwOy7EBlbhdv1zr8MGaaP11nA1zqQ3XC-DV5byFr_vfQFXh0NBMrgvL15iwFti15-yQWOWNs8kMLUs9rZpmTjY9NpO-M_NptiosMHtZ35cUfvYNuuWNs634h52uFnJuL0k1_twDorma67m-Q"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-bold text-lg text-on-surface">Alex Rivers</h3>
          <p className="text-xs font-medium tracking-tight text-blue-700">
            Elite Wayfarer
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 grow">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.name === "Dashboard";
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                  isActive
                    ? "text-blue-700 bg-white rounded-xl shadow-sm scale-98"
                    : "text-slate-500 hover:bg-slate-200/50"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Navigation Items */}
        <div className="mt-auto flex flex-col gap-2 border-t border-slate-200/50 pt-6">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all text-sm ${
                  item.isError
                    ? "text-error hover:bg-error-container/20"
                    : "text-slate-500 hover:bg-slate-200/50"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="md:ml-64 pb-12 px-8 lg:px-16 min-h-screen bg-surface w-full">
        {/* Profile Header Section */}
        <section className="relative mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className=" flex gap-2 items-center">
                {/* Mobile Hamburger Menu - Below Header */}
                <div className="md:hidden flex justify-between items-center">
                  <Sheet>
                    <SheetTrigger asChild>
                      <button
                        type="button"
                        className="p-2 hover:bg-slate-200/50 rounded-lg transition-colors"
                        aria-label="Open mobile menu"
                      >
                        <Menu size={24} />
                      </button>
                    </SheetTrigger>

                    <SheetContent side="left" className="md:hidden p-0">
                      <SheetTitle className="sr-only">
                        Mobile Navigation
                      </SheetTitle>
                      <div className="p-4 border-b border-slate-200/50">
                        <h3 className="font-bold text-lg">Menu</h3>
                      </div>

                      <nav className="flex flex-col gap-2 p-4">
                        {navItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <SheetClose asChild key={item.name}>
                              <Link
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-200/50 rounded-xl transition-all font-medium text-sm"
                              >
                                <Icon size={20} />
                                {item.name}
                              </Link>
                            </SheetClose>
                          );
                        })}

                        <div className="border-t border-slate-200/50 mt-4 pt-4 flex flex-col gap-2">
                          {bottomNavItems.map((item) => {
                            const Icon = item.icon;
                            return (
                              <SheetClose asChild key={item.name}>
                                <Link
                                  href={item.href}
                                  className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all text-sm ${
                                    item.isError
                                      ? "text-error hover:bg-error-container/20"
                                      : "text-slate-500 hover:bg-slate-200/50"
                                  }`}
                                >
                                  <Icon size={18} />
                                  {item.name}
                                </Link>
                              </SheetClose>
                            );
                          })}
                        </div>
                      </nav>
                    </SheetContent>
                  </Sheet>
                </div>
                <h1 className="text-2xl md:text-7xl font-black text-on-surface tracking-tighter leading-none md:mb-4">
                  Alex Wayfarer
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container text-xs font-bold">
                  <CheckCircle2 size={16} className="fill-current" />
                  Elite Explorer
                </span>
                <p className="text-on-surface-variant font-medium">
                  Nomad since 2018 • 42 expeditions completed
                </p>
              </div>
            </div>
            <div>
              <button className="bg-linear-to-br from-[#1d4fd7] to-primary text-[#cbd3ff] px-8 py-4 rounded-xl font-bold text-sm shadow-xl shadow-primary/20 flex items-center gap-2 active:scale-95 transition-transform hover:opacity-90">
                <Edit size={18} />
                Edit Profile
              </button>
            </div>
          </div>
        </section>

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

            {/* Travel Map Card */}
            <div className="bg-surface-container-low rounded-3xl overflow-hidden p-1 min-h-96 flex flex-col shadow-sm">
              <div className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">World Footprint</h3>
                  <p className="text-sm text-on-surface-variant">
                    Tracking your global impact
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/50 text-xs font-medium border border-outline-variant/15">
                    Heatmap
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                    Pins
                  </span>
                </div>
              </div>
              <div className="grow rounded-2xl mx-2 mb-2 bg-slate-200 relative overflow-hidden group">
                <Image
                  alt="World Map Texture"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuADirrtg-xGY15LPpmg8gaTiGBQiBwmJxvj59MwaGLCiCJIptDuiERNEScFgVRN75tXiAr-xAB9ZRZ27yIQObnWLGjrqGnURdSO7bjskwGgiDmnMhSQYGWxrjQQTcNdO2V9uA2REjVCBnQ4uxM5t6OQuL3k5ZCP134dvleWeScHNesgtRVTRzr0-P2n_JRM2BuTUZarFFagw85_uJbkZPO6vi-oKPE8j86m-NTO1XfCEx89CTvV1XyVuMw6l4Srs33KM79ikDmjNY4"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover grayscale opacity-80"
                />
                <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>

                {/* Stylized Map Markers */}
                <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-primary rounded-full ring-4 ring-primary/20"></div>
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-primary rounded-full ring-4 ring-primary/20"></div>
                <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-primary rounded-full ring-4 ring-primary/20"></div>
                <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-primary rounded-full ring-4 ring-primary/20"></div>
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
    </div>
  );
}
