import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin } from "lucide-react";
import { auth } from "@/lib/session";
import { logout } from "@/action";
import { UserRole } from "@/interfaces/user.interface";
import MobileNav from "./MobileNav";
import Image from "next/image";

export async function Navbar({
  showLogo = true,
  isDashboard = false,
}: {
  showLogo?: boolean;
  isDashboard?: boolean;
}) {
  const session = await auth();

  const NavLinks = () => {
    if (!session) {
      return (
        <>
          <Link
            href="/tours"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Explore Tours
          </Link>
          <Link
            href="/become-guide"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Become a Guide
          </Link>
        </>
      );
    }

    if (session?.role === "GUIDE") {
      return (
        <>
          <Link
            href="/tours"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Explore Tours
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
        </>
      );
    }

    if (session?.role === "ADMIN") {
      return (
        <>
          <Link
            href="/admin/dashboard"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Admin Dashboard
          </Link>
          <Link
            href="/admin/dashboard/tours-management"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Manage Listing
          </Link>
          <Link
            href="/admin/dashboard/tourists-management"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Manage Users
          </Link>
        </>
      );
    }

    return (
      <>
        <Link
          href="/tours"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Explore Tours
        </Link>
        <Link
          href="/my-bookings"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          My Bookings
        </Link>
      </>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center h-full max-w-60 w-full">
            {/* Mobile Menu */}
            <MobileNav session={session} isDashboard={isDashboard} />

            <Link
              href="/"
              className="flex items-center gap-2 w-[80%] h-[80%] relative"
            >
              <span className="text-xl font-bold sr-only">LocalGuide</span>
              <Image
                src={"/images/tourbuddy_cover.png"}
                alt="logo"
                fill
                className="w-[80%]"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLinks />
          </div>

          {/* Desktop Auth Buttons */}
          <div className="flex items-center gap-4">
            {!session ? (
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
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar>
                      <AvatarImage
                        src={session?.profileImage || "/placeholder.svg"}
                        alt={session?.name}
                      />
                      <AvatarFallback>
                        {session?.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{session?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {session?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/profile`}>Profile</Link>
                  </DropdownMenuItem>
                  {session?.role === UserRole.GUIDE && (
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-destructive"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
