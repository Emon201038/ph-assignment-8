import { IDestination } from "@/interfaces/destination.interface";
import { MapPin } from "lucide-react";
import React from "react";

const HeroSection = ({ destination }: { destination: IDestination }) => {
  return (
    <div className="relative w-full h-150 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        data-alt="Traditional Balinese temple at golden sunset over the water"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 40%), url(${destination.image})`,
        }}
      ></div>
      <div className="absolute bottom-0 left-0 w-full px-6 md:px-20 pb-16">
        <div className="max-w-300 mx-auto">
          <div className="flex items-center gap-2 text-white/80 text-sm font-semibold mb-4 bg-white/10 backdrop-blur-md w-fit px-3 py-1 rounded-full border border-white/20">
            <MapPin size={18} />
            {destination.country}
          </div>
          <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-tight">
            {destination.name}
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mt-4">
            {destination.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
