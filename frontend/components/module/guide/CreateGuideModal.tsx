"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { categories, cities } from "@/lib/mock-data";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { createTourAction } from "@/action/tour";
import { ITour } from "@/interfaces/tour.interface";

interface CreateTourModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  tour?: ITour;
}

const CreateTourModal = ({
  tour,
  open,
  onClose,
  onSuccess,
}: CreateTourModalProps) => {
  const isEdit = tour!!;
  const formRef = useRef<HTMLFormElement>(null);

  const [state, createGuide, isLoading] = useActionState(
    createTourAction,
    null
  );

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
        <form action={createGuide} className="space-y-4">
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
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTourModal;
