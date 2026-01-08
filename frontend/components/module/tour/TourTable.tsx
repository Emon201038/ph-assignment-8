"use client";
import ManagementTable from "@/components/shared/ManagementTable";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toursColumns } from "./TourColumns";
import { ITour } from "@/interfaces/tour.interface";
import TourDialog from "./TourDialog";

interface ToursTableProps {
  tours: ITour[];
}

const ToursTable = ({ tours }: ToursTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingTour, setDeletingTour] = useState<ITour | null>(null);
  const [viewingTour, setViewingTour] = useState<ITour | null>(null);
  const [editingTour, setEditingTour] = useState<ITour | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (doctor: ITour) => {
    setViewingTour(doctor);
  };

  const handleEdit = (doctor: ITour) => {
    setEditingTour(doctor);
  };

  const handleDelete = (doctor: ITour) => {
    setDeletingTour(doctor);
  };

  const confirmDelete = async () => {
    if (!deletingTour) return;

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
        data={tours}
        columns={toursColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(guide) => guide._id!}
        emptyMessage="No tours found"
      />
      {/* Edit Doctor Form Dialog */}
      <TourDialog
        open={!!editingTour}
        onClose={() => setEditingTour(null)}
        tour={editingTour!}
        onSuccess={() => {
          setEditingTour(null);
          handleRefresh();
        }}
      />

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

export default ToursTable;
