"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState } from "react";
import { login } from "./action";
import { Button } from "@/components/ui/button";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [data, loginAction, isPending] = useActionState(login, null);

  console.log(data);
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
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="*******"
          name="password"
        />
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
