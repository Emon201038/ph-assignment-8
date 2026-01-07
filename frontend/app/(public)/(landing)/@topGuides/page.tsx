import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { mockGuides } from "@/lib/mock-data";
import { getFilteredGuide } from "@/services/guide/guide.service";
import { Star } from "lucide-react";
import Link from "next/link";
import languages from "@/data/iso/languages.json";

const TopGuidesPage = async () => {
  const topGuides = await getFilteredGuide(
    "sortBy=averageRating&sortOrder=desc&limit=3&page=1"
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {topGuides.data?.map((guide) => (
        <Link key={guide.profile._id} href={`/profile/${guide.profile._id}`}>
          <Card className="group hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all">
                <AvatarImage
                  src={guide.profile?.profileImage || "/placeholder.svg"}
                />
                <AvatarFallback className="text-2xl">
                  {guide.profile.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold mb-1">
                {guide.profile.name}
              </h3>
              <div className="flex items-center justify-center gap-1 mb-3">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="font-semibold">
                  {guide.averageRating || 0.0}
                </span>
                <span className="text-sm text-muted-foreground">
                  ({guide.totalTrips || 0} tours)
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {guide.profile.bio}
              </p>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {guide.expertise?.slice(0, 3).map((exp) => (
                  <Badge key={exp} variant="secondary" className="text-xs">
                    {exp}
                  </Badge>
                ))}
              </div>
              <div className="text-sm text-muted-foreground space-x-2">
                {languages
                  .filter((l) =>
                    guide.languages.some((lang) => lang === l.code)
                  )
                  ?.map((l) => (
                    <span>{l.name}</span>
                  ))}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default TopGuidesPage;
