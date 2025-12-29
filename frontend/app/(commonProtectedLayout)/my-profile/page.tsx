import {
  MapPin,
  Star,
  Calendar,
  Heart,
  Bookmark,
  Settings,
  Camera,
  Globe,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TouristProfile() {
  const user = {
    name: "Alex Thompson",
    role: "Travel Enthusiast",
    location: "San Francisco, USA",
    avatar: "/male-tourist.jpg",
    coverImage: "/barcelona-cityscape-night.jpg",
    memberSince: "2023",
    toursCompleted: 12,
    reviewsWritten: 8,
    savedTours: 15,
    interests: ["Architecture", "Food & Culture", "Photography", "History"],
    languages: ["English", "Spanish"],
    bio: "Passionate traveler exploring the world one city at a time. I love discovering hidden gems, trying local cuisine, and capturing memories through photography.",
    contact: {
      email: "alex.thompson@email.com",
    },
  };

  const upcomingBookings = [
    {
      id: 1,
      title: "Gothic Quarter Night Walk",
      guide: "Sofia Martinez",
      date: "Apr 15, 2025",
      time: "7:00 PM",
      duration: "3 hours",
      price: 45,
      image: "/gothic-quarter-barcelona-night.jpg",
    },
    {
      id: 2,
      title: "Gaudí Architecture Tour",
      guide: "Sofia Martinez",
      date: "Apr 17, 2025",
      time: "10:00 AM",
      duration: "4 hours",
      price: 65,
      image: "/sagrada-familia-gaudi.jpg",
    },
  ];

  const completedTours = [
    {
      id: 1,
      title: "Barcelona Food & Wine Experience",
      guide: "Sofia Martinez",
      date: "Jan 20, 2025",
      rating: 5,
      image: "/spanish-tapas-wine.jpg",
      reviewed: true,
    },
    {
      id: 2,
      title: "Gothic Quarter History Walk",
      guide: "Carlos Rodriguez",
      date: "Dec 10, 2024",
      rating: 4,
      image: "/gothic-quarter-barcelona-night.jpg",
      reviewed: true,
    },
  ];

  const savedTours = [
    {
      id: 1,
      title: "Barcelona Food & Wine Experience",
      guide: "Sofia Martinez",
      price: 85,
      rating: 4.8,
      image: "/spanish-tapas-wine.jpg",
    },
    {
      id: 2,
      title: "Sagrada Familia Architecture Tour",
      guide: "Maria Garcia",
      price: 55,
      rating: 4.9,
      image: "/sagrada-familia-gaudi.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img
          src={user.coverImage || "/placeholder.svg"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-end mb-8">
          <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
            <AvatarImage
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
            />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-balance mb-2">
                  {user.name}
                </h1>
                <p className="text-lg text-muted-foreground mb-2">
                  {user.role}
                </p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="lg">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button size="lg" variant="outline">
                  Share Profile
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold">
                      {user.toursCompleted}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Tours completed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold">
                      {user.reviewsWritten}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Reviews written
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Bookmark className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold">
                      {user.savedTours}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Saved tours</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Heart className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold">
                      {user.memberSince}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Member since</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedTours.length})
            </TabsTrigger>
            <TabsTrigger value="saved">Saved ({savedTours.length})</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          {/* Upcoming Bookings Tab */}
          <TabsContent value="upcoming">
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <Card
                  key={booking.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative h-48 md:h-auto md:w-64 overflow-hidden shrink-0">
                      <img
                        src={booking.image || "/placeholder.svg"}
                        alt={booking.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">
                            {booking.title}
                          </h3>
                          <p className="text-muted-foreground mb-2">
                            Guide: {booking.guide}
                          </p>
                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {booking.date}
                            </span>
                            <span>{booking.time}</span>
                            <span>{booking.duration}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold mb-2">
                            ${booking.price}
                          </div>
                          <Badge variant="secondary">Confirmed</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button>View Details</Button>
                        <Button variant="outline">Contact Guide</Button>
                        <Button variant="ghost">Cancel</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Completed Tours Tab */}
          <TabsContent value="completed">
            <div className="space-y-4">
              {completedTours.map((tour) => (
                <Card
                  key={tour.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative h-48 md:h-auto md:w-64 overflow-hidden shrink-0">
                      <img
                        src={tour.image || "/placeholder.svg"}
                        alt={tour.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">
                            {tour.title}
                          </h3>
                          <p className="text-muted-foreground mb-2">
                            Guide: {tour.guide}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              {tour.date}
                            </span>
                            <div className="flex gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < tour.rating
                                      ? "fill-primary text-primary"
                                      : "text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        {tour.reviewed && (
                          <Badge variant="outline" className="shrink-0">
                            <Star className="h-3 w-3 mr-1" />
                            Reviewed
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">View Review</Button>
                        <Button variant="outline">Book Again</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Saved Tours Tab */}
          <TabsContent value="saved">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedTours.map((tour) => (
                <Card
                  key={tour.id}
                  className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-2 right-2"
                    >
                      <Bookmark className="h-4 w-4 fill-primary" />
                    </Button>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg">{tour.title}</CardTitle>
                      <Badge variant="secondary" className="shrink-0">
                        <Star className="h-3 w-3 mr-1 fill-primary text-primary" />
                        {tour.rating}
                      </Badge>
                    </div>
                    <CardDescription>Guide: {tour.guide}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">${tour.price}</span>
                      <Button>Book Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {user.bio}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Travel Gallery</CardTitle>
                    <CardDescription>
                      Memories from my adventures
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                          key={i}
                          className="relative aspect-square bg-muted rounded-lg overflow-hidden group cursor-pointer"
                        >
                          <img
                            src={`/vibrant-market-street.png?height=200&width=200&query=travel photo ${i}`}
                            alt={`Travel photo ${i}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Camera className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Languages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {user.languages.map((lang) => (
                        <Badge key={lang} variant="secondary">
                          <Globe className="h-3 w-3 mr-1" />
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Interests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {user.interests.map((interest) => (
                        <Badge key={interest} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {user.contact.email}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
