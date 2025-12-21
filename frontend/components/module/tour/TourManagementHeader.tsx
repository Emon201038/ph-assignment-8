"use client";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import CreateTourModal from "./CreateTourModal";

const TourManagementHeader = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <>
      <CreateTourModal
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="Guide Management"
        description="Manage Tours information and details"
        actions={{
          label: "Add tour",
          icon: Plus,
          onClick: () => setIsDialogOpen(true),
        }}
      />
    </>
  );
};

export default TourManagementHeader;
