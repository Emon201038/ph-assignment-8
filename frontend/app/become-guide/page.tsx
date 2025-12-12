import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, DollarSign, Users, Calendar, Globe, TrendingUp, Award } from "lucide-react"

export default function BecomeGuidePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge
              variant="secondary"
              className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
            >
              Join 10,000+ guides worldwide
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
              Turn Your Passion Into Income
            </h1>
            <p className="text-xl text-primary-foreground/90 text-pretty">
              Share your city's hidden gems, meet amazing travelers, and earn money doing what you love. Become a
              LocalGuide today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="secondary" className="h-12 px-8" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Become a Guide?</h2>
            <p className="text-muted-foreground text-lg">Join a community of passionate locals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: DollarSign,
                title: "Earn Money",
                description: "Set your own rates and keep 85% of what you earn. Top guides make $3,000+ per month.",
              },
              {
                icon: Calendar,
                title: "Flexible Schedule",
                description: "Work when you want. Accept bookings that fit your schedule and availability.",
              },
              {
                icon: Users,
                title: "Meet People",
                description: "Connect with travelers from around the world and share your passion for your city.",
              },
              {
                icon: Globe,
                title: "Global Platform",
                description: "Reach travelers worldwide through our platform with millions of visitors.",
              },
              {
                icon: TrendingUp,
                title: "Grow Your Business",
                description: "Build your reputation with reviews and grow your tour business over time.",
              },
              {
                icon: Award,
                title: "Support & Training",
                description: "Get access to resources, training, and support to help you succeed.",
              },
            ].map((benefit) => {
              const Icon = benefit.icon
              return (
                <Card key={benefit.title} className="group hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Start guiding in four simple steps</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "1",
                title: "Sign Up",
                description: "Create your guide profile and tell us about your expertise and interests.",
              },
              {
                step: "2",
                title: "Create Your Tours",
                description: "Design unique experiences showcasing your favorite spots and hidden gems.",
              },
              {
                step: "3",
                title: "Get Booked",
                description: "Travelers discover your tours and send booking requests that you can accept.",
              },
              {
                step: "4",
                title: "Guide & Earn",
                description: "Meet travelers, share your passion, and get paid for amazing experiences.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What You Need</h2>
              <p className="text-muted-foreground text-lg">Simple requirements to get started</p>
            </div>

            <Card>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {[
                    "Be passionate about your city and love sharing it with others",
                    "Speak at least one language fluently (English recommended)",
                    "Be available for tours at least a few times per month",
                    "Have knowledge of local history, culture, or specialties",
                    "Be friendly, professional, and reliable",
                    "Pass our verification process (ID check and background review)",
                  ].map((requirement) => (
                    <div key={requirement} className="flex gap-3 items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-muted-foreground">{requirement}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-balance">Ready to Start Your Journey?</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Join thousands of guides who are sharing their passion and earning money on LocalGuide.
            </p>
            <Button size="lg" className="h-12 px-8" asChild>
              <Link href="/register">Become a Guide Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
