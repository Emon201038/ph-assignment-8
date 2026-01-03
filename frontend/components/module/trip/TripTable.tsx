"use client";
import ManagementTable from "@/components/shared/ManagementTable";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ITrip } from "@/interfaces/trip.interface";
import TripFormDialog from "./TripFormDialog";
import { tripsColumns } from "./TripColumns";

interface ToursTableProps {
  trips: ITrip[];
}

const TripsTable = ({ trips }: ToursTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingTour, setDeletingTour] = useState<ITrip | null>(null);
  const [viewingTour, setViewingTour] = useState<ITrip | null>(null);
  const [editingTour, setEditingTour] = useState<ITrip | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (doctor: ITrip) => {
    setViewingTour(doctor);
  };

  const handleEdit = (doctor: ITrip) => {
    setEditingTour(doctor);
  };

  const handleDelete = (doctor: ITrip) => {
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
        data={trips}
        columns={tripsColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(trip) => trip._id!}
        emptyMessage="No trips found"
      />
      {/* Edit Doctor Form Dialog */}
      <TripFormDialog
        open={!!editingTour}
        onClose={() => setEditingTour(null)}
        trip={editingTour!}
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

export default TripsTable;
