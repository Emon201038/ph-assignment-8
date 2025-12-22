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
import { useActionState, useEffect, useRef, useState } from "react";
import { createTourAction } from "@/action/tour";
import { ITour } from "@/interfaces/tour.interface";
import { MultiSelect } from "@/components/ui/multi-select";
import { TOURIST_PREFERENCES } from "@/constants/user";
import { SearchableSelect } from "@/components/ui/searchable-select";

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
  const [languages, setLanguages] = useState<
    { code: string; name: string; nativeName: string }[]
  >([]);

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

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/lookup/languages`
        );
        const data: {
          success: boolean;
          message: string;
          data: { code: string; name: string; nativeName: string }[];
        } = await res.json();

        if (data.success) {
          setLanguages(data.data);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to fetch languages");
      }
    };

    fetchLanguages();
  }, []);

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
        <form
          ref={formRef}
          action={createTour}
          className="space-y-4 overflow-x-hidden"
        >
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
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="space-y-2">
              <Label htmlFor="interests">Interests</Label>
              <MultiSelect
                options={TOURIST_PREFERENCES}
                onValueChange={(v) => console.log(v)}
              />
              {getFieldError("password_confirmation") && (
                <p className="text-sm text-destructive">
                  {getFieldError("password_confirmation")}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="interests">Prefered Languages</Label>
              <SearchableSelect
                options={languages.map((l) => ({
                  label: l.nativeName,
                  value: l.code,
                }))}
                onValueChange={(e) => console.log(e)}
              />
              {getFieldError("password_confirmation") && (
                <p className="text-sm text-destructive">
                  {getFieldError("password_confirmation")}
                </p>
              )}
            </div>
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
