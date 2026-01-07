"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MapPin,
  Clock,
  Users,
  Star,
  Globe,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import type { Tour, Review } from "@/lib/mock-data";
import { ITour } from "@/interfaces/tour.interface";

interface TourDetailsClientProps {
  tour: ITour;
  // tourReviews: Review[]
}

export default function TourDetailsClient({ tour }: TourDetailsClientProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedImage, setSelectedImage] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleBooking = () => {
    if (!isAuthenticated) {
      toast.error("Please login to book this tour");
      router.push("/login");
      return;
    }

    if (!selectedDate) {
      toast.error("Please select a date for your tour");
      return;
    }

    toast.success(
      "Booking request sent! The guide will review your request and respond soon."
    );
    setBookingOpen(false);
    setSelectedDate(undefined);
    setMessage("");
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % tour.images.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + tour.images.length) % tour.images.length
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/explore">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Tours
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
              <img
                src={tour.images[selectedImage] || "/placeholder.svg"}
                alt={tour.title}
                className="w-full h-full object-cover"
              />
              {tour.images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {tour.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === selectedImage
                            ? "w-8 bg-white"
                            : "w-2 bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Tour Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <Badge className="mb-2">{tour.category}</Badge>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {tour.title}
                  </h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {tour.city}, {tour.country}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-semibold text-foreground">
                        {tour.averageRating}
                      </span>
                      <span>(5 reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Guide Info */}
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={tour.guide?.profileImage || "/placeholder.svg"}
                  />
                  <AvatarFallback>{tour.guide?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Guided by</p>
                  <Link
                    href={`/profile/${tour.guide?._id}`}
                    className="text-lg font-semibold hover:text-primary"
                  >
                    {tour.guide?.name}
                  </Link>
                </div>
                <Button variant="outline" asChild>
                  <Link href={`/profile/${tour.guide?._id}`}>View Profile</Link>
                </Button>
              </div>

              <Separator className="my-6" />

              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  About This Experience
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {tour.description}
                </p>
              </div>

              <Separator className="my-6" />

              {/* Details */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Tour Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-semibold">{tour.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Group Size
                      </p>
                      <p className="font-semibold">
                        Max {tour.maxGroupSize} people
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Languages</p>
                      <p className="font-semibold">
                        {/* {tour.language.join(", ")} */}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Meeting Point
                      </p>
                      <p className="font-semibold">{tour.meetingPoint}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Reviews */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Reviews</h2>
                {0 > 0 ? (
                  <div className="space-y-4">
                    {([] as Review[]).map((review) => (
                      <Card key={review?.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage
                                src={
                                  review?.touristAvatar || "/placeholder.svg"
                                }
                              />
                              <AvatarFallback>
                                {review.touristName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <p className="font-semibold">
                                    {review.touristName}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(review.date).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="flex gap-1">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className="h-4 w-4 fill-accent text-accent"
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-muted-foreground">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No reviews yet. Be the first to book this tour!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold">${tour.price}</span>
                      <span className="text-muted-foreground">per person</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{5} reviews</p>
                  </div>

                  <Separator />

                  <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full" size="lg">
                        Request to Book
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-125">
                      <DialogHeader>
                        <DialogTitle>Book Your Tour</DialogTitle>
                        <DialogDescription>
                          Select a date and send a booking request to the guide
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Select Date</Label>
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date()}
                            className="rounded-md border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">
                            Message to Guide (Optional)
                          </Label>
                          <Textarea
                            id="message"
                            placeholder="Tell the guide about yourself and what you're interested in..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                          />
                        </div>
                        {selectedDate && (
                          <div className="rounded-lg border p-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Date
                              </span>
                              <span className="font-medium">
                                {selectedDate.toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Price per person
                              </span>
                              <span className="font-medium">${tour.price}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold">
                              <span>Total</span>
                              <span>${tour.price}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <Button onClick={handleBooking} className="w-full">
                        Send Request
                      </Button>
                    </DialogContent>
                  </Dialog>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Free cancellation up to 24 hours before
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Small group size for personalized experience
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
