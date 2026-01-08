"use client";
import { UserRole } from "@/interfaces/user.interface";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const allowedRoutes = ["schedules", "bookings", "reviews", "earnings"];

const NavigationTabs = ({ role }: { role: UserRole }) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const basePath =
    segments.length >= 2
      ? allowedRoutes.includes(segments[1])
        ? "/profile"
        : `/profile/${segments[1]}`
      : "/profile";

  const routes = [
    {
      id: 1,
      name: "Tours",
      href: basePath,
      current: pathname === basePath,
    },

    {
      id: 6,
      name: "Connections",
      href: `${basePath}/connections`,
      current: pathname === `${basePath}/connections`,
    },
  ];

  if (basePath === "/profile") {
    routes.push(
      {
        id: 5,
        name: "Earnings",
        href: `${basePath}/earnings`,
        current: pathname === `${basePath}/earnings`,
      },
      {
        id: 3,
        name: "Bookings",
        href: `${basePath}/bookings`,
        current: pathname === `${basePath}/bookings`,
      }
    );
  }

  if (role === UserRole.GUIDE) {
    routes.push({
      id: 4,
      name: "Reviews",
      href: `${basePath}/reviews`,
      current: pathname === `${basePath}/reviews`,
    });
  }

  return (
    <nav className="flex items-center gap-2 bg-card rounded-md mb-4 border border-primary/20 p-1.5">
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.id}
          className={`p-2 rounded-md ${
            route.current ? "bg-primary text-white" : ""
          }`}
        >
          {route.name}
        </Link>
      ))}
    </nav>
  );
};

export default NavigationTabs;
