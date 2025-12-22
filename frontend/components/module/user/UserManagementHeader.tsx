"use client";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import CreateUserModal from "./UserCreateModal";

const UserManagementHeader = () => {
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
      <CreateUserModal
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="Tourist Management"
        description="Manage tourists information and details"
        actions={{
          label: "Add tourist",
          icon: Plus,
          onClick: () => setIsDialogOpen(true),
        }}
      />
    </>
  );
};

export default UserManagementHeader;
