import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MapPin, Star, Clock, SlidersHorizontal } from "lucide-react";
import TourFilterSection from "@/components/module/tour/TourFilterSection";
import { getTours } from "@/action/tour";
import { queryStringFormatter } from "@/lib/formatters";
import TourSorting from "@/components/module/tour/TourSorting";
import { Input } from "@/components/ui/input";
import SearchTour from "@/components/module/tour/SearchTour";

const ToursPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  if (!searchParamsObj.sortBy && !searchParamsObj.sortOrder) {
    searchParamsObj.sortBy = "averageRating";
    searchParamsObj.sortOrder = "desc";
  }
  const queryString = queryStringFormatter(searchParamsObj);
  const tours = await getTours(queryString);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Explore Tours</h1>
          <p className="text-muted-foreground">
            Find your perfect adventure from our curated collection
          </p>
        </div>
        <SearchTour />
      </div>

      <div className="flex gap-8">
        {/* Desktop Fixed Sidebar - hidden on mobile */}
        <aside className="hidden lg:block lg:w-80 shrink-0">
          <div className="sticky top-24">
            <Card>
              <CardContent className="p-6">
                <TourFilterSection />
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between w-full items-center gap-3 mb-6">
            <div className="flex gap-2 items-center">
              {/* Mobile Filter Sheet Trigger */}
              <Sheet modal={false}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden bg-transparent"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-75 sm:w-100 overflow-y-auto p-4"
                >
                  <SheetHeader className="sr-only">
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <TourFilterSection />
                  </div>
                </SheetContent>
              </Sheet>

              <p className="text-sm text-muted-foreground">
                {tours?.data.length} tours found
              </p>
            </div>

            <TourSorting />
          </div>

          {/* Tour Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {!tours && (
              <p className="text-muted-foreground text-center col-span-full">
                No tours found
              </p>
            )}
            {tours?.data.map((tour) => (
              <Card
                key={tour._id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-56">
                  <Image
                    src={tour.images[0] || "/placeholder.svg"}
                    alt={tour.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-white text-foreground font-semibold">
                    ${tour.price}
                  </Badge>
                  <Badge className="absolute top-3 left-3 bg-white text-foreground font-semibold capitalize">
                    {tour.category}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    {tour.city}, {tour.country}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-balance">
                    {tour.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {tour.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="font-semibold">
                        {tour.averageRating}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({tour.totalReviews})
                      </span>
                    </div>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={`/tours/${tour._id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToursPage;
