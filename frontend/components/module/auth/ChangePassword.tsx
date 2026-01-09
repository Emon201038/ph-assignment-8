"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldContent } from "@/components/ui/field";
import { ArrowLeft, Loader2, Lock } from "lucide-react";
import InputFieldError from "@/components/shared/InputFieldError";
import { useActionState, useEffect } from "react";
import { changePassword } from "@/services/auth/auth.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ChangePassword = ({
  isForgotten = false,
  token,
}: {
  isForgotten?: boolean;
  token?: string;
}) => {
  const [state, action, isPending] = useActionState(changePassword, null);
  const router = useRouter();

  useEffect(() => {
    if (
      state &&
      !state.success &&
      (!state?.errors || state?.errors?.length === 0)
    ) {
      toast.error(state?.message);
    }
    if (state && state.success) {
      toast.success("Password reset successfull");
      if (isForgotten) router.push("/login");
    }
  }, [state]);
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Change Password</CardTitle>
            <CardDescription>Update your account password</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={action} className="space-y-4">
              <input
                type="hidden"
                name="isForgotten"
                value={isForgotten.toString()}
              />
              {isForgotten && (
                <input type="hidden" name="token" value={token} />
              )}
              {!isForgotten && (
                <Field>
                  <FieldLabel>Current Password *</FieldLabel>
                  <FieldContent>
                    <Input
                      name="currentPassword"
                      type="password"
                      defaultValue={state?.formData?.currentPassword}
                    />
                  </FieldContent>
                  <InputFieldError state={state} field="currentPassword" />
                </Field>
              )}

              <Field>
                <FieldLabel>New Password *</FieldLabel>
                <FieldContent>
                  <Input
                    name="newPassword"
                    type="password"
                    defaultValue={state?.formData?.newPassword}
                  />
                </FieldContent>
                <InputFieldError state={state} field="newPassword" />
              </Field>

              <Field>
                <FieldLabel>Confirm New Password *</FieldLabel>
                <FieldContent>
                  <Input
                    name="confirmPassword"
                    type="password"
                    defaultValue={state?.formData?.confirmPassword}
                  />
                </FieldContent>
                <InputFieldError state={state} field="confirmPassword" />
              </Field>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isPending}
              >
                {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Change Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChangePassword;
