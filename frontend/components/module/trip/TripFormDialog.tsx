"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ITrip } from "@/interfaces/trip.interface";
import TripForm from "./TripForm";
import { useEffect, useState } from "react";

interface TripFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  trip?: ITrip;
}

const TripFormDialog = ({
  open,
  onClose,
  onSuccess,
  trip,
}: TripFormDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false);

  useEffect(() => {
    if (open) {
      // Delay opening to prevent immediate closure
      const timer = setTimeout(() => {
        setInternalOpen(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setInternalOpen(false);
    }
  }, [open]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setInternalOpen(false);
      onClose();
    }
  };

  return (
    <Dialog open={internalOpen} onOpenChange={handleOpenChange} modal={false}>
      <DialogContent
        className="max-h-[90vh] overflow-auto"
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogTitle>{trip ? "Edit Trip" : "Create Trip"}</DialogTitle>
        <TripForm onSuccess={onSuccess} onClose={onClose} trip={trip} />
      </DialogContent>
    </Dialog>
  );
};

export default TripFormDialog;
