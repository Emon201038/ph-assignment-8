"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState, useEffect } from "react";
import { login } from "./action";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [data, loginAction, isPending] = useActionState(login, null);

  useEffect(() => {
    if (data && !data?.success && data.message) {
      toast.error(data.message);
    }
  }, [data]);

  const getFieldError = (fieldName: string) => {
    if (data && data?.errors) {
      const error = data.errors.find((err: any) => err.field === fieldName);
      return error?.message;
    } else {
      return null;
    }
  };

  return (
    <form action={loginAction} className="space-y-4">
      {redirect && <input type="hidden" name="redirect" value={redirect} />}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          name="email"
        />
        {getFieldError("email") && (
          <p className="text-sm text-destructive">{getFieldError("email")}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="*******"
          name="password"
        />
        {getFieldError("password") && (
          <p className="text-sm text-destructive">
            {getFieldError("password")}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
