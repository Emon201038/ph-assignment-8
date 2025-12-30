"use client";
import ManagementTable from "@/components/shared/ManagementTable";
import { ITourist, IUser } from "@/interfaces/user.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { touristsColumns } from "./TouristColumns";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationModal";
import TouristFormDialog from "./TouristCreateModal";
import { deleteTourist } from "@/services/tourist/tourist.service";

interface GuidesTableProps {
  tourists: IUser<ITourist>[];
}

const TouristsTable = ({ tourists }: GuidesTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingTourist, setDeletingTourist] =
    useState<IUser<ITourist> | null>(null);
  const [viewingTourist, setViewingTourist] = useState<IUser<ITourist> | null>(
    null
  );
  const [editingTourist, setEditingTourist] = useState<IUser<ITourist> | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (tourist: IUser<ITourist>) => {
    setViewingTourist(tourist);
  };

  const handleEdit = (tourist: IUser<ITourist>) => {
    setEditingTourist(tourist);
  };

  const handleDelete = (tourist: IUser<ITourist>) => {
    setDeletingTourist(tourist);
  };

  const confirmDelete = async () => {
    if (!deletingTourist) return;

    setIsDeleting(true);
    const result = await deleteTourist(deletingTourist._id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Tourist deleted successfully");
      setDeletingTourist(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete tourist");
    }
  };

  return (
    <>
      <ManagementTable
        data={tourists}
        columns={touristsColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(guide) => guide._id!}
        emptyMessage="No tourists found"
      />

      {/* Edit Tourist Form Dialog */}
      <TouristFormDialog
        open={!!editingTourist}
        onClose={() => setEditingTourist(null)}
        tourist={editingTourist || undefined}
        onSuccess={() => {
          setEditingTourist(null);
          handleRefresh();
        }}
      />

      {/* View Tourist Detail Dialog */}
      {/* <TouristViewDetailDialog
        open={!!viewingTourist}
        onClose={() => setViewingTourist(null)}
        tourist={viewingTourist}
      /> */}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingTourist}
        onOpenChange={(open) => !open && setDeletingTourist(null)}
        onConfirm={confirmDelete}
        title="Delete Doctor"
        description={`Are you sure you want to delete ${deletingTourist?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default TouristsTable;
