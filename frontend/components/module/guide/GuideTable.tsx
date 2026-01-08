"use client";
import ManagementTable from "@/components/shared/ManagementTable";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { guidesColumns } from "./GuideColumns";
import { IUser } from "@/interfaces/user.interface";
import { IGuide as Guide, IGuide } from "@/interfaces/guide.interface";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationModal";
import GuideModal from "./GuideModal";
import { deleteGuide } from "@/services/guide/guide.service";
import GuideViewDetailsDialog from "./GuideViewDetailsDialog";

interface GuidesTableProps {
  guides: IUser<IGuide>[];
}

const GuidesTable = ({ guides }: GuidesTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingGuide, setDeletingGuide] = useState<IUser<IGuide> | null>(
    null
  );
  const [viewingGuide, setViewingGuide] = useState<IUser<IGuide> | null>(null);
  const [editingGuide, setEditingGuide] = useState<IUser<IGuide> | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (guide: IUser<IGuide>) => {
    setViewingGuide(guide);
  };

  const handleEdit = (guide: IUser<IGuide>) => {
    setEditingGuide(guide);
  };

  const handleDelete = (guide: IUser<IGuide>) => {
    setDeletingGuide(guide);
  };

  const confirmDelete = async () => {
    if (!deletingGuide) return;

    setIsDeleting(true);
    const result = await deleteGuide(deletingGuide._id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Doctor deleted successfully");
      setDeletingGuide(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete doctor");
    }
  };

  return (
    <>
      <ManagementTable
        data={guides}
        columns={guidesColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(guide) => guide._id!}
        emptyMessage="No guides found"
      />
      {/* Edit Doctor Form Dialog */}
      <GuideModal
        open={!!editingGuide}
        onClose={() => setEditingGuide(null)}
        guide={editingGuide!}
        onSuccess={() => {
          setEditingGuide(null);
          handleRefresh();
        }}
      />

      {/* View Doctor Detail Dialog */}
      <GuideViewDetailsDialog
        open={!!viewingGuide}
        onOpenChange={() => setViewingGuide(null)}
        guide={viewingGuide!}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingGuide}
        onOpenChange={(open) => !open && setDeletingGuide(null)}
        onConfirm={confirmDelete}
        title="Delete Guide"
        description={`Are you sure you want to delete ${deletingGuide?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default GuidesTable;
