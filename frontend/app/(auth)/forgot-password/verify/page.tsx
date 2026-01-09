import OtpForm from "@/components/module/auth/OtpForm";
import { notFound } from "next/navigation";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  if (!searchParamsObj.session_id) return notFound();
  if (!/^[0-9a-f]{24}$/.test(searchParamsObj.session_id as string)) {
    return notFound();
  }

  return (
    <OtpForm
      id={searchParamsObj.session_id as string}
      email={searchParamsObj.email as string}
    />
  );
};

export default page;
