"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import SignupForm from "../auth/SignupForm";
import { ITourist, IUser } from "@/interfaces/user.interface";
import { useEffect } from "react";

interface TouristFormDialogProps {
  open: boolean;
  onClose: (e: boolean) => void;
  onSuccess: () => void;
  tourist?: IUser & { profile: ITourist };
}

const TouristFormDialog = ({
  tourist,
  open,
  onClose,
  onSuccess,
}: TouristFormDialogProps) => {
  const isEdit = !!tourist;

  useEffect(() => {
    if (!open) {
      // Use a small timeout to ensure Dialog's internal cleanup completes first
      const timer = setTimeout(() => {
        document.body.style.pointerEvents = "";
        document.body.style.overflow = "";
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogTitle>{isEdit ? "Edit User" : "Create User"}</DialogTitle>
        <SignupForm
          onSuccess={onSuccess}
          onClose={onClose}
          isSignUp={!!isEdit}
          tourist={tourist}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TouristFormDialog;
