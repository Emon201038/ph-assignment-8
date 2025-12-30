"use client";
import ManagementTable from "@/components/shared/ManagementTable";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { guidesColumns } from "./GuideColumns";
import { IUser } from "@/interfaces/user.interface";
import { IGuide as Guide, IGuide } from "@/interfaces/guide.interface";

interface GuidesTableProps {
  guides: IUser<IGuide>[];
}

const GuidesTable = ({ guides }: GuidesTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingDoctor, setDeletingDoctor] = useState<IUser<IGuide> | null>(
    null
  );
  const [viewingDoctor, setViewingDoctor] = useState<IUser<IGuide> | null>(
    null
  );
  const [editingDoctor, setEditingDoctor] = useState<IUser<IGuide> | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (doctor: IUser<IGuide>) => {
    setViewingDoctor(doctor);
  };

  const handleEdit = (doctor: IUser<IGuide>) => {
    setEditingDoctor(doctor);
  };

  const handleDelete = (doctor: IUser<IGuide>) => {
    setDeletingDoctor(doctor);
  };

  const confirmDelete = async () => {
    if (!deletingDoctor) return;

    setIsDeleting(true);
    // const result = await softDeleteDoctor(deletingDoctor.id!);
    // setIsDeleting(false);

    // if (result.success) {
    //   toast.success(result.message || "Doctor deleted successfully");
    //   setDeletingDoctor(null);
    //   handleRefresh();
    // } else {
    //   toast.error(result.message || "Failed to delete doctor");
    // }
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
        emptyMessage="No doctors found"
      />
      {/* Edit Doctor Form Dialog */}
      {/* <DoctorFormDialog
        open={!!editingDoctor}
        onClose={() => setEditingDoctor(null)}
        doctor={editingDoctor!}
        specialities={specialities}
        onSuccess={() => {
          setEditingDoctor(null);
          handleRefresh();
        }}
      /> */}

      {/* View Doctor Detail Dialog */}
      {/* <DoctorViewDetailDialog
        open={!!viewingDoctor}
        onClose={() => setViewingDoctor(null)}
        doctor={viewingDoctor}
      /> */}

      {/* Delete Confirmation Dialog */}
      {/* <DeleteConfirmationDialog
        open={!!deletingDoctor}
        onOpenChange={(open) => !open && setDeletingDoctor(null)}
        onConfirm={confirmDelete}
        title="Delete Doctor"
        description={`Are you sure you want to delete ${deletingDoctor?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      /> */}
    </>
  );
};

export default GuidesTable;
