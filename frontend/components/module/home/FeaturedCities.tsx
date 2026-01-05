import Link from "next/link";
import React from "react";
import { Card } from "../../ui/card";

export const cities = [
  {
    name: "Tokyo",
    country: "Japan",
    image: "/images/tokyo.jpeg",
  },
  {
    name: "Paris",
    country: "France",
    image: "/images/paris.jpeg",
  },
  {
    name: "New York",
    country: "USA",
    image: "/images/newyork.jpg",
  },
  {
    name: "Barcelona",
    country: "Spain",
    image: "/images/barcelona.jpeg",
  },
  {
    name: "London",
    country: "UK",
    image: "/images/london.jpeg",
  },
  {
    name: "Istanbul",
    country: "Turkey",
    image: "/images/istanbul.jpeg",
  },
];

const FeaturedCities = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cities.map((city) => (
        <Link key={city.name} href={`/tours?city=${city.name}`}>
          <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="relative h-48 overflow-hidden">
              <img
                src={city.image || "/placeholder.svg"}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-2xl font-bold">{city.name}</h3>
                <p className="text-sm text-white/90">{city.country}</p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedCities;
