import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MessageCircle, Book, CreditCard, Shield, HelpCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HelpPage() {
  const categories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of using LocalGuide",
      articles: 5,
    },
    {
      icon: CreditCard,
      title: "Payments & Pricing",
      description: "Understand booking fees and payments",
      articles: 8,
    },
    {
      icon: Shield,
      title: "Safety & Security",
      description: "Stay safe while traveling",
      articles: 6,
    },
    {
      icon: MessageCircle,
      title: "Communication",
      description: "How to contact guides and support",
      articles: 4,
    },
  ]

  const faqs = [
    {
      question: "How do I book a tour?",
      answer:
        "Browse tours, select your preferred date, and send a booking request to the guide. Once confirmed, you'll receive booking details via email.",
    },
    {
      question: "What is the cancellation policy?",
      answer:
        "Free cancellation up to 24 hours before the tour start time. Cancellations within 24 hours may incur a fee.",
    },
    {
      question: "How do payments work?",
      answer:
        "Payment is processed when the guide confirms your booking. We use secure payment processing and your money is protected.",
    },
    {
      question: "Can I become a guide?",
      answer:
        "Yes! Sign up as a guide, complete verification, and start creating tour listings to share your local expertise.",
    },
    {
      question: "What if I have issues with my guide?",
      answer:
        "Contact our support team immediately. We take safety and quality seriously and will resolve any issues promptly.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">How can we help you?</h1>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search for help..." className="pl-12 h-14 text-base" />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Card key={category.title} className="group hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold mb-1">{category.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                    <p className="text-sm text-primary font-medium">{category.articles} articles</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Support */}
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Still need help?</CardTitle>
                <CardDescription>Our support team is here for you 24/7</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button className="flex-1" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Live Chat
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
