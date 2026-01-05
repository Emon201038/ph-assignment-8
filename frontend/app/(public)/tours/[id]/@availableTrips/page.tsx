import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { queryStringFormatter } from "@/lib/formatters";
import { getTourTrips } from "@/services/trip/trip.service";
import { CalendarDays, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ id: string }>;
}) => {
  const paramsObj = await params;
  const tourTrips = await getTourTrips(paramsObj.id);

  console.log(tourTrips);
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Available Trips</h2>
      <p className="text-muted-foreground mb-6">
        Select a scheduled trip with your preferred date and guide
      </p>
      {tourTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tourTrips.map((trip) => {
            const guide = trip.guide;
            const spotsLeft = trip.maxCapacity - trip.bookedSeats;
            const isFull = trip.status === "FULL";

            return (
              <Card
                key={trip._id}
                className={`overflow-hidden hover:shadow-lg transition-shadow ${
                  isFull ? "opacity-60" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-5 w-5 text-primary" />
                      <span className="font-semibold">
                        {new Date(trip.startDate).toLocaleDateString()}
                      </span>
                    </div>
                    <Badge variant={isFull ? "secondary" : "default"}>
                      {isFull ? "Full" : "Available"}
                    </Badge>
                  </div>

                  {guide && (
                    <div className="flex items-start gap-4 mb-4 pb-4 border-b">
                      <Avatar className="size-12">
                        <AvatarImage
                          src={guide.profileImage || "/placeholder.svg"}
                          alt={guide.name}
                        />
                        <AvatarFallback className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-semibold">
                          {guide.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{guide.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 fill-secondary text-secondary" />
                          <span className="text-sm font-semibold">{0}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Max Capacity:
                      </span>
                      <span className="font-semibold">
                        {trip.maxCapacity} people
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Spots Left:</span>
                      <span
                        className={`font-semibold ${
                          spotsLeft <= 2 ? "text-destructive" : "text-accent"
                        }`}
                      >
                        {spotsLeft} {spotsLeft === 1 ? "spot" : "spots"}
                      </span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant={isFull ? "outline" : "default"}
                    className="w-full"
                    disabled={isFull}
                    asChild={!isFull}
                  >
                    {isFull ? (
                      "Fully Booked"
                    ) : (
                      <Link href={`/book-trip/${trip._id}`}>
                        Book This Trip
                      </Link>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              No trips available for this tour at the moment.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Check back later for new scheduled trips.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default page;
