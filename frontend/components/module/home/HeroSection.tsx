import React from "react";
import { Input } from "../../ui/input";
import { Search } from "lucide-react";
import { Button } from "../../ui/button";
import Link from "next/link";
import { Badge } from "../../ui/badge";
import Image from "next/image";
import HeroSectionSearch from "./HeroSectionSearch";

const HeroSection = () => {
  return (
    <section className="relative h-150 overflow-hidden py-20 md:py-32">
      <div
        style={{
          backgroundImage:
            'url("/images/travel-adventure-mountain-landscape.jpg")',
        }}
        className="absolute inset-0 w-full h-full object-cover brightness-100 bg-no-repeat bg-cover bg-center mx-auto -z-10"
      >
        {/* <Image
          src="/images/travel-adventure-mountain-landscape.jpg"
          alt="Travel adventure"
          fill
          className="object-cover brightness-50"
          priority
        /> */}
      </div>
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <Badge variant="secondary" className="text-sm px-4 py-1.5">
            Trusted by 50,000+ travelers worldwide
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance text-primary-foreground">
            Explore the World with Local Experts
          </h1>
          <p className="text-xl text-primary-foreground/90 text-pretty">
            Discover authentic experiences, hidden gems, and unforgettable
            adventures guided by passionate locals who know their cities best.
          </p>

          <HeroSectionSearch />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
