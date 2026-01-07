"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const TourSorting = () => {
  const [sort, setSort] = useState("popular");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    setSort(value);

    switch (value) {
      case "popular":
        params.delete("sortBy");
        params.delete("sortOrder");
        router.push(`?${params.toString()}`);
        return;

      case "asc":
      case "desc":
        params.set("sortBy", "price");
        params.set("sortOrder", value);
        router.push(`?${params.toString()}`);
        return;
      default:
        break;
    }
  };
  return (
    <Select value={sort} onValueChange={handleChange} defaultValue="popular">
      <SelectTrigger className="ml-auto">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="popular">Most Popular</SelectItem>
        <SelectItem value="asc">Price: Low to High</SelectItem>
        <SelectItem value="desc">Price: Low to High</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TourSorting;
