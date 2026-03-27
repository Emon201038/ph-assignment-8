import { ITourist } from "@/interfaces/user.interface";
import { auth } from "@/lib/session";
import { Edit, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await auth<ITourist>();
  if (!user) {
    redirect("/login?redirect=/profile/test");
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden mb-8 border border-slate-200 dark:border-slate-800">
      {/* Cover Image */}
      <div
        className="w-full bg-linear-to-r from-primary to-blue-400 relative aspect-video md:aspect-16/5"
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
            src={user.avatar || "/images/default-avatar.png"}
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
  );
};

export default page;
