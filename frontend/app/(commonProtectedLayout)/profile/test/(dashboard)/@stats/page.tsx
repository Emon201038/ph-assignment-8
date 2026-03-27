import { Heart, MessageSquare, Ticket, Trophy } from "lucide-react";
import React from "react";

const page = async () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { value: "42", label: "Total Trips" },
        { value: "18", label: "Countries" },
        { value: "124", label: "Reviews" },
        { value: "8.4k", label: "Tour Buddy Points" },
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
  );
};

export default page;
