"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MapPin, Star } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function MyBookingsPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  // if (!isAuthenticated || user?.role !== "tourist") {
  //   router.push("/login")
  //   return null
  // }

  // Mock bookings
  const mockBookings = [
    {
      id: "1",
      tourTitle: "Hidden Jazz Bars of New Orleans",
      tourImage: "/placeholder.svg?height=200&width=300",
      guideName: "Marcus Johnson",
      guideAvatar: "/placeholder.svg?height=50&width=50",
      date: "2024-12-15",
      status: "confirmed" as const,
      price: 120,
      city: "New Orleans, USA",
    },
    {
      id: "2",
      tourTitle: "Street Food Paradise Walk",
      tourImage: "/placeholder.svg?height=200&width=300",
      guideName: "Takeshi Yamamoto",
      guideAvatar: "/placeholder.svg?height=50&width=50",
      date: "2024-12-20",
      status: "pending" as const,
      price: 95,
      city: "Tokyo, Japan",
    },
  ];

  const completedBookings = [
    {
      id: "3",
      tourTitle: "Secret Gardens & Artist Studios",
      tourImage: "/placeholder.svg?height=200&width=300",
      guideName: "Sophie Laurent",
      guideAvatar: "/placeholder.svg?height=50&width=50",
      date: "2024-11-05",
      status: "completed" as const,
      price: 140,
      city: "Paris, France",
      canReview: true,
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "secondary",
      confirmed: "default",
      completed: "outline",
      cancelled: "destructive",
    };
    return (
      <Badge variant={variants[status as keyof typeof variants] as any}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Bookings</h1>
          <p className="text-muted-foreground">Manage your tour bookings</p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {mockBookings.length > 0 ? (
              mockBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden bg-muted shrink-0">
                        <img
                          src={booking.tourImage || "/placeholder.svg"}
                          alt={booking.tourTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-semibold">
                              {booking.tourTitle}
                            </h3>
                            {getStatusBadge(booking.status)}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <MapPin className="h-4 w-4" />
                            {booking.city}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={booking.guideAvatar || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                {booking.guideName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">
                              {booking.guideName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="text-2xl font-bold">
                            ${booking.price}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline">Contact Guide</Button>
                            {booking.status === "pending" && (
                              <Button variant="destructive">Cancel</Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    No upcoming bookings
                  </p>
                  <Button asChild>
                    <Link href="/explore">Explore Tours</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {completedBookings.length > 0 ? (
              completedBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden bg-muted shrink-0">
                        <img
                          src={booking.tourImage || "/placeholder.svg"}
                          alt={booking.tourTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-semibold">
                              {booking.tourTitle}
                            </h3>
                            {getStatusBadge(booking.status)}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <MapPin className="h-4 w-4" />
                            {booking.city}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={booking.guideAvatar || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                {booking.guideName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">
                              {booking.guideName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="text-2xl font-bold">
                            ${booking.price}
                          </div>
                          {booking.canReview && (
                            <Button>
                              <Star className="h-4 w-4 mr-2" />
                              Write a Review
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">No past bookings</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
