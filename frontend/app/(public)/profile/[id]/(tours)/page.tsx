import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users } from "lucide-react";
import { getUserTours } from "@/services/tour/tour.service";
import Link from "next/link";

export default async function GuideProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getUserTours(id);
  return (
    <div className="space-y-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Tours</h3>
      </div>
      {data.data.length === 0 && (
        <p className="w-full text-center my-6 font-semibold text-lg">
          No tours found
        </p>
      )}

      {data.data.map((tour) => (
        <Card
          key={tour._id}
          className="p-6 border-primary/20 hover:border-primary/40 transition-colors"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={tour.trip.tourId.images[0]}
              alt="Gothic Quarter Tour"
              className="w-full md:w-48 h-32 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {tour.trip.tourId.title}
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    {tour.trip.tourId.description}
                  </p>
                </div>
                <Badge className="bg-chart-2/20 text-chart-2 border-chart-2/30">
                  {tour.trip.status}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>Max {tour.trip.maxCapacity} people</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span>
                    {tour.trip.tourId.averageRating} (
                    {tour.trip.tourId.totalReviews} reviews)
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/tours/${tour.trip.tourId._id}`}>
                    View Bookings
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
