import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Calendar, MapPin, Clock, Check, Users } from "lucide-react";
import { getSingleTripDetails } from "@/services/trip/trip.service";
import BookingForm from "@/components/module/booking/BookingForm";
import { Button } from "@/components/ui/button";
import TripParticipants from "@/components/module/trip/TripParticipants";

export default async function BookTripPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const paramsObj = await params;
  const trip = await getSingleTripDetails(paramsObj.tripId);
  const tour = trip.tour;
  const participants = String(trip.maxCapacity - trip.bookedSeats);
  const totalPrice = tour.price * Number.parseInt(participants || "1");
  const isFull = trip.status === "FULL";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href={`/tours/${tour._id}`}
          className="text-sm text-muted-foreground hover:text-foreground mb-2 inline-block"
        >
          ← Back to tour details
        </Link>
        <h1 className="text-4xl font-bold">Book Your Trip</h1>
      </div>

      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative  rounded-lg overflow-hidden">
            <Image
              src={tour.images[0] || "/placeholder.svg"}
              alt={tour.title}
              width={460}
              height={200}
              className="object-cover w-full"
            />
          </div>

          <div>
            <h3 className="font-semibold mb-2">{tour.title}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {tour.city}, {tour.country}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {tour.duration}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(trip.startDate).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {participants}{" "}
                {Number.parseInt(participants) === 1 ? "person" : "people"}
              </div>
            </div>
          </div>

          <TripParticipants trip={trip}>
            <div className="space-y-2 pt-4 border-t text-xs text-muted-foreground">
              <p className="flex items-start gap-2">
                <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                Free cancellation up to 24 hours before
              </p>
              <p className="flex items-start gap-2">
                <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                Instant confirmation
              </p>
              <p className="flex items-start gap-2">
                <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                Mobile ticket accepted
              </p>
            </div>
          </TripParticipants>
        </CardContent>
      </Card>
    </div>
  );
}
