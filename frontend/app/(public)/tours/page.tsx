"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { MapPin, Star, Clock } from "lucide-react";
import { mockTours } from "@/lib/mock-data";

export default function ToursPage() {
  const [priceRange, setPriceRange] = useState([0, 200]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Explore Tours</h1>
        <p className="text-muted-foreground">
          Find your perfect adventure from our curated collection
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        <aside className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 space-y-6">
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
            </CardContent>
          </Card>
        </aside>

        {/* Tour Cards */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              {mockTours.length} tours found
            </p>
            <select className="p-2 border border-input rounded-md bg-background text-sm">
              <option>Most Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockTours.map((tour) => (
              <Card
                key={tour.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-56">
                  <Image
                    src={tour.images[0] || "/placeholder.svg"}
                    alt={tour.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-white text-foreground font-semibold">
                    ${tour.price}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    {tour.location}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-balance">
                    {tour.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {tour.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="font-semibold">{tour.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({tour.reviewCount})
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {tour.duration}
                    </div>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={`/tours/${tour.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
