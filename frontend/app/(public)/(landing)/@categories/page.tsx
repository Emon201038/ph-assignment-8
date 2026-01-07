import { Camera, Globe, Landmark, Trees, UtensilsCrossed } from "lucide-react";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const CategoriesPage = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        {
          name: "Nature",
          icon: Trees,
          color: "bg-accent/10 text-accent",
        },
        {
          name: "History",
          icon: Landmark,
          color: "bg-primary/10 text-primary",
        },
        {
          name: "Photography",
          icon: Camera,
          color: "bg-secondary/20 text-secondary-foreground",
        },
        {
          name: "Cultural",
          icon: Globe,
          color: "bg-muted text-muted-foreground",
        },
      ].map((category) => {
        const Icon = category.icon;
        return (
          <Link
            key={category.name}
            href={`/tours?category=${category.name
              .split(" ")[0]
              .toLowerCase()}`}
          >
            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div
                  className={`h-16 w-16 rounded-full ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold">{category.name}</h3>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoriesPage;
