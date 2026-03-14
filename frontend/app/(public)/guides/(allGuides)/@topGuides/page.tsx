import { IResponse } from "@/interfaces";
import { IGuide } from "@/interfaces/guide.interface";
import { IUser } from "@/interfaces/user.interface";
import { serverFetch } from "@/lib/server-fetch";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function TopGuidesPage() {
  const res = await serverFetch.get("/v2/users?topGuides=true&limit=5");
  const data: IResponse<IUser<IGuide>[]> = await res.json();

  if (data.data.length === 0) return null;
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
      {data.data.map((guide) => (
        <div key={guide.id} className="flex-none w-72 group">
          <div className="relative aspect-3/4 rounded-xl overflow-hidden mb-3">
            <Image
              alt={guide.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src={guide.avatar || "/images/default_avatar.png"}
              fill
              sizes="(max-width: 768px) 100vw, 288px"
            />
            <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              {guide.guideProfile.rating}
            </div>
          </div>
          <Link href={`/guides/${guide.id}`}>
            <h3 className="text-slate-900 dark:text-white font-bold text-lg">
              {guide.name}
            </h3>
          </Link>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {guide.city}, {guide.country} • {guide.guideProfile.specialties[0]}
          </p>
        </div>
      ))}
    </div>
  );
}
