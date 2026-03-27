import Link from "next/link";
import Image from "next/image";
import {
  PlaneTakeoff,
  ArrowRight,
  ChevronRight,
  Star,
  Droplet,
  Leaf,
  Plus,
} from "lucide-react";

export default function ProfilePage() {
  return (
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
            Waking up at 4 AM to catch the first light hitting the Fushimi Inari
            shrines was a spiritual experience unlike any other...
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
  );
}
