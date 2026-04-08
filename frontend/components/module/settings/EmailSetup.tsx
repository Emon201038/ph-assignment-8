import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { send2faOtp } from "@/services/auth/auth.service";
import { ChevronLeftIcon, RefreshCcwIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import { toast } from "sonner";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRootOpen: React.Dispatch<React.SetStateAction<boolean>>;
  email?: string;
};

const EmailSetup = ({ open, setOpen, setRootOpen, email }: Props) => {
  const [otpOpen, setOtpOpen] = React.useState(false);
  const [state, sentOtp, isPending] = useActionState(send2faOtp, null);
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    if (state && state?.success) {
      const searchParams = new URLSearchParams(params.toString());
      toast.success("OTP sent to your email.");
      localStorage.setItem("otp_sent_time", Date.now().toString());
      searchParams.set("id", state.data.id);
      searchParams.set("email", state.data.email);
      searchParams.set("type", state.data.type);
      router.push(`?${searchParams.toString()}`);
      setOpen(false);
      setOtpOpen(true);
    } else if (state && !state?.success) {
      toast.error("Error sending OTP. Please try again.");
    }
  }, [state]);

  const formAction = (formData: FormData) => {
    const searchParams = new URLSearchParams(params.toString());
    const id = searchParams.get("id");
    const email = searchParams.get("email");
    const type = searchParams.get("type");
    if (id && email && type) {
      setOpen(false);
      setOtpOpen(true);
    } else {
      sentOtp(formData);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setOpen(false);
                setRootOpen(true);
              }}
            >
              <ChevronLeftIcon />
            </Button>
            <DialogTitle>Add Email Address</DialogTitle>
            <DialogDescription className="text-start">
              Enter your email address and we'll send you a confirmation code
              next.
            </DialogDescription>
          </DialogHeader>
          <form action={formAction}>
            <Field>
              <FieldLabel htmlFor="email" className="w-full">
                Email Address
              </FieldLabel>
              <FieldContent>
                <Input name="email" id="email" value={email} />
              </FieldContent>
              <InputFieldError state={state} field="email" />
            </Field>
            <Button type="submit" disabled={isPending} className="mt-4 w-full">
              {isPending ? "Sending OTP" : "Next"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <EnterOtp
        otpOpen={otpOpen}
        setOtpOpen={setOtpOpen}
        setRootOpen={setOpen}
      />
    </div>
  );
};

const EnterOtp = ({
  otpOpen,
  setOtpOpen,
  setRootOpen,
}: {
  otpOpen: boolean;
  setOtpOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRootOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [otp, setOtp] = React.useState("");
  const [countdown, setCountdown] = React.useState(120);
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    if (!otpOpen) {
      return;
    }
    const otpSentTime = localStorage.getItem("otp_sent_time");
    if (otpSentTime) {
      const elapsed = Math.floor((Date.now() - parseInt(otpSentTime)) / 1000);
      if (elapsed < 120) {
        setCountdown(120 - elapsed);
      } else {
        setCountdown(0);
      }
    } else {
      localStorage.setItem("otp_sent_time", Date.now().toString());
    }
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, otpOpen]);

  const handleResend = () => {
    const searchParams = new URLSearchParams(params.toString());
    const id = searchParams.get("id");
    const email = searchParams.get("email");
    const type = searchParams.get("type");

    console.log(id, email, type);
  };

  return (
    <div>
      <Dialog open={otpOpen} onOpenChange={setOtpOpen}>
        <DialogContent>
          <DialogHeader>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setOtpOpen(false);
                setRootOpen(true);
              }}
            >
              <ChevronLeftIcon />
            </Button>
            <DialogTitle>
              Check your email for your verification code
            </DialogTitle>
            <DialogDescription className="text-start">
              Enter the 6-digit code we sent to your email.
            </DialogDescription>
          </DialogHeader>

          <Field>
            <FieldLabel htmlFor="otp" className="w-full">
              Verification Code
            </FieldLabel>
            <FieldContent>
              <Input
                id="otp"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setOtp(value);
                }}
                placeholder="Enter 6-digit code"
                inputMode="numeric"
                maxLength={6}
              />
            </FieldContent>
          </Field>

          <Button
            disabled={otp.length !== 6}
            onClick={() => {
              toast.success("Verification is ready to be connected.");
            }}
          >
            Verify
          </Button>

          <button
            type="button"
            disabled={countdown > 0}
            className="text-sm text-primary flex items-center gap-2 disabled:text-muted-foreground disabled:cursor-not-allowed"
            onClick={() => {
              handleResend();
              toast.success("A new code has been sent.");
            }}
          >
            <RefreshCcwIcon size={14} />
            {countdown > 0 ? `Resend code in ${countdown}s` : "Resend code"}
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailSetup;
