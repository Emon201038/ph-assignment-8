import DashboardSidebar from "@/components/module/dashboard/DashboardSidebar";
import { Footer } from "@/components/module/shared/footer";
import { Navbar } from "@/components/module/shared/navbar";
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
