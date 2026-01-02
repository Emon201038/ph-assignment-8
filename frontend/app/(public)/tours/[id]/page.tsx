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
} from "lucide-react";
import { mockTours, mockGuides } from "@/lib/mock-data";
import { notFound } from "next/navigation";

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsObj = await params;
  console.log(paramsObj);
  const tour = mockTours.find((t) => t.id === paramsObj.id);

  if (!tour) {
    notFound();
  }

  const recommendedGuides = mockGuides.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Tour Banner */}
      <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
        <Image
          src={tour.image || "/placeholder.svg"}
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <Badge className="mb-3 bg-white text-foreground">
            {tour.category}
          </Badge>
          <h1 className="text-4xl font-bold mb-2 text-balance">{tour.title}</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {tour.location}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-white" />
              {tour.rating} ({tour.reviews} reviews)
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {tour.duration}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">About This Tour</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {tour.description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Group Size</p>
                    <p className="font-semibold">Max 8 people</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Availability
                    </p>
                    <p className="font-semibold">Daily</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Itinerary */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Itinerary</h2>
              <div className="space-y-4">
                {tour.itinerary.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {index + 1}
                      </div>
                      {index < tour.itinerary.length - 1 && (
                        <div className="w-0.5 flex-1 bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <p className="font-semibold mb-1">{item.time}</p>
                      <p className="text-muted-foreground">{item.activity}</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-bold">${tour.price}</span>
                <span className="text-muted-foreground">per person</span>
              </div>
              <Button size="lg" className="w-full mb-4" asChild>
                <Link href={`/book/${tour.id}`}>Book This Tour</Link>
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

      {/* Recommended Guides */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">
          Recommended Guides for This Tour
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedGuides.map((guide) => (
            <Card
              key={guide.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                      src={guide.avatar || "/placeholder.svg"}
                      alt={guide.name}
                      fill
                      className="rounded-full object-cover"
                    />
                    {guide.available && (
                      <div className="absolute bottom-0 right-0 h-5 w-5 bg-accent rounded-full border-2 border-card" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{guide.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {guide.location}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="text-sm font-semibold">
                        {guide.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {guide.languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full bg-transparent"
                  asChild
                >
                  <Link href={`/profile/${guide.id}`}>View Profile</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
