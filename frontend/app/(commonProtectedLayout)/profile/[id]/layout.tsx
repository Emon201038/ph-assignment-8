import GuideLayout from "@/components/module/profile/GuideLayout";
import TravelerLayout from "@/components/module/profile/TravelerLayout";
import { UserRole } from "@/interfaces/user.interface";
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
  const session = await auth();
  const { id } = await params;
  console.log(id, "id");

  if (!session) {
    redirect("/login?callback=/my-profile");
  }

  if (session.role === UserRole.TOURIST) {
    return <TravelerLayout user={session}>{children}</TravelerLayout>;
  }
  if (session.role === UserRole.GUIDE) {
    return <GuideLayout user={session}>{children}</GuideLayout>;
  }
  return <div>layout</div>;
};

export default layout;
