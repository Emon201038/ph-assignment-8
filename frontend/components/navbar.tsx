"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()

  const NavLinks = () => {
    if (!isAuthenticated) {
      return (
        <>
          <Link href="/explore" className="text-sm font-medium hover:text-primary transition-colors">
            Explore Tours
          </Link>
          <Link href="/become-guide" className="text-sm font-medium hover:text-primary transition-colors">
            Become a Guide
          </Link>
        </>
      )
    }

    if (user?.role === "guide") {
      return (
        <>
          <Link href="/explore" className="text-sm font-medium hover:text-primary transition-colors">
            Explore Tours
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </Link>
        </>
      )
    }

    if (user?.role === "admin") {
      return (
        <>
          <Link href="/admin" className="text-sm font-medium hover:text-primary transition-colors">
            Admin Dashboard
          </Link>
        </>
      )
    }

    return (
      <>
        <Link href="/explore" className="text-sm font-medium hover:text-primary transition-colors">
          Explore Tours
        </Link>
        <Link href="/my-bookings" className="text-sm font-medium hover:text-primary transition-colors">
          My Bookings
        </Link>
      </>
    )
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">LocalGuide</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLinks />
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={user.profilePic || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/profile/${user.id}`}>Profile</Link>
                  </DropdownMenuItem>
                  {user.role === "guide" && (
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-8">
                <NavLinks />
                {!isAuthenticated ? (
                  <div className="flex flex-col gap-3 mt-4">
                    <Button variant="outline" asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/register">Sign Up</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 mt-4">
                    <Button variant="outline" asChild>
                      <Link href={`/profile/${user.id}`}>Profile</Link>
                    </Button>
                    <Button variant="destructive" onClick={logout}>
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
