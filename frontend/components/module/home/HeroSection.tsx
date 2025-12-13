import React from "react";
import { Input } from "../../ui/input";
import { Search } from "lucide-react";
import { Button } from "../../ui/button";
import Link from "next/link";
import { Badge } from "../../ui/badge";

const HeroSection = () => {
  return (
    <section className="relative bg-linear-to-br from-primary/5 via-background to-accent/5 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <Badge variant="secondary" className="text-sm px-4 py-1.5">
            Trusted by 50,000+ travelers worldwide
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
            Explore the World with Local Experts
          </h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Discover authentic experiences, hidden gems, and unforgettable
            adventures guided by passionate locals who know their cities best.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Where do you want to go?"
                className="pl-10 h-12 text-base"
              />
            </div>
            <Button size="lg" className="h-12 px-8" asChild>
              <Link href="/explore">Explore Tours</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
