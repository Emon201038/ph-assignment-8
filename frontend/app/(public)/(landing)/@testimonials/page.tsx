import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import React from "react";

const TestimonialsPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          name: "Sarah Johnson",
          location: "New York, USA",
          avatar: "/placeholder.svg?height=60&width=60",
          rating: 5,
          comment:
            "The best travel experience I've ever had! Our guide showed us parts of the city we never would have discovered on our own.",
        },
        {
          name: "David Chen",
          location: "Singapore",
          avatar: "/placeholder.svg?height=60&width=60",
          rating: 5,
          comment:
            "Incredible value and authentic experiences. I felt like I was exploring with a friend rather than a tour guide.",
        },
        {
          name: "Emma Williams",
          location: "London, UK",
          avatar: "/placeholder.svg?height=60&width=60",
          rating: 5,
          comment:
            "This platform connects you with passionate locals who truly love their cities. Can't recommend it enough!",
        },
      ].map((testimonial) => (
        <Card key={testimonial.name}>
          <CardContent className="p-6">
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-muted-foreground mb-6 italic">
              "{testimonial.comment}"
            </p>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.location}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TestimonialsPage;
