"use client";
import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import DashboardMobileNav from "../module/dashboard/DashboardMobileNav";
import Link from "next/link";
import { IUser } from "@/interfaces/user.interface";

const MobileNav = ({
  isDashboard,
  session,
}: {
  isDashboard: boolean;
  session: IUser | null;
}) => {
  const NavLinks = () => {
    if (!session) {
      return (
        <>
          <Link
            href="/explore"
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
            href="/explore"
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
            href="/admin/dashboard/tours"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Manage Listing
          </Link>
          <Link
            href="/admin/dashboard/users"
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
          href="/explore"
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

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSmallerScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkSmallerScreen();
    window.addEventListener("resize", checkSmallerScreen);

    return () => {
      window.addEventListener("resize", checkSmallerScreen);
    };
  }, []);

  return (
    <Sheet open={isMobile && open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="hover:bg-primary">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetTitle className="sr-only">Navigation</SheetTitle>
      <SheetContent side="left" className="md:hidden">
        {isDashboard ? (
          session && <DashboardMobileNav session={session} />
        ) : (
          <div className="flex flex-col gap-6 mt-8">
            <NavLinks />
            {!session ? (
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
                  <Link href={`/profile/${session?._id}`}>Profile</Link>
                </Button>
                <Button variant="destructive">Logout</Button>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
