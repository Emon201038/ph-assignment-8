"use client";

import { use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Star, Globe, Award, ChevronLeft } from "lucide-react";
import { mockGuides, mockTours, mockReviews } from "@/lib/mock-data";
import { UserRole } from "@/interfaces/user";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const guide = mockGuides.find((g) => g.id === id);
  const guideTours = mockTours.filter((t) => t.guideId === id);
  const guideReviews = mockReviews.filter((r) => r.guideId === id);

  if (!guide) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
        <Button asChild>
          <Link href="/explore">Browse Tours</Link>
        </Button>
      </div>
    );
  }

  const isGuide = guide.role === UserRole.GUIDE;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/explore">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="text-center">
                  <Avatar className="h-32 w-32 mx-auto mb-4 ring-4 ring-primary/10">
                    <AvatarImage src={guide.profilePic || "/placeholder.svg"} />
                    <AvatarFallback className="text-4xl">
                      {guide.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold mb-2">{guide.name}</h1>
                  {isGuide && guide.rating && (
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Star className="h-5 w-5 fill-accent text-accent" />
                      <span className="text-xl font-semibold">
                        {guide.rating}
                      </span>
                      <span className="text-muted-foreground">
                        ({guide.toursGiven} tours)
                      </span>
                    </div>
                  )}
                  <Badge variant="secondary" className="mb-4">
                    {guide.role === UserRole.GUIDE ? "Local Guide" : "Traveler"}
                  </Badge>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">About</h3>
                    <p className="text-sm text-muted-foreground">{guide.bio}</p>
                  </div>

                  {guide.languages && guide.languages.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Languages
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {guide.languages.map((lang) => (
                          <Badge key={lang} variant="outline">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {isGuide && guide.expertise && guide.expertise.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Expertise
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {guide.expertise.map((exp) => (
                          <Badge key={exp} variant="secondary">
                            {exp}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {isGuide && guide.dailyRate && (
                    <div>
                      <h3 className="font-semibold mb-2">Daily Rate</h3>
                      <p className="text-2xl font-bold text-primary">
                        ${guide.dailyRate}
                      </p>
                      <p className="text-sm text-muted-foreground">per day</p>
                    </div>
                  )}
                </div>

                <Separator />

                <Button className="w-full" asChild>
                  <Link href="/explore">View Tours</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {isGuide ? (
              <Tabs defaultValue="tours" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="tours">
                    Tours ({guideTours.length})
                  </TabsTrigger>
                  <TabsTrigger value="reviews">
                    Reviews ({guideReviews.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="tours" className="space-y-4">
                  {guideTours.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                      {guideTours.map((tour) => (
                        <Link key={tour.id} href={`/tours/${tour.id}`}>
                          <Card className="overflow-hidden group hover:shadow-lg transition-all">
                            <div className="flex flex-col sm:flex-row">
                              <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden bg-muted">
                                <img
                                  src={tour.images[0] || "/placeholder.svg"}
                                  alt={tour.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <CardContent className="p-6 flex-1">
                                <div className="space-y-3">
                                  <div>
                                    <Badge className="mb-2">
                                      {tour.category}
                                    </Badge>
                                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                      {tour.title}
                                    </h3>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    {tour.city}, {tour.country}
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {tour.description}
                                  </p>
                                  <div className="flex items-center justify-between pt-3 border-t">
                                    <div className="flex items-center gap-1">
                                      <Star className="h-4 w-4 fill-accent text-accent" />
                                      <span className="font-semibold">
                                        {tour.rating}
                                      </span>
                                      <span className="text-sm text-muted-foreground">
                                        ({tour.reviewCount})
                                      </span>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-xl font-bold">
                                        ${tour.price}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {tour.duration}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-12 text-center">
                        <p className="text-muted-foreground">
                          No tours available
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4">
                  {guideReviews.length > 0 ? (
                    guideReviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage
                                src={review.touristAvatar || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                {review.touristName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <p className="font-semibold">
                                    {review.touristName}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(review.date).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="flex gap-1">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className="h-4 w-4 fill-accent text-accent"
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-muted-foreground">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="p-12 text-center">
                        <p className="text-muted-foreground">No reviews yet</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    Traveler Profile
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    This user is exploring the world with LocalGuide
                  </p>
                  <Button asChild>
                    <Link href="/explore">Find Tours</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
