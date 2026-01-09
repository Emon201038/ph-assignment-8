"use client";

import type React from "react";

import { useState, useRef, useEffect, useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { KeyRound } from "lucide-react";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { sendOtp, verifyOtp } from "@/services/auth/auth.service";
import InputFieldError from "@/components/shared/InputFieldError";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter, useSearchParams } from "next/navigation";

export default function OtpForm({ id, email }: { id: string; email: string }) {
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(6);
  const [state, action, isPending] = useActionState(verifyOtp, null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  useEffect(() => {
    if (
      state &&
      !state.success &&
      (!state.errors || state?.errors?.length === 0)
    ) {
      toast.error(state?.message);
    }
    if (state && state.success && state?.data?.token) {
      router.push(
        `/forgot-password/reset-password?token=${state?.data?.token}`
      );
    }
  }, [state]);

  const handleResend = async () => {
    if (!canResend) return;
    const params = new URLSearchParams(searchParams.toString());
    const res = await sendOtp(email);
    if (res?.success) {
      toast.success(res?.message);
      setCanResend(false);
      setCountdown(60);
      params.set("session_id", res?.data?._id);
      router.push(`/forgot-password/verify?${params.toString()}`);
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <KeyRound className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl">Verify Your Email</CardTitle>
              <CardDescription className="text-balance">
                We've sent a 6-digit verification code to your email address.
                Please enter it below to continue.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form action={action} className="space-y-4">
              <input type="hidden" name="id" value={id} />
              <div className="flex flex-col gap-2 justify-center items-center">
                <InputOTP maxLength={6} name="otp" pattern={REGEXP_ONLY_DIGITS}>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <InputOTPGroup key={index}>
                      <InputOTPSlot className="w-12 h-14 " index={index} />
                    </InputOTPGroup>
                  ))}
                </InputOTP>
                <InputFieldError state={state} field="otp" />
              </div>

              <Button
                // onClick={handleVerify}
                disabled={isPending}
                className="w-full"
                size="lg"
              >
                {isPending ? "Verifying..." : "Verify Code"}
              </Button>
            </form>

            <div className="text-center text-sm">
              <p className="text-muted-foreground mb-2">
                Didn&apos;t receive the code?
              </p>
              <button
                onClick={handleResend}
                disabled={!canResend}
                className="text-primary hover:underline disabled:text-muted-foreground disabled:no-underline disabled:cursor-not-allowed"
              >
                {canResend ? "Resend Code" : `Resend in ${countdown}s`}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
