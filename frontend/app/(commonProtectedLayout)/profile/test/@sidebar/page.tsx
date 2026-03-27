import CustomLink from "@/components/shared/CustomLink";
import { auth } from "@/lib/session";
import {
  BookOpen,
  Compass,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await auth();
  if (!user?.id) {
    redirect("/login?redirect=/profile/test");
  }

  const bottomNavItems = [
    { name: "Support", icon: HelpCircle, href: "#" },
    { name: "Logout", icon: LogOut, href: "#", isError: true },
  ];
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/profile/test" },
    { name: "Expeditions", icon: Compass, href: "#" },
    { name: "Journal", icon: BookOpen, href: "/profile/test/journals" },
    { name: "Settings", icon: Settings, href: "/profile/test/settings" },
    { name: "Community", icon: Users, href: "#" },
  ];

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 pt-24 p-6 z-40 border-r bg-background">
      <div className="flex gap-3 mb-4 items-center">
        <div className="w-12 h-12 rounded-xl mb-2 overflow-hidden border">
          <Image
            alt={user.name}
            src={user.avatar || "/images/default-avatar.png"}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-on-surface">{user.name}</h3>
          {/* <p className="text-xs font-medium tracking-tight text-blue-700">
                Elite Wayfarer
              </p> */}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2 grow">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <CustomLink
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm "text-slate-500 hover:bg-slate-200/50
              `}
              matchStyle="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Icon size={20} />
              {item.name}
            </CustomLink>
          );
        })}
      </nav>

      {/* Bottom Navigation Items */}
      <div className="mt-auto flex flex-col gap-2 border-t border-slate-200/50 pt-6">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all text-sm ${
                item.isError
                  ? "text-error hover:bg-error-container/20"
                  : "text-slate-500 hover:bg-slate-200/50"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default page;
