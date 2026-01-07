import React from "react";
import NavigationTabs from "@/components/module/profile/NavigationTabs";
import { getUserById } from "@/action/user";
import { IGuide } from "@/interfaces/guide.interface";
import { ITourist, IUser, UserRole } from "@/interfaces/user.interface";
import GuideProfile from "@/components/module/profile/GuideProfile";
import TouristProfile from "@/components/module/profile/TouristProfile";
import AdminProfile from "@/components/module/profile/AdminProfile";

const ProfileLayout = async ({
  params,
  children,
}: {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}) => {
  const { id } = await params;
  const user = await getUserById(id);
  return (
    <div className="min-h-screen bg-linear-to-b from-background via-primary/5 to-background">
      {/* Cover Section */}
      <div className="relative h-64 bg-linear-to-r from-primary/20 via-chart-2/20 to-chart-3/20">
        <img
          src="/images/barcelona.jpeg"
          alt="Barcelona"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        {user.data.profile.role === UserRole.GUIDE ? (
          <GuideProfile profile={user.data as IGuide<IUser>} />
        ) : user.data.profile.role === UserRole.TOURIST ? (
          <TouristProfile profile={user.data as ITourist<IUser>} />
        ) : (
          <AdminProfile />
        )}

        <NavigationTabs />

        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
