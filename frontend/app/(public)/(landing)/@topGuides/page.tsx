import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { mockGuides } from "@/lib/mock-data";
import { Star } from "lucide-react";
import Link from "next/link";
import React from "react";

const TopGuidesPage = () => {
  const topGuides = mockGuides;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {topGuides.map((guide) => (
        <Link key={guide.id} href={`/profile/${guide.id}`}>
          <Card className="group hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all">
                <AvatarImage src={guide.profilePic || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">
                  {guide.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold mb-1">{guide.name}</h3>
              <div className="flex items-center justify-center gap-1 mb-3">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="font-semibold">{guide.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({guide.toursGiven} tours)
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {guide.bio}
              </p>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {guide.expertise?.slice(0, 3).map((exp) => (
                  <Badge key={exp} variant="secondary" className="text-xs">
                    {exp}
                  </Badge>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                {guide.languages?.join(", ")}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default TopGuidesPage;
