"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const HeroSectionSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get("searchTerm") as string;

    params.set("searchTerm", searchTerm);
    router.push(`/tours?${params.toString()}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Where do you want to go?"
          name="searchTerm"
          required
          className="pl-10 h-12 text-base text-primary-foreground placeholder:text-primary-foreground/50"
        />
      </div>
      <Button size="lg" className="h-12 px-8">
        Explore Tours
      </Button>
    </form>
  );
};

export default HeroSectionSearch;
