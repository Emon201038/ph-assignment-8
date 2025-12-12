"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  MapPin,
  DollarSign,
  TrendingUp,
  MoreVertical,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminDashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  // if (!isAuthenticated || user?.role !== "admin") {
  //   router.push("/login");
  //   return null;
  // }

  const stats = [
    {
      label: "Total Users",
      value: "12,543",
      icon: Users,
      change: "+523 this month",
      trend: "up",
    },
    {
      label: "Active Guides",
      value: "1,247",
      icon: MapPin,
      change: "+89 this month",
      trend: "up",
    },
    {
      label: "Total Revenue",
      value: "$127,450",
      icon: DollarSign,
      change: "+12.5%",
      trend: "up",
    },
    {
      label: "Growth Rate",
      value: "+24%",
      icon: TrendingUp,
      change: "vs last month",
      trend: "up",
    },
  ];

  const recentUsers = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "tourist",
      joinDate: "2024-12-01",
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike@example.com",
      role: "guide",
      joinDate: "2024-12-02",
    },
    {
      id: "3",
      name: "Emma Wilson",
      email: "emma@example.com",
      role: "tourist",
      joinDate: "2024-12-02",
    },
    {
      id: "4",
      name: "Carlos Rodriguez",
      email: "carlos@example.com",
      role: "guide",
      joinDate: "2024-12-03",
    },
  ];

  const recentTours = [
    {
      id: "1",
      title: "Hidden Jazz Bars",
      guide: "Marcus Johnson",
      status: "active",
      bookings: 24,
      revenue: "$2,880",
    },
    {
      id: "2",
      title: "Tokyo Food Tour",
      guide: "Takeshi Yamamoto",
      status: "active",
      bookings: 31,
      revenue: "$2,945",
    },
    {
      id: "3",
      title: "Paris Gardens",
      guide: "Sophie Laurent",
      status: "active",
      bookings: 18,
      revenue: "$2,520",
    },
    {
      id: "4",
      title: "Barcelona Photography",
      guide: "Carlos Rodriguez",
      status: "pending",
      bookings: 8,
      revenue: "$880",
    },
  ];

  const pendingReviews = [
    {
      id: "1",
      tour: "Hidden Jazz Bars",
      user: "Sarah J.",
      rating: 5,
      status: "pending",
    },
    {
      id: "2",
      tour: "Street Food Walk",
      user: "Mike C.",
      rating: 4,
      status: "pending",
    },
    {
      id: "3",
      tour: "Art Gallery Tour",
      user: "Emma W.",
      rating: 5,
      status: "flagged",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Comprehensive platform management and oversight
          </p>
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
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <p className="text-sm text-accent font-medium">
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="tours">Tours</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Users</CardTitle>
                  <Button variant="outline">View All Users</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge
                          variant={
                            user.role === "guide" ? "default" : "secondary"
                          }
                        >
                          {user.role}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(user.joinDate).toLocaleDateString()}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Suspend
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tours">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Tour Listings</CardTitle>
                  <Button variant="outline">View All Tours</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTours.map((tour) => (
                    <div
                      key={tour.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-semibold">{tour.title}</p>
                        <p className="text-sm text-muted-foreground">
                          by {tour.guide}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">{tour.revenue}</p>
                          <p className="text-sm text-muted-foreground">
                            {tour.bookings} bookings
                          </p>
                        </div>
                        <Badge
                          variant={
                            tour.status === "active" ? "default" : "secondary"
                          }
                        >
                          {tour.status}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            {tour.status === "pending" && (
                              <DropdownMenuItem>Approve</DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-destructive">
                              Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-12 text-center">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-2">
                    Booking management system
                  </p>
                  <p className="text-sm text-muted-foreground">
                    View and manage all platform bookings
                  </p>
                  <Button className="mt-4">View All Bookings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Pending Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingReviews.map((review) => (
                    <div
                      key={review.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-semibold">{review.tour}</p>
                        <p className="text-sm text-muted-foreground">
                          by {review.user}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <span key={i} className="text-accent">
                              ★
                            </span>
                          ))}
                        </div>
                        <Badge
                          variant={
                            review.status === "flagged"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {review.status}
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm">Approve</Button>
                          <Button size="sm" variant="outline">
                            Flag
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
