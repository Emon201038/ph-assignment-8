import HeroSection from "@/components/module/home/HeroSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface ILandingLayout {
  featuredCities: React.ReactNode;
  featuredTours: React.ReactNode;
  testimonials: React.ReactNode;
  topGuides: React.ReactNode;
  categories: React.ReactNode;
  children: React.ReactNode;
}

const LandingLayout = ({
  featuredCities,
  featuredTours,
  testimonials,
  topGuides,
  categories,
  children,
}: ILandingLayout) => {
  return (
    <div className="flex flex-col">
      {/* Hero section */}
      <HeroSection />

      {/* Featured cities */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular Destinations
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore cities with local guides
            </p>
          </div>
          {featuredCities}
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Top-Rated Experiences
            </h2>
            <p className="text-muted-foreground text-lg">
              Handpicked tours loved by travelers
            </p>
          </div>
          {featuredTours}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/explore">View All Tours</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore by Interest
            </h2>
            <p className="text-muted-foreground text-lg">
              Find experiences that match your passion
            </p>
          </div>
          {categories}
        </div>
      </section>

      {/* Top Guides */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Top Guides
            </h2>
            <p className="text-muted-foreground text-lg">
              Passionate locals ready to show you their world
            </p>
          </div>

          {topGuides}
        </div>
      </section>

      {/* How it works, why choose us, CTA section */}
      {children}

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Travelers Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Real experiences from our community
            </p>
          </div>

          {testimonials}
        </div>
      </section>
    </div>
  );
};

export default LandingLayout;
