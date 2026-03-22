import GuideLayout from "@/components/module/profile/GuideLayout";
import TravelerLayout from "@/components/module/profile/TravelerLayout";
import { IGuide } from "@/interfaces/guide.interface";
import { ITourist, IUser, UserRole } from "@/interfaces/user.interface";
import { auth } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) => {
  const session = await auth<IUser<IGuide | ITourist>>();
  const { id } = await params;

  if (!session) {
    redirect("/login?callback=/my-profile");
  }

  if (session.role === UserRole.TOURIST) {
    return (
      <TravelerLayout
        user={session as unknown as IUser<ITourist>}
        pathname={`/profile/${id}`}
      >
        {children}
      </TravelerLayout>
    );
  }
  if (session.role === UserRole.GUIDE) {
    return (
      <GuideLayout
        user={session as unknown as IUser<IGuide>}
        pathname={`/profile/${id}`}
      >
        {children}
      </GuideLayout>
    );
  }
  return <div>layout</div>;
};

export default layout;
