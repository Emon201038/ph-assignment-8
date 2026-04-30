import HeroSection from "@/components/module/destination/HeroSection";
import { IResponse } from "@/interfaces";
import { IDestination } from "@/interfaces/destination.interface";
import { serverFetch } from "@/lib/server-fetch";
import React from "react";

const HeroSectionPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await serverFetch.get("/v2/destinations/" + id);
  const data: IResponse<IDestination> = await res.json();
  return <HeroSection destination={data.data} />;
};

export default HeroSectionPage;
