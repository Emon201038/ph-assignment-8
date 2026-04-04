"use client";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { IEmergencyContact } from "@/interfaces/user.interface";
import { IInputErrorState } from "@/lib/getInputFieldError";
import { addEmergencyContact } from "@/services/profile/profile.service";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
  userId: string;
  contact?: IEmergencyContact;
  isEdit?: boolean;
};

const EmergencyContactModal = ({
  children,
  userId,
  contact,
  isEdit = false,
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const [state, addContact, isPending] = useActionState(
    addEmergencyContact,
    null,
  );
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      router.refresh();
      setOpen(false);
    }
    if (state && !state.success && !state?.errors?.length) {
      toast.error(state.message || "Failed to add emergency contact");
    }
  }, [state]);

  useEffect(() => {
    if (!open) {
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Emergency Contact Information</DialogTitle>
          <DialogDescription>
            Please provide the contact details of a trusted person who can be
            reached in case of an emergency during your tour. This information
            will only be used for safety purposes and will not be shared with
            anyone outside of our emergency response team.
          </DialogDescription>
        </DialogHeader>
        <form action={addContact} className="space-y-4">
          <input name="id" type="hidden" value={userId} />
          <input name="isEdit" type="hidden" value={isEdit.toString()} />
          {isEdit && (
            <input name="documentId" type="hidden" value={contact?.id || ""} />
          )}
          <Field>
            <FieldLabel htmlFor="emergency-contact-name">
              Contact Relation
            </FieldLabel>
            <FieldContent>
              <Input
                name="name"
                id="emergency-contact-name"
                type="text"
                defaultValue={
                  contact?.name ||
                  (state?.formData?.name as string) ||
                  undefined
                }
              />
              <InputFieldError field="name" state={state as IInputErrorState} />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel htmlFor="emergency-contact-phone">
              Contact Phone
            </FieldLabel>
            <FieldContent>
              <Input
                name="phone"
                id="emergency-contact-phone"
                type="text"
                defaultValue={
                  contact?.phone ||
                  (state?.formData?.phone as string) ||
                  undefined
                }
              />
              <InputFieldError
                field="phone"
                state={state as IInputErrorState}
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel htmlFor="emergency-contact-email">
              Contact Email
            </FieldLabel>
            <FieldContent>
              <Input
                name="email"
                id="emergency-contact-email"
                type="text"
                defaultValue={
                  contact?.email ||
                  (state?.formData?.email as string) ||
                  undefined
                }
              />
              <InputFieldError
                field="email"
                state={state as IInputErrorState}
              />
            </FieldContent>
          </Field>

          <div className="flex justify-end mt-4">
            <Button disabled={isPending} type="submit">
              {isPending ? "Saving..." : "Save Contact Information"}
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="ml-2">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencyContactModal;
