"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const TourFilterSection = () => {
  const [priceRange, setPriceRange] = useState([0, 200]);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Filters</h3>
      </div>

      <div className="space-y-2">
        <Label>Location</Label>
        <select className="w-full p-2 border border-input rounded-md bg-background">
          <option>All Locations</option>
          <option>Paris, France</option>
          <option>Tokyo, Japan</option>
          <option>Swiss Alps, Switzerland</option>
          <option>Santorini, Greece</option>
        </select>
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

      <div className="space-y-2">
        <Label>Duration</Label>
        <select className="w-full p-2 border border-input rounded-md bg-background">
          <option>Any Duration</option>
          <option>1-3 hours</option>
          <option>3-5 hours</option>
          <option>5+ hours</option>
        </select>
      </div>

      <div className="space-y-2">
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
      </div>

      <Button className="w-full">Apply Filters</Button>
    </div>
  );
};

export default TourFilterSection;
