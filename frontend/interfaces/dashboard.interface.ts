import { UserRole } from "./user.interface";

export interface INavItem {
  title: string;
  href: string;
  icon: string;
  badge?: string | number;
  description?: string;
  roles: UserRole[];
}

export interface INavSection {
  title?: string;
  items: INavItem[];
}
