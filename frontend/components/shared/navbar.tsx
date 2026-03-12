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
import { MapPin, Search } from "lucide-react";
import { auth } from "@/lib/session";
import { logout } from "@/action";
import { UserRole } from "@/interfaces/user.interface";
import MobileNav from "./MobileNav";
import Image from "next/image";
import { Input } from "../ui/input";

export async function Navbar({
  showLogo = true,
  isDashboard = false,
}: {
  showLogo?: boolean;
  isDashboard?: boolean;
}) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 md:px-20 py-4 bg-white dark:bg-slate-900 backdrop-blur-2xl ">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 text-primary w-50 h-12">
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
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            className="text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-primary transition-colors"
            href="/destinations"
          >
            Destinations
          </Link>
          <Link
            className="text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-primary transition-colors"
            href="/tours"
          >
            Tours
          </Link>
          <Link
            className="text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-primary transition-colors"
            href="/guides"
          >
            Guides
          </Link>
          <Link
            className="text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-primary transition-colors"
            href="/why-us"
          >
            Why Us
          </Link>
        </nav>
      </div>
      <div className="flex flex-1 justify-end gap-4 items-center">
        <label className="hidden md:flex flex-col min-w-40 h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="text-slate-400 flex bg-slate-50 dark:bg-slate-800 items-center justify-center pl-3">
              <Search className="w-4 h-4" />
            </div>
            <Input
              className="form-input flex w-full min-w-0 flex-1 border-none bg-slate-50 dark:bg-slate-800 focus-visible:ring-0 focus-visible:outline-none text-sm placeholder:text-slate-400 shadow-none"
              placeholder="Search experiences..."
              value=""
            />
          </div>
        </label>
        <div className="flex gap-2">
          <Button className="hidden sm:flex min-w-21 cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-tight hover:opacity-90 transition-opacity">
            Sign Up
          </Button>
          <Button className="flex min-w-21 cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold tracking-tight hover:bg-slate-200 transition-colors">
            Log In
          </Button>
        </div>
      </div>
    </header>
  );
}
