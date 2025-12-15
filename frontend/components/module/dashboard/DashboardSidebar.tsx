import { auth } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { INavSection } from "@/interfaces/dashboard.interface";
import { getNavItemsByRole } from "@/lib/navitems.config";

const DashboardSidebar = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const navItems: INavSection[] = getNavItemsByRole(session.role);
  const dashboardHome = getDefaultDashboardRoute(session.role);
  return (
    <DashboardSidebarContent
      userInfo={session}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;
