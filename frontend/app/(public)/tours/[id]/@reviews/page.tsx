import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const page = () => {
  const mockReviews = [
    {
      id: "1",
      userName: "Emily Johnson",
      userAvatar: "/woman-tourist-profile.jpg",
      rating: 5,
      date: "2024-02-15",
      comment:
        "Absolutely incredible experience! Our guide was knowledgeable and friendly. I learned so much about the local culture and history. Highly recommend!",
    },
    {
      id: "2",
      userName: "Michael Chen",
      userAvatar: "/man-tourist-profile.jpg",
      rating: 5,
      date: "2024-02-10",
      comment:
        "Best tour I've ever taken. The itinerary was well-planned and we got to see all the highlights. Worth every penny!",
    },
    {
      id: "3",
      userName: "Sarah Williams",
      userAvatar: "/woman-profile.jpg",
      rating: 4,
      date: "2024-02-05",
      comment:
        "Great tour with beautiful sights. The only reason I'm not giving 5 stars is because we were rushed at a couple of stops. Otherwise, fantastic!",
    },
    {
      id: "4",
      userName: "David Martinez",
      userAvatar: "/man-profile.jpg",
      rating: 5,
      date: "2024-01-28",
      comment:
        "This tour exceeded all my expectations. The guide's passion for the subject matter really shone through. Would definitely book again!",
    },
  ];
  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Reviews</h2>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-secondary text-secondary" />
            <span className="text-xl font-bold">{4.9}</span>
            <span className="text-muted-foreground">(23 reviews)</span>
          </div>
        </div>

        <div className="space-y-6">
          {mockReviews.map((review) => (
            <div
              key={review.id}
              className="border-b last:border-0 pb-6 last:pb-0"
            >
              <div className="flex items-start gap-4">
                <div className="relative h-10 w-10 flex-shrink-0">
                  <Image
                    src={review.userAvatar || "/placeholder.svg"}
                    alt={review.userName}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{review.userName}</h3>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-secondary text-secondary"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-6 bg-transparent">
          Load More Reviews
        </Button>
      </CardContent>
    </Card>
  );
};

export default page;
