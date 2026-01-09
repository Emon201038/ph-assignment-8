import ChangePassword from "@/components/module/auth/ChangePassword";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const token = searchParamsObj.token as string;
  if (!token) return notFound();
  if (!/(^[\w-]*\.[\w-]*\.[\w-]*$)/.test(token)) return notFound();
  return (
    <div>
      <ChangePassword isForgotten={true} token={token} />
    </div>
  );
};

export default page;
