"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { use, useState, useTransition } from "react";
import countries from "@/data/iso/countries.json";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { TOUR_CATEGORIES } from "@/constants/user";
import { useRouter, useSearchParams } from "next/navigation";

const TourFilterSection = () => {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleApplyFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (location) {
      params.set("country", location);
    } else {
      params.delete("country");
    }

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    params.delete("city");
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const removeFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    setLocation("");
    setCategory("");
    params.delete("location");
    params.delete("category");
    params.delete("city");
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold mb-4">Filters</h3>
        <p onClick={() => removeFilter()} className="text-sm cursor-pointer">
          Clear Filter
        </p>
      </div>

      <div className="space-y-2">
        <Label>Location</Label>
        <SearchableSelect
          options={countries.map((c) => ({ label: c.name, value: c.name }))}
          value={location}
          onValueChange={(e) => setLocation(e)}
        />
      </div>

      {/* <div className="space-y-3">
        <Label>
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={200}
          step={10}
          className="w-full"
        />
      </div> */}

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category" className="w-full">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {TOUR_CATEGORIES.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* <div className="space-y-2">
        <Label>Category</Label>
        <div className="space-y-2">
          {["All", "Cultural", "Adventure", "Food", "Leisure"].map(
            (category) => (
              <label
                key={category}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="rounded"
                  defaultChecked={category === "All"}
                />
                <span className="text-sm">{category}</span>
              </label>
            )
          )}
        </div>
      </div> */}

      <Button onClick={() => handleApplyFilter()} className="w-full">
        Apply Filters
      </Button>
    </div>
  );
};

export default TourFilterSection;
