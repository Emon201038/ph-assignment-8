"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import GuideForm from "./GuideForm";
import { IGuide } from "@/interfaces/guide.interface";
import { IUser } from "@/interfaces/user.interface";

interface GuideProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  guide?: IUser<IGuide>;
}

const GuideModal = ({ guide, open, onClose, onSuccess }: GuideProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogTitle>{guide ? "Edit Guide" : "Create Guide"}</DialogTitle>
        <GuideForm onSuccess={onSuccess} onClose={onClose} guide={guide} />
      </DialogContent>
    </Dialog>
  );
};

export default GuideModal;
