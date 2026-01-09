"use client";
import { Button } from "@/components/ui/button";
import { ITour } from "@/interfaces/tour.interface";
import { ITrip, TripStatus } from "@/interfaces/trip.interface";
import { bookTrip } from "@/services/trip/trip.service";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const TripParticipants = ({
  trip,
  children,
}: {
  trip: ITrip;
  children?: React.ReactNode;
}) => {
  const [participants, setParticipants] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const tour = trip.tour;
  const totalPrice = tour.price * participants || 1;
  const spotsLeft = trip.maxCapacity - trip.bookedSeats;

  const handleIncrement = () => {
    if (participants < spotsLeft) {
      setParticipants(participants + 1);
    }
  };

  const handleDecrement = () => {
    if (participants > 1) {
      setParticipants(participants - 1);
    }
  };

  const handleBookNow = async () => {
    try {
      setIsLoading(true);
      const res = await bookTrip({ tripId: trip._id, seats: participants });
      if (!res.success) {
        toast.error(res?.message || "Failed to book trip");
        return;
      }
      toast.success(res?.message || "Trip booked successfully");
      const url = res.data?.checkoutUrl;
      router.push(url);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Failed to book trip");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-3 pt-4 border-t">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Price per person</span>
          <span className="font-semibold">${tour.price}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Participants</span>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 bg-transparent"
              onClick={handleDecrement}
              disabled={participants <= 1}
            >
              -
            </Button>
            <span className="font-bold text-lg w-8 text-center">
              {participants}
            </span>
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 bg-transparent"
              onClick={handleIncrement}
              disabled={participants >= spotsLeft}
            >
              +
            </Button>
          </div>
        </div>
        <div className="flex justify-between text-lg font-bold pt-3 border-t">
          <span>Total</span>
          <span className="text-primary">${totalPrice}</span>
        </div>
      </div>
      <>{children}</>
      {trip.maxCapacity === trip.bookedSeats ||
      trip.status === TripStatus.FULL ? (
        <Button
          size="sm"
          variant="outline"
          className="w-full bg-transparent"
          disabled
        >
          Fully Booked
        </Button>
      ) : (
        <Button
          disabled={isLoading}
          size="sm"
          className="w-full"
          onClick={handleBookNow}
        >
          {isLoading ? "Please wait..." : "Book Now"}
        </Button>
      )}
    </>
  );
};

export default TripParticipants;
