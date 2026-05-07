import TourForm from "@/components/module/tour/TourForm";
import UpdateTour from "@/components/module/tour/UpdateTour";
import { IResponse } from "@/interfaces";
import { ITour } from "@/interfaces/tour.interface";
import { serverFetch } from "@/lib/server-fetch";
import React from "react";

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ isSlug?: boolean }>;
}) => {
  const { slug } = await params;
  const { isSlug = true } = await searchParams;
  const res = await serverFetch.get(`/v2/tours/${slug}?isSlug=${isSlug}`);
  const data: IResponse<ITour> = await res.json();
  console.log(data);
  return <UpdateTour tour={data.data} />;
};

export default page;
