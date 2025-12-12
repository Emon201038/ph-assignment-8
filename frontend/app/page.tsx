import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  MapPin,
  Users,
  Award,
  Shield,
  Heart,
  Star,
  Globe,
  Camera,
  UtensilsCrossed,
  Landmark,
} from "lucide-react";
import { mockTours, mockGuides, cities } from "@/lib/mock-data";

export default async function HomePage() {
  const featuredTours = mockTours.slice(0, 3);
  const topGuides = mockGuides;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tours?limit=3&page=2`
  );
  const data = await res.json();

  console.log(data);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="text-sm px-4 py-1.5">
              Trusted by 50,000+ travelers worldwide
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
              Explore the World with Local Experts
            </h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Discover authentic experiences, hidden gems, and unforgettable
              adventures guided by passionate locals who know their cities best.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Where do you want to go?"
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Button size="lg" className="h-12 px-8" asChild>
                <Link href="/explore">Explore Tours</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cities */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular Destinations
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore cities with local guides
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => (
              <Link key={city.name} href={`/explore?city=${city.name}`}>
                <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={city.image || "/placeholder.svg"}
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold">{city.name}</h3>
                      <p className="text-sm text-white/90">{city.country}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Top-Rated Experiences
            </h2>
            <p className="text-muted-foreground text-lg">
              Handpicked tours loved by travelers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.data?.tours?.map((tour: any) => (
              <Link key={tour.id} href={`/tours/${tour._id}`}>
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={tour.images[0] || "/placeholder.svg"}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 right-4 bg-background/90 text-foreground border">
                      <Star className="h-3 w-3 fill-accent text-accent mr-1" />
                      {tour.rating}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {tour.city}, {tour.country}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {tour.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {tour.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={tour?.guideAvatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {tour?.guideName?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {tour?.guideName}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">${tour.price}</p>
                        <p className="text-xs text-muted-foreground">
                          per person
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/explore">View All Tours</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore by Interest
            </h2>
            <p className="text-muted-foreground text-lg">
              Find experiences that match your passion
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                name: "Food & Wine",
                icon: UtensilsCrossed,
                color: "bg-accent/10 text-accent",
              },
              {
                name: "History",
                icon: Landmark,
                color: "bg-primary/10 text-primary",
              },
              {
                name: "Photography",
                icon: Camera,
                color: "bg-secondary/20 text-secondary-foreground",
              },
              {
                name: "Culture",
                icon: Globe,
                color: "bg-muted text-muted-foreground",
              },
            ].map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.name}
                  href={`/explore?category=${category.name.toLowerCase()}`}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                      <div
                        className={`h-16 w-16 rounded-full ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="font-semibold">{category.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Guides */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Top Guides
            </h2>
            <p className="text-muted-foreground text-lg">
              Passionate locals ready to show you their world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topGuides.map((guide) => (
              <Link key={guide.id} href={`/profile/${guide.id}`}>
                <Card className="group hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all">
                      <AvatarImage
                        src={guide.profilePic || "/placeholder.svg"}
                      />
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
                        <Badge
                          key={exp}
                          variant="secondary"
                          className="text-xs"
                        >
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
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg">
              Start your journey in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Find Your Guide",
                description:
                  "Browse local experts based on your destination, interests, and budget",
              },
              {
                icon: Users,
                title: "Book & Connect",
                description:
                  "Request a booking and connect with your guide to plan the perfect experience",
              },
              {
                icon: Heart,
                title: "Explore & Enjoy",
                description:
                  "Meet your guide and discover authentic experiences you'll never forget",
              },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-6">
                    {index + 1}
                  </div>
                  <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose LocalGuide
            </h2>
            <p className="text-muted-foreground text-lg">
              The trusted platform for authentic travel experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: "Verified Guides",
                description:
                  "All guides are verified with reviews from real travelers",
              },
              {
                icon: Shield,
                title: "Secure Booking",
                description:
                  "Your payments are protected with our secure booking system",
              },
              {
                icon: Globe,
                title: "150+ Cities",
                description:
                  "Find local experts in destinations around the world",
              },
              {
                icon: Heart,
                title: "24/7 Support",
                description:
                  "Our team is here to help you every step of the way",
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="group hover:shadow-lg transition-all"
                >
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-balance">
              Ready to Become a Guide?
            </h2>
            <p className="text-xl text-primary-foreground/90 text-pretty">
              Share your passion, meet amazing people, and earn money showing
              travelers the real side of your city.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                variant="secondary"
                className="h-12 px-8"
                asChild
              >
                <Link href="/become-guide">Start Guiding</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/learn-more">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Travelers Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Real experiences from our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                location: "New York, USA",
                avatar: "/placeholder.svg?height=60&width=60",
                rating: 5,
                comment:
                  "The best travel experience I've ever had! Our guide showed us parts of the city we never would have discovered on our own.",
              },
              {
                name: "David Chen",
                location: "Singapore",
                avatar: "/placeholder.svg?height=60&width=60",
                rating: 5,
                comment:
                  "Incredible value and authentic experiences. I felt like I was exploring with a friend rather than a tour guide.",
              },
              {
                name: "Emma Williams",
                location: "London, UK",
                avatar: "/placeholder.svg?height=60&width=60",
                rating: 5,
                comment:
                  "This platform connects you with passionate locals who truly love their cities. Can't recommend it enough!",
              },
            ].map((testimonial) => (
              <Card key={testimonial.name}>
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.comment}"
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={testimonial.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
