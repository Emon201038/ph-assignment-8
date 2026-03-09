import Link from "next/link";
import {
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Medal,
  Share2,
  Camera,
} from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
        <div className="col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2 text-primary mb-6 w-full">
            <Link
              href="/"
              className="flex items-center gap-2 w-[50%] h-12 relative"
            >
              <span className="text-xl font-bold sr-only">LocalGuide</span>
              <Image
                src={"/images/tourbuddy_cover.png"}
                alt="logo"
                fill
                // className="w-[80%]"
              />
            </Link>
          </div>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
            Making the world accessible for everyone. Your ultimate travel
            companion for unforgettable adventures.
          </p>
          <div className="flex gap-4">
            <Link
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white transition-colors"
              href="#"
            >
              <Medal size={24} />
            </Link>
            <Link
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white transition-colors"
              href="#"
            >
              <Share2 size={24} />
            </Link>
            <Link
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white transition-colors"
              href="#"
            >
              <Camera size={24} />
            </Link>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-6">Explore</h4>
          <ul className="flex flex-col gap-4 text-slate-500 dark:text-slate-400 text-sm">
            <li>
              <Link className="hover:text-primary" href="#">
                Destinations
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="#">
                Tours
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="#">
                Activities
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="#">
                Deals
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Support</h4>
          <ul className="flex flex-col gap-4 text-slate-500 dark:text-slate-400 text-sm">
            <li>
              <Link className="hover:text-primary" href="#">
                Help Center
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="#">
                Contact Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="#">
                Safety
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="#">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Company</h4>
          <ul className="flex flex-col gap-4 text-slate-500 dark:text-slate-400 text-sm">
            <li>
              <Link className="hover:text-primary" href="#">
                About Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="#">
                Careers
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="#">
                Blog
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="#">
                Affiliate
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs">
        <p>© {new Date().getFullYear()} TourBuddy Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <Link className="hover:text-primary" href="#">
            Privacy Policy
          </Link>
          <Link className="hover:text-primary" href="#">
            Cookie Settings
          </Link>
        </div>
      </div>
    </footer>
  );
}
