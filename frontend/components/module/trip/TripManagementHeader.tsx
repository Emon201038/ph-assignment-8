"use client";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import TripFormDialog from "./TripFormDialog";

const TripManagementHeader = () => {
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
      <TripFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="Trip Management"
        description="Manage trips information and details"
        actions={{
          label: "Add Trip",
          icon: Plus,
          onClick: () => setIsDialogOpen(true),
        }}
      />
    </>
  );
};

export default TripManagementHeader;
