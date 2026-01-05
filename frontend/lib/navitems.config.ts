import { INavItem, INavSection } from "@/interfaces/dashboard.interface";
import { getDefaultDashboardRoute } from "./auth-utils";
import { UserRole } from "@/interfaces/user.interface";

export const getCommonNavitems = (role: UserRole) => {
  const defaultDashboardRoute = getDefaultDashboardRoute(role);
  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboardRoute,
          icon: "LayoutDashboard",
          roles: Object.values(UserRole),
        },
        {
          title: "My Profile",
          href: "/my-profile",
          icon: "User",
          roles: Object.values(UserRole),
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "/my-profile/change-password",
          icon: "Settings",
          roles: Object.values(UserRole),
        },
      ],
    },
  ];
};

export const touristNavItems: INavSection[] = [
  {
    title: "Tours",
    items: [
      {
        title: "My tours",
        href: "/dashboard/my-tours",
        icon: "Calender",
        roles: [UserRole.TOURIST],
      },
      {
        title: "Book Tour",
        href: "/explore",
        icon: "Clipboard",
        roles: [UserRole.TOURIST],
      },
    ],
  },
  {
    title: "Activities",
    items: [
      {
        title: "Scheduled Tours",
        href: "/dashboard/scheduled-tours",
        icon: "Clock",
        roles: [UserRole.TOURIST],
      },
      {
        title: "Completed Tours",
        href: "/dashboard/completed-tours",
        icon: "CheckCircle",
        roles: [UserRole.TOURIST],
      },
    ],
  },
];

export const guideNavItems: INavSection[] = [
  {
    title: "Tour Management",
    items: [
      {
        title: "Tours",
        href: "/guide/dashboard/my-tours",
        icon: "Calender",
        badge: "5",
        roles: [UserRole.GUIDE],
      },
      {
        title: "Schedules",
        href: "/guide/dashboard/my-schedules",
        icon: "Clock",
        roles: [UserRole.GUIDE],
      },
    ],
  },
];

export const adminNavItems: INavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Admins",
        href: "/admin/dashboard/admins-management",
        icon: "Sheild",
        roles: [UserRole.ADMIN],
      },
      {
        title: "Tourists",
        href: "/admin/dashboard/tourists-management",
        icon: "User",
        roles: [UserRole.ADMIN],
      },
      {
        title: "Guides",
        href: "/admin/dashboard/guides-management",
        icon: "Heart",
        roles: [UserRole.ADMIN],
      },
    ],
  },
  {
    title: "Tour Management",
    items: [
      {
        title: "Tours",
        href: "/admin/dashboard/tours-management",
        icon: "Clipboard",
        roles: [UserRole.ADMIN],
      },
      {
        title: "Schedules",
        href: "/admin/dashboard/schedules-management",
        icon: "Clock",
        roles: [UserRole.ADMIN],
      },
    ],
  },
  {
    title: "Trip Management",
    items: [
      {
        title: "Trips",
        href: "/admin/dashboard/trips-management",
        icon: "Clipboard",
        roles: [UserRole.ADMIN],
      },
    ],
  },
  {
    title: "Others",
    items: [
      {
        title: "Top Cities",
        href: "/admin/dashboard/cities-management",
        icon: "MapPin",
        roles: [UserRole.ADMIN],
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole) => {
  const commonNavItems = getCommonNavitems(role);

  switch (role) {
    case UserRole.ADMIN:
      return [...commonNavItems, ...adminNavItems];

    case UserRole.GUIDE:
      return [...commonNavItems, ...guideNavItems];

    case UserRole.TOURIST:
      return [...commonNavItems, ...touristNavItems];
    default:
      return [];
  }
};
