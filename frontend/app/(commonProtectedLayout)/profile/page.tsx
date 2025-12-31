import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users } from "lucide-react";

export default function GuideProfile() {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Active Tours</h3>
      </div>

      <Card className="p-6 border-primary/20 hover:border-primary/40 transition-colors">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src="/gothic-quarter-barcelona-night.jpg"
            alt="Gothic Quarter Tour"
            className="w-full md:w-48 h-32 object-cover rounded-lg"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Gothic Quarter Night Walking Tour
                </h3>
                <p className="text-muted-foreground mb-3">
                  Explore the medieval streets and hidden corners of Barcelona's
                  Gothic Quarter
                </p>
              </div>
              <Badge className="bg-chart-2/20 text-chart-2 border-chart-2/30">
                Active
              </Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Max 10 people</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span>4.9 (87 reviews)</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-primary/30 bg-transparent"
              >
                Edit Tour
              </Button>
              <Button variant="ghost" size="sm">
                View Bookings
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-primary/20 hover:border-primary/40 transition-colors">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src="/sagrada-familia-gaudi.jpg"
            alt="Gaudi Architecture"
            className="w-full md:w-48 h-32 object-cover rounded-lg"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Gaudi Architecture Masterclass
                </h3>
                <p className="text-muted-foreground mb-3">
                  Deep dive into the works of Antoni Gaudi including Sagrada
                  Familia
                </p>
              </div>
              <Badge className="bg-chart-2/20 text-chart-2 border-chart-2/30">
                Active
              </Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Max 8 people</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span>5.0 (124 reviews)</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-primary/30 bg-transparent"
              >
                Edit Tour
              </Button>
              <Button variant="ghost" size="sm">
                View Bookings
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-primary/20 hover:border-primary/40 transition-colors">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src="/spanish-tapas-wine.jpg"
            alt="Tapas Tour"
            className="w-full md:w-48 h-32 object-cover rounded-lg"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Authentic Tapas & Wine Experience
                </h3>
                <p className="text-muted-foreground mb-3">
                  Visit the best local taverns and taste authentic Spanish
                  cuisine
                </p>
              </div>
              <Badge className="bg-chart-2/20 text-chart-2 border-chart-2/30">
                Active
              </Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Max 12 people</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span>4.8 (156 reviews)</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-primary/30 bg-transparent"
              >
                Edit Tour
              </Button>
              <Button variant="ghost" size="sm">
                View Bookings
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
