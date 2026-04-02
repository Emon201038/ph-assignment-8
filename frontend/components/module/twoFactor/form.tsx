"use client";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verify2FA } from "@/services/auth/auth.service";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { RefreshCcw } from "lucide-react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const OtpForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [state, submitOtp, isPending] = useActionState(verify2FA, null);
  const [resendCooldown, setResendCooldown] = useState(120);

  useEffect(() => {
    const deviceId = localStorage.getItem("device_id");
    if (!deviceId) {
      router.push("/login");
    }
  }, [router]);

  const searchParams = new URLSearchParams(params.toString());
  const id = searchParams.get("id") as string;
  const userId = searchParams.get("user_id") as string;
  const redirect = searchParams.get("redirect") as string;
  const rememberMe = searchParams.get("rememberMe") as string;
  if (!id || !userId) {
    router.push("/login");
  }

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  useEffect(() => {
    const otpSentTime = localStorage.getItem("otp_sent_time");
    if (otpSentTime) {
      const elapsed = Math.floor((Date.now() - parseInt(otpSentTime)) / 1000);
      if (elapsed < 120) {
        setResendCooldown(120 - elapsed);
      } else {
        setResendCooldown(0);
      }
    } else {
      localStorage.setItem("otp_sent_time", Date.now().toString());
    }
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000,
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  return (
    <form action={submitOtp} className="relative z-10 space-y-8">
      <input
        type="hidden"
        name="deviceId"
        value={localStorage.getItem("device_id") as string}
      />
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="redirect" value={redirect} />
      <input type="hidden" name="rememberMe" value={rememberMe} />
      <div className="space-y-2">
        <h2 className="text-headline-sm font-bold text-on-surface">
          Enter Security Code
        </h2>
        <p className="text-body-md text-on-surface-variant leading-relaxed">
          We've sent a 6-digit verification code to your registered email. Enter
          it below to secure your session.
        </p>
      </div>
      <div className="flex justify-center w-full">
        <InputOTP
          containerClassName="w-full *:w-full"
          maxLength={6}
          name="otp"
          pattern={REGEXP_ONLY_DIGITS}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <InputOTPGroup className="w-full" key={index}>
              <InputOTPSlot index={index} />
            </InputOTPGroup>
          ))}
        </InputOTP>
      </div>
      <Button className="w-full py-4 text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/20">
        Verify Identity
      </Button>

      <div className="pt-4 space-y-4 border-t border-outline-variant/10">
        <div className="flex items-center justify-between">
          <button
            disabled={resendCooldown > 0}
            type="button"
            className="text-label-md font-bold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RefreshCcw size={16} />
            Resend Code
          </button>
          <span className="text-label-sm text-outline-variant uppercase tracking-widest">
            {Math.floor(resendCooldown / 60)}:
            {(resendCooldown % 60).toString().padStart(2, "0")}
          </span>
        </div>
      </div>
    </form>
  );
};

export default OtpForm;
