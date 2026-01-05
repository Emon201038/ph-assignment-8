"use client";
import ManagementTable from "@/components/shared/ManagementTable";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ITrip } from "@/interfaces/trip.interface";
import TripFormDialog from "./TripFormDialog";
import { tripsColumns } from "./TripColumns";

interface TripsTableProps {
  trips: ITrip[];
}

const TripsTable = ({ trips }: TripsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingTrip, setDeletingTrip] = useState<ITrip | null>(null);
  const [viewingTrip, setViewingTrip] = useState<ITrip | null>(null);
  const [editingTrip, setEditingTrip] = useState<ITrip | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (trip: ITrip) => {
    setViewingTrip(trip);
  };

  const handleEdit = (trip: ITrip) => {
    setTimeout(() => {
      setEditingTrip(trip);
    }, 0);
  };

  const handleDelete = (trip: ITrip) => {
    setDeletingTrip(trip);
  };

  const confirmDelete = async () => {
    if (!deletingTrip) return;

    setIsDeleting(true);
    // const result = await softDeleteDoctor(deletingDoctor.id!);
    // setIsDeleting(false);

    // if (result.success) {
    //   toast.success(result.message || "Doctor deleted successfully");
    //   setDeletingDoctor(null);
    //   handleRefresh();
    // } else {
    //   toast.error(result.message || "Failed to delete trip");
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
        open={!!editingTrip}
        onClose={() => setEditingTrip(null)}
        trip={editingTrip!}
        onSuccess={() => {
          setEditingTrip(null);
          handleRefresh();
        }}
      />

      {/* View Doctor Detail Dialog */}
      {/* <DoctorViewDetailDialog
        open={!!viewingDoctor}
        onClose={() => setViewingDoctor(null)}
        trip={viewingDoctor}
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
