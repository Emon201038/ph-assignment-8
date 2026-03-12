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

      case "price-asc":
      case "price-desc":
      case "rating-asc":
      case "rating-desc":
        params.set("sortBy", value.split("-")[0]);
        params.set("sortOrder", value.split("-")[1]);
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
        <SelectItem value="price-asc">Price: Low to High</SelectItem>
        <SelectItem value="price-desc">Price: High to Low</SelectItem>
        <SelectItem value="rating-asc">Rating: Low to High</SelectItem>
        <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TourSorting;
