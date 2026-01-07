import Link from "next/link";
import React from "react";
import { MapPin, Star } from "lucide-react";
import { serverFetch } from "@/lib/server-fetch";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getTours } from "@/services/tour/tour.service";

const FeatureToursPage = async () => {
  const searchParams = new URLSearchParams({
    limit: "6",
    isFeatured: "true",
  });
  const data = await getTours(searchParams.toString());

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data?.data?.map((tour: any) => (
        <Link key={tour._id} href={`/tours/${tour._id}`}>
          <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 h-full">
            <div className="relative h-56 overflow-hidden">
              <img
                src={tour.images[0] || "/placeholder.svg"}
                alt={tour.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <Badge className="absolute top-4 right-4 bg-background/90 text-foreground border">
                <Star className="h-3 w-3 fill-accent text-accent mr-1" />
                {tour.rating}
              </Badge>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {tour.city}, {tour.country}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {tour.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                {tour.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"></div>
                <div className="text-right">
                  <p className="text-2xl font-bold">${tour.price}</p>
                  <p className="text-xs text-muted-foreground">per person</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default FeatureToursPage;
