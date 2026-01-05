"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ITrip } from "@/interfaces/trip.interface";
import { CalendarDays } from "lucide-react";
import { useState } from "react";

const BookingForm = ({ trip }: { trip: ITrip }) => {
  const guide = trip.guide;
  const spotsLeft = trip.maxCapacity - trip.bookedSeats;
  return (
    <div className="lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>Trip Booking Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Trip Information */}
          <div className="p-4 bg-muted rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Trip Date</span>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                <span className="font-semibold">
                  {new Date(trip.startDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Your Guide</span>
              <div className="flex items-center gap-2">
                <Avatar className="size-6 border">
                  <AvatarImage src={guide.profileImage} />
                  <AvatarFallback>{guide.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <span className="font-semibold">{guide.name}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Available Spots
              </span>
              <span
                className={`font-semibold ${
                  spotsLeft <= 2 ? "text-destructive" : "text-accent"
                }`}
              >
                {spotsLeft} spots left
              </span>
            </div>
          </div>

          {/* Participants */}
          <div className="space-y-2">
            <Label htmlFor="participants">Number of Participants</Label>
            <Input id="participants" type="number" min="1" max={spotsLeft} />
            <p className="text-xs text-muted-foreground">
              Maximum {spotsLeft} {spotsLeft === 1 ? "person" : "people"} for
              this trip
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 pt-4 border-t">
            <h4 className="font-semibold">Contact Information</h4>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
            </div>
          </div>

          <Button size="lg" className="w-full">
            Proceed to Payment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;
