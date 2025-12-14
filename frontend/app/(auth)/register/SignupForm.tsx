"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useActionState, useEffect } from "react";
import { signUpAction } from "./action";
import { UserRole } from "@/interfaces/user.interface";
import { toast } from "sonner";

const SignupForm = ({ role = UserRole.TOURIST }) => {
  const [data, signUp, loading] = useActionState(signUpAction, null);

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
    <form action={signUp} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" type="text" placeholder="John Doe" name="name" />
        {getFieldError("name") && (
          <p className="text-sm text-destructive">{getFieldError("name")}</p>
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
          <p className="text-sm text-destructive">{getFieldError("email")}</p>
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
      <div className="space-y-3">
        <Label>I want to...</Label>
        <RadioGroup name="role" defaultValue={role}>
          <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="TOURIST" id="tourist" />
            <Label htmlFor="tourist" className="flex-1 cursor-pointer">
              <div className="font-semibold">Book Tours</div>
              <div className="text-sm text-muted-foreground">
                Explore with local guides
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="GUIDE" id="guide" />
            <Label htmlFor="guide" className="flex-1 cursor-pointer">
              <div className="font-semibold">Become a Guide</div>
              <div className="text-sm text-muted-foreground">
                Share your city and earn money
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default SignupForm;
