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
import { useState, useTransition } from "react";
import { TOUR_CATEGORIES } from "@/constants/user";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import languages from "@/data/iso/languages.json";
import { Slider } from "@/components/ui/slider";

const TourFilterSection = () => {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");

  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleApplyFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (country) {
      params.set("country", country);
    } else {
      params.delete("country");
    }
    if (city) {
      params.set("city", city);
    } else {
      params.delete("city");
    }

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    if (language) {
      params.set("language", language);
    } else {
      params.delete("language");
    }

    if (priceRange[1] !== 0) {
      params.set("minPrice", priceRange[0].toString());
      params.set("maxPrice", priceRange[1].toString());
    } else {
      params.delete("minPrice");
      params.delete("maxPrice");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const removeFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    setCountry("");
    setCity("");
    setCategory("");
    params.delete("country");
    params.delete("city");
    params.delete("category");
    params.delete("language");
    params.delete("minPrice");
    params.delete("maxPrice");

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

      <div className="flex items-center gap-1">
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            name="country"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country (exact match)"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            name="city"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City (exact match)"
          />
        </div>
      </div>

      <div className="space-y-3">
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
      </div>

      <div className="space-y-2 flex justify-between items-center w-full">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger
              id="category"
              className="w-auto  max-w-33.25 text-ellipsis"
            >
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
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger
              id="language"
              className="w-auto! min-w-auto max-w-33.25 text-sm!"
            >
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((c) => (
                <SelectItem key={c.name} value={c.name}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={() => handleApplyFilter()} className="w-full">
        Apply Filters
      </Button>
    </div>
  );
};

export default TourFilterSection;
