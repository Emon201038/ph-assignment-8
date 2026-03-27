import { Compass } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="xl:col-span-4 flex flex-col gap-12">
      {/* Membership Badge Bento */}
      <div className="bg-linear-to-br from-blue-900 to-primary p-8 rounded-4xl text-white overflow-hidden relative group">
        <Compass
          className="absolute -right-4 -bottom-4 text-white/10 group-hover:scale-110 transition-transform duration-700"
          size={96}
        />
        <h4 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
          Membership Status
        </h4>
        <div className="text-3xl font-black mb-4">Platinum Voyager</div>
        <p className="text-sm text-blue-100/80 mb-6 leading-relaxed">
          You have unlocked 14% exclusive discounts on all boutique stays.
        </p>
        <button className="w-full py-3 bg-white/10 backdrop-blur-md rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-all">
          View Benefits
        </button>
      </div>
    </div>
  );
}
