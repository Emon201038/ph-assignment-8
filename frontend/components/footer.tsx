import Link from "next/link"
import { MapPin, Facebook, Twitter, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">LocalGuide</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connect with local experts for authentic travel experiences around the world.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/explore" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Find Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/explore?category=food"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Food & Wine
                </Link>
              </li>
              <li>
                <Link
                  href="/explore?category=culture"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Culture & History
                </Link>
              </li>
              <li>
                <Link
                  href="/explore?category=adventure"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Adventure
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Guides</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/become-guide"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Become a Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/guide-resources"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Safety
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LocalGuide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
