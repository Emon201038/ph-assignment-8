import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Star,
  Clock,
  Users,
  Calendar,
  CheckCircle,
  CalendarDays,
  Languages,
} from "lucide-react";
import { mockTours, mockGuides, mockTrips } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { getSingleTour } from "@/action/tour";

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsObj = await params;
  const tour = await getSingleTour(paramsObj.id);

  if (!tour) {
    notFound();
  }

  if (!tour) {
    notFound();
  }

  return (
    <>
      {/* Tour Banner */}
      <div className="relative h-100 rounded-xl overflow-hidden mb-8">
        <Image
          src={tour?.data?.images[0] || "/placeholder.svg"}
          alt={tour?.data?.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <Badge className="mb-3 bg-white text-foreground capitalize">
            {tour?.data?.category}
          </Badge>
          <h1 className="text-4xl font-bold mb-2 text-balance">
            {tour?.data?.title}
          </h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {tour?.data?.city}, {tour?.data?.country}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-white" />
              {tour?.data?.averageRating} ({tour?.data?.totalReviews} reviews)
            </div>
            <div className="flex items-center gap-1">
              <Languages className="h-4 w-4" />
              {tour?.data?.language}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Description */}
          <Card>
            <CardContent className="">
              <h2 className="text-2xl font-bold mb-4">About This Tour</h2>
              <p className="text-muted-foreground leading-relaxed">
                {tour?.data?.description}
              </p>
            </CardContent>
          </Card>

          {/* Itinerary */}
          <Card
            className={`${tour?.data?.itinerary.length > 0 ? "" : "hidden"}`}
          >
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Itinerary</h2>
              <div className="space-y-4">
                {tour?.data?.itinerary.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {index + 1}
                      </div>
                      {index < tour?.data?.itinerary.length - 1 && (
                        <div className="w-0.5 flex-1 bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <p className="font-semibold mb-1">{item.title}</p>
                      <p className="text-muted-foreground">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* What's Included */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">{"What's Included"}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  "Professional guide",
                  "All entrance fees",
                  "Bottled water",
                  "Small group experience",
                  "Hotel pickup available",
                  "Travel insurance",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1 hidden">
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-bold">${tour?.data?.price}</span>
                <span className="text-muted-foreground">per person</span>
              </div>
              <Button size="lg" className="w-full mb-4" asChild>
                <Link href={`/book/${tour?.data?._id}`}>Book This Tour</Link>
              </Button>
              <p className="text-xs text-center text-muted-foreground mb-6">
                Free cancellation up to 24 hours before
              </p>

              <div className="space-y-3 pt-6 border-t border-border">
                <h3 className="font-semibold">Why Book With Us?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    Best price guarantee
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    Instant confirmation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    24/7 customer support
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
