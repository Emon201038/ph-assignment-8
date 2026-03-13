"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  href: string;
  matchType?: "exact" | "last" | "startsWith" | "endsWith";
  matchStyle?: string;
  className?: string;
  children: React.ReactNode;
};

const CustomLink = ({
  href,
  matchType = "exact",
  matchStyle,
  className,
  children,
}: Props) => {
  const pathname = usePathname();

  const isRouteMatches = (pathname: string, href: string): boolean => {
    if (matchType === "exact") {
      return pathname === href;
    }
    if (matchType === "last") {
      return pathname.endsWith(href);
    }
    if (matchType === "startsWith") {
      return pathname.startsWith(href);
    }
    if (matchType === "endsWith") {
      return pathname.endsWith(href);
    }
    return false;
  };
  return (
    <Link
      href={href}
      className={cn(
        isRouteMatches(pathname, href)
          ? matchStyle ||
              "text-primary font-semibold underline underline-offset-6"
          : "",
        className,
      )}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
