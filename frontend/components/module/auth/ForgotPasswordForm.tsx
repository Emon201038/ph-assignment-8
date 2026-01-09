"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { forgotPassword } from "@/services/auth/auth.service";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
  const [state, action, isPending] = useActionState(forgotPassword, null);
  const router = useRouter();
  useEffect(() => {
    if (state && state.success) {
      toast.success(state.message);
      // router.push(`/forgot-password/verify?email=${state?.formData?.email}`);
    } else if (state && !state.success) {
      toast.error(state?.message);
    }
    if (state?.success) {
      router.push(
        `/forgot-password/verify?email=${state?.formData?.email}&session_id=${state?.data?._id}`
      );
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      <Field>
        <FieldLabel>Email Address *</FieldLabel>
        <FieldContent>
          <Input
            name="email"
            type="email"
            placeholder="you@example.com"
            defaultValue={state?.formData?.email || undefined}
            // required
          />
          <InputFieldError state={state} field="email" />
        </FieldContent>
      </Field>

      <Button type="submit" className="w-full" size="lg" disabled={isPending}>
        {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
        Find Account
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link href="/auth/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
