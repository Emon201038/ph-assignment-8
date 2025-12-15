import React from "react";
import DashboardMobileSidebarContent from "./DashboardMobileNavContent";
import { INavSection } from "@/interfaces/dashboard.interface";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { IUser } from "@/interfaces/user.interface";
import { getNavItemsByRole } from "@/lib/navitems.config";

const DashboardMobileNav = ({ session }: { session: IUser }) => {
  const navItems: INavSection[] = getNavItemsByRole(session.role);
  const dashboardHome = getDefaultDashboardRoute(session?.role);
  return (
    <DashboardMobileSidebarContent
      userInfo={session}
      dashboardHome={dashboardHome}
      navItems={navItems}
    />
  );
};

export default DashboardMobileNav;
