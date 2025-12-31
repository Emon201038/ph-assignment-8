import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import React from "react";

const ProfileReviewsPage = () => {
  return (
    <Card className="p-6 border-primary/20 mb-6">
      <h3 className="text-xl font-semibold mb-6">Recent Reviews</h3>
      <div className="space-y-6">
        <div className="border-b border-border pb-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/male-tourist.jpg" />
              <AvatarFallback>AT</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-semibold">Alex Thompson</div>
                  <div className="text-sm text-muted-foreground">
                    Gothic Quarter Tour
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                </div>
              </div>
              <p className="text-foreground/80">
                Sofia is an amazing guide! Her knowledge of Barcelona's history
                is incredible, and she made the tour both educational and fun.
                Highly recommend!
              </p>
              <div className="text-sm text-muted-foreground mt-2">
                December 10, 2024
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-border pb-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/female-tourist.jpg" />
              <AvatarFallback>SK</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-semibold">Sarah Kim</div>
                  <div className="text-sm text-muted-foreground">
                    Gaudi Architecture Tour
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                </div>
              </div>
              <p className="text-foreground/80">
                Best tour guide ever! Sofia's passion for Gaudi's work is
                contagious. She shared so many interesting details that I
                wouldn't have known otherwise.
              </p>
              <div className="text-sm text-muted-foreground mt-2">
                December 8, 2024
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/asian-male-tourist.jpg" />
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-semibold">Mike Johnson</div>
                  <div className="text-sm text-muted-foreground">
                    Tapas & Wine Tour
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                </div>
              </div>
              <p className="text-foreground/80">
                The food tour was absolutely fantastic! Sofia took us to
                authentic local spots that tourists never find. Great food,
                great company, great experience!
              </p>
              <div className="text-sm text-muted-foreground mt-2">
                December 5, 2024
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileReviewsPage;
