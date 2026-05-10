"use client";
import ManagementTable from "@/components/shared/ManagementTable";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { IDestination } from "@/interfaces/destination.interface";
import { destinationColumns } from "./DestinationColumns";

interface DestinationsTableProps {
  destinations: IDestination[];
}

const DestinationsTable = ({ destinations }: DestinationsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingDestination, setDeletingDestination] =
    useState<IDestination | null>(null);
  const [viewingDestination, setViewingDestination] =
    useState<IDestination | null>(null);
  const [editingDestination, setEditingDestination] =
    useState<IDestination | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (destination: IDestination) => {
    setViewingDestination(destination);
  };

  const handleEdit = (destination: IDestination) => {
    router.push(
      `/admin/dashboard/destinations-management/update-destination/${destination.id}`,
    );
  };

  const handleDelete = (destination: IDestination) => {
    setDeletingDestination(destination);
  };

  const confirmDelete = async () => {
    if (!deletingDestination) return;

    setIsDeleting(true);
    // TODO: Implement deletion logic
    // const result = await deleteDestination(deletingDestination.id);
    // setIsDeleting(false);

    // if (result.success) {
    //   toast.success(result.message || "Destination deleted successfully");
    //   setDeletingDestination(null);
    //   handleRefresh();
    // } else {
    //   toast.error(result.message || "Failed to delete destination");
    // }
  };

  return (
    <>
      <ManagementTable
        columns={destinationColumns}
        data={destinations}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
};

export default DestinationsTable;
