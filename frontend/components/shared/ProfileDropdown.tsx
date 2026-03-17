import { IUser } from "@/interfaces/user.interface";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Dropdown } from "react-day-picker";
import Image from "next/image";
import Link from "next/link";

const ProfileDropdown = ({ session }: { session: IUser<null> }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src={session.avatar || "/images/default_avatar.png"}
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/my-profile" className="w-full">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="w-full">
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="w-full">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
