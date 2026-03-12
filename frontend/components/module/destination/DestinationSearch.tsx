"use client";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const DestinationSearch = ({
  target = "/destination",
}: {
  target?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get("searchTerm") as string;
    const date = formData.get("date") as string;

    if (!searchTerm && !date) return;

    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm) params.set("searchTerm", searchTerm);
    else params.delete("searchTerm");
    if (date) params.set("date", date);
    else params.delete("date");

    router.push(`${target}?${params.toString()}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-white dark:bg-background-dark p-2 rounded-xl shadow-2xl flex flex-col md:flex-row gap-2 mt-4"
    >
      <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 py-3 md:py-0">
        <MapPin />
        <Input
          className="w-full border-none bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 outline-none shadow-none"
          placeholder="Where are you going?"
          type="text"
          name="searchTerm"
        />
      </div>
      <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 py-3 md:py-0">
        <Calendar />
        <DatePicker
          showIcon={false}
          className="border-none bg-transparent outline-none shadow-none ring-0 flex-1 h-full p-0 pl-3 hover:bg-transparent hover:text-current"
          placeholder="When to go"
        />
      </div>
      <Button className="bg-primary text-white font-bold py-3 md:py-0 px-8 rounded-lg hover:bg-blue-700 transition-colors h-10">
        Explore
      </Button>
    </form>
  );
};

export default DestinationSearch;
