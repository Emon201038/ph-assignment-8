"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ITour } from "@/interfaces/tour.interface";
import TourForm from "./TourForm";

interface TourDialogProps {
  open: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  tour?: ITour;
}

const TourDialog = ({ tour, open, onClose, onSuccess }: TourDialogProps) => {
  const isEdit = !!tour;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogTitle>{isEdit ? "Edit Tour" : "Create Tour"}</DialogTitle>
        <DialogDescription>
          Add a new tour experience to the platform
        </DialogDescription>
        <TourForm mode="create" />
      </DialogContent>
    </Dialog>
  );
};

export default TourDialog;
