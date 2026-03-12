"use client";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const DestinationFilterClearBtn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("lat", position.coords.latitude.toFixed(2).toString());
      params.set("lng", position.coords.longitude.toFixed(2).toString());
      router.push(`?${params.toString()}`);
    });
  }, []);

  if (!searchParams.get("searchTerm") && !searchParams.get("date")) return null;

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("searchTerm");
    params.delete("date");
    router.push(`?${params.toString()}`);
  };
  return (
    <Button variant="outline" size="sm" onClick={handleClear}>
      Clear
      <X />
    </Button>
  );
};

export default DestinationFilterClearBtn;
