import { Award, Globe, Heart, Search, Shield, Users } from "lucide-react";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PublicPage = () => {
  return (
    <>
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
      <section className="py-20 bg-linear-to-br from-primary to-primary/80 text-primary-foreground">
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
    </>
  );
};

export default PublicPage;
