import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Calendar, Clock, DollarSign, Users, Star } from "lucide-react";
import CreateTourModal from "@/components/module/guide/CreateTourModal";
import { auth } from "@/lib/session";

export default async function GuideDashboardPage() {
  const session = await auth();

  const stats = [
    {
      label: "Total Earnings",
      value: "$4,250",
      icon: DollarSign,
      change: "+12%",
    },
    { label: "Tours This Month", value: "8", icon: Calendar, change: "+3" },
    { label: "Avg Rating", value: "4.9", icon: Star, change: "+0.1" },
    { label: "Total Travelers", value: "127", icon: Users, change: "+24" },
  ];

  const upcomingBookings = [
    {
      id: "1",
      tourTitle: "Hidden Jazz Bars of New Orleans",
      touristName: "Sarah Johnson",
      touristAvatar: "/placeholder.svg?height=50&width=50",
      date: "2024-12-15",
      time: "7:00 PM",
      status: "confirmed" as const,
      price: 120,
    },
    {
      id: "2",
      tourTitle: "Street Food Paradise Walk",
      touristName: "David Chen",
      touristAvatar: "/placeholder.svg?height=50&width=50",
      date: "2024-12-18",
      time: "6:00 PM",
      status: "pending" as const,
      price: 95,
    },
  ];

  const myTours = [
    {
      id: "1",
      title: "Hidden Jazz Bars of New Orleans",
      image: "/placeholder.svg?height=100&width=150",
      rating: 4.9,
      reviewCount: 127,
      price: 120,
      status: "active" as const,
    },
    {
      id: "2",
      title: "Sunset Photography Adventure",
      image: "/placeholder.svg?height=100&width=150",
      rating: 4.8,
      reviewCount: 89,
      price: 110,
      status: "active" as const,
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "secondary",
      confirmed: "default",
      active: "default",
      inactive: "outline",
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Guide Dashboard
            </h1>
            <p className="text-muted-foreground">Welcome back,</p>
          </div>
          <CreateTourModal userId={session?.data?._id} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {stat.label}
                    </span>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <span className="text-sm text-accent font-medium">
                      {stat.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="tours">My Tours</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>
                  Manage your tour requests and confirmations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar>
                        <AvatarImage
                          src={booking.touristAvatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {booking.touristName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{booking.tourTitle}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {booking.touristName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(booking.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {booking.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold">${booking.price}</div>
                        {getStatusBadge(booking.status)}
                      </div>
                      {booking.status === "pending" && (
                        <div className="flex gap-2">
                          <Button size="sm">Accept</Button>
                          <Button size="sm" variant="outline">
                            Decline
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tours" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>My Tours</CardTitle>
                    <CardDescription>Manage your tour listings</CardDescription>
                  </div>
                  <Button asChild>
                    <Link href="/dashboard/listings/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Tour
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {myTours.map((tour) => (
                  <div
                    key={tour.id}
                    className="flex items-center gap-4 p-4 border rounded-lg"
                  >
                    <div className="w-32 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                      <img
                        src={tour.image || "/placeholder.svg"}
                        alt={tour.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{tour.title}</h4>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-accent text-accent" />
                          <span className="font-medium">{tour.rating}</span>
                          <span className="text-muted-foreground">
                            ({tour.reviewCount})
                          </span>
                        </div>
                        <span className="font-semibold">${tour.price}</span>
                        {getStatusBadge(tour.status)}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
                <CardDescription>
                  Your income and payout history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        This Month
                      </p>
                      <p className="text-2xl font-bold">$1,250</p>
                    </div>
                    <Button>Request Payout</Button>
                  </div>
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Pending Earnings
                      </p>
                      <p className="text-2xl font-bold">$420</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Lifetime Earnings
                      </p>
                      <p className="text-2xl font-bold">$18,750</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
