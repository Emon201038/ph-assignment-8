"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useActionState, useEffect, useRef } from "react";
import { createTourAction } from "@/action/tour";
import { ITour } from "@/interfaces/tour.interface";

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  tour?: ITour;
}

const CreateUserModal = ({
  tour,
  open,
  onClose,
  onSuccess,
}: CreateUserModalProps) => {
  const isEdit = tour!!;
  const formRef = useRef<HTMLFormElement>(null);

  const [state, createTour, isLoading] = useActionState(createTourAction, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      if (formRef?.current) {
        formRef.current.reset();
      }
      onClose();
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  const getFieldError = (fieldName: string) => {
    if (state && state?.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      return error?.message;
    } else {
      return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogTitle>{isEdit ? "Edit User" : "Create User"}</DialogTitle>
        <form ref={formRef} action={createTour} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" type="text" placeholder="John Doe" name="name" />
            {getFieldError("name") && (
              <p className="text-sm text-destructive">
                {getFieldError("name")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              name="email"
            />
            {getFieldError("email") && (
              <p className="text-sm text-destructive">
                {getFieldError("email")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              name="password"
            />
            {getFieldError("password") && (
              <p className="text-sm text-destructive">
                {getFieldError("password")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password_confirmation">Confirm Password</Label>
            <Input
              id="password_confirmation"
              type="password"
              placeholder="••••••••"
              name="password_confirmation"
            />
            {getFieldError("password_confirmation") && (
              <p className="text-sm text-destructive">
                {getFieldError("password_confirmation")}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isLoading} className="mt-4 w-full">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
