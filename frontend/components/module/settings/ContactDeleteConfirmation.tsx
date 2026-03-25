"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteEmergencyContact } from "@/services/profile/profile.service";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
  id: string;
};

const ContactDeleteConfirmation = ({ children, id }: Props) => {
  const [state, deleteContact, isPending] = useActionState(
    deleteEmergencyContact,
    null,
  );
  const router = useRouter();

  useEffect(() => {
    if (state && state?.success) {
      toast.success(state.message);
      router.refresh();
    }
    if (state && !state.success) {
      toast.error(state?.message || "Failed to delete emergency contact");
    }
  }, [state]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            emergency contact.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form action={deleteContact}>
          <AlertDialogFooter>
            <input name="id" type="hidden" value={id} />
            <AlertDialogCancel disabled={isPending} type="button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              disabled={isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/80"
            >
              {isPending ? "Deleting..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ContactDeleteConfirmation;
