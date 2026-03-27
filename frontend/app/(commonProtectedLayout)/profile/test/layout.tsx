import {
  Compass,
  LayoutDashboard,
  Settings,
  Users,
  BookOpen,
} from "lucide-react";
import CustomLink from "@/components/shared/CustomLink";
import React from "react";

const ProfileLayout = ({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) => {
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/profile/test" },
    { name: "Expeditions", icon: Compass, href: "#" },
    { name: "Journal", icon: BookOpen, href: "/profile/test/journals" },
    { name: "Settings", icon: Settings, href: "/profile/test/settings" },
    { name: "Community", icon: Users, href: "#" },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-surface relative pt-6">
      {/* SideNavBar (Shared Component) - Desktop Only */}

      {sidebar}
      <div className="mb-14 lg:mb-0">{children}</div>
      <nav className="fixed bottom-0 left-0 w-full shadow-2xl bg-background flex items-center justify-between lg:hidden z-40 border-t px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <div className="py-2" key={item.name}>
              <CustomLink
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-200/50 dark:hover:bg-slate-800 rounded-xl transition-all font-medium text-sm"
                matchStyle="bg-primary text-primary-foreground hover:bg-primary/90"
                matchType="startsWith"
              >
                <Icon size={20} />
              </CustomLink>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default ProfileLayout;
