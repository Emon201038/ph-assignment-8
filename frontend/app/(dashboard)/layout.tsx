import DashboardSidebar from "@/components/module/dashboard/DashboardSidebar";
import { Navbar } from "@/components/shared/navbar";
import React from "react";

const CommonDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        <Navbar showLogo={false} isDashboard={true} />
        {children}
      </div>
    </div>
  );
};

export default CommonDashboardLayout;
