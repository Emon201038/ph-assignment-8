"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ITrip } from "@/interfaces/trip.interface";
import React from "react";
import TripForm from "./TripForm";

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
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogTitle>{trip ? "Edit Trip" : "Create Trip"}</DialogTitle>
        <TripForm onSuccess={onSuccess} onClose={onClose} trip={trip} />
      </DialogContent>
    </Dialog>
  );
};

export default TripFormDialog;
