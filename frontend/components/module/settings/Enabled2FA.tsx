import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { disable2FA } from "@/services/auth/auth.service";
import { ChevronLeftIcon, ChevronRight } from "lucide-react";
import React, { useTransition } from "react";
import { toast } from "sonner";

type TwoFactorData = {
  id: string;
  email: string;
  isEnabled: boolean;
  method: "TOTP" | "EMAIL" | "PASS_KEY";
  secret?: string;
};
type Props = {
  twoFactorData: TwoFactorData;
  setTwoFactorData: React.Dispatch<React.SetStateAction<TwoFactorData | null>>;
  setRootOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const maskEmail = (email: string) => {
  const [name, domain] = email.split("@");
  const visiblePart = name.slice(-2);
  const maskedPart = "*".repeat(name.length - 2);

  return `${maskedPart}${visiblePart}@${domain}`;
};

const Enabled2FA = (props: Props) => {
  const [emailOpen, setEmailOpen] = React.useState(false);
  const [authenticatorOpen, setAuthenticatorOpen] = React.useState(false);
  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
  const [enabled, setEnabled] = React.useState(props.twoFactorData.isEnabled);

  React.useEffect(() => {
    setEnabled(props.twoFactorData.isEnabled);
  }, [props.twoFactorData.isEnabled]);

  let content;
  if (emailOpen) {
    content = (
      <DialogContent>
        <DialogHeader>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              props.setRootOpen(true);
              setEmailOpen(false);
              setAuthenticatorOpen(false);
            }}
          >
            <ChevronLeftIcon />
          </Button>
          <DialogTitle className="text-start">Email OTP</DialogTitle>
          <DialogDescription className="text-start">
            You added {maskEmail(props.twoFactorData.email)} to your account and
            enabled it for two-factor authentication.
          </DialogDescription>
        </DialogHeader>

        <div>
          <h1>OTP message control</h1>
          <div className="border rounded-md p-3 hover:bg-primary/3 flex justify-between items-center">
            <Label
              htmlFor="email-otp"
              className="cursor-pointer flex-col justify-start items-start gap-1 flex-1"
            >
              <h1 className="font-medium">Email</h1>
              <p className="text-sm opacity-60">
                {maskEmail(props.twoFactorData.email)}
              </p>
            </Label>
            <Switch
              checked={enabled}
              id="email-otp"
              onCheckedChange={(checked) => {
                if (!checked) setOpenAlertDialog(true);
              }}
            />
            <AlertDialogComponent
              openAlertDialog={openAlertDialog}
              setOpenAlertDialog={setOpenAlertDialog}
              setEnabled={setEnabled}
              setTwoFactorData={props.setTwoFactorData}
            />
          </div>
        </div>
      </DialogContent>
    );
  } else if (authenticatorOpen) {
    content = (
      <DialogContent>
        <DialogHeader>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              // props.setRootOpen(true);
              setEmailOpen(false);
              setAuthenticatorOpen(false);
            }}
          >
            <ChevronLeftIcon />
          </Button>
          <DialogTitle className="text-start">Authenticator</DialogTitle>
          <DialogDescription className="text-start">
            We'll now ask for a login code whenever you log in on a device that
            we don't recognise.
          </DialogDescription>

          <div>
            <h1>Authentication app</h1>
            <div className="border rounded-md p-3 hover:bg-primary/3 flex justify-between items-center">
              <Label
                htmlFor="authenticator-otp"
                className="cursor-pointer flex-col justify-start items-start gap-1 flex-1"
              >
                <h1 className="font-medium">Authentication App</h1>
                <p className="text-sm opacity-60">
                  You&apos;ll get a code from your authentication app.
                </p>
              </Label>
              <Switch
                checked={enabled}
                id="authenticator-otp"
                onCheckedChange={(checked) => {
                  if (!checked) setOpenAlertDialog(true);
                }}
              />
              <AlertDialogComponent
                openAlertDialog={openAlertDialog}
                setOpenAlertDialog={setOpenAlertDialog}
                setEnabled={setEnabled}
                setTwoFactorData={props.setTwoFactorData}
              />
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    );
  } else {
    content = (
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-start">
            Two-Factor Authentication is ON
          </DialogTitle>
          <DialogDescription className="text-start">
            We'll now ask for a login code whenever you log in on a device that
            we don't recognise.
          </DialogDescription>
        </DialogHeader>
        <div className="cursor-pointer">
          <h1 className="font-semibold">How you get login codes</h1>
          {props.twoFactorData.method === "TOTP" && (
            <div
              onClick={() => {
                // props.setRootOpen(false);
                setAuthenticatorOpen(true);
                setEmailOpen(false);
              }}
              className="rounded-md border p-3 hover:bg-primary/3 relative pr-4"
            >
              <h1 className="font-medium">Authentication App</h1>
              <p className="text-sm opacity-70">
                <span className="text-[#3aaf22]">Recommanded . </span>
                You will get a code from an app, such as Duo Mobile or Google
                Authenticator.
              </p>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-70">
                <ChevronRight />
              </div>
            </div>
          )}
          {props.twoFactorData.method === "EMAIL" && (
            <div
              onClick={() => {
                // props.setRootOpen(false);
                setAuthenticatorOpen(false);
                setEmailOpen(true);
              }}
              className="rounded-md border p-3 hover:bg-primary/3 relative pr-7"
            >
              <h1 className="font-medium">Email</h1>
              <p className="text-sm opacity-70">
                We will send a code to your email address{" "}
                {maskEmail(props.twoFactorData.email)}.
              </p>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-70">
                <ChevronRight />
              </div>
            </div>
          )}
        </div>
        <div className="cursor-pointer">
          <h1 className="font-semibold">Add backup methods</h1>
          <div
            onClick={() => toast.info("Feature will be coming soon...")}
            className="relative rounded-md border p-3 hover:bg-primary/3 pr-7"
          >
            <h1 className="font-medium">Recovery codes</h1>
            <p className="text-sm opacity-70">
              Use these when you don&apos;t have access to your primary 2FA
              method. Each code can only be used once, so keep them safe.
            </p>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-70">
              <ChevronRight />
            </div>
          </div>
        </div>
      </DialogContent>
    );
  }
  return <>{content}</>;
};

const AlertDialogComponent = ({
  openAlertDialog,
  setOpenAlertDialog,
  setEnabled,
  setTwoFactorData,
}: {
  openAlertDialog: boolean;
  setOpenAlertDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  setTwoFactorData: React.Dispatch<React.SetStateAction<TwoFactorData | null>>;
}) => {
  const [isDisabling, startDisableTransition] = useTransition();

  const handleDisable2FA = async () => {
    try {
      startDisableTransition(async () => {
        const data = await disable2FA();
        if (data?.success) {
          toast.success("Two-factor authentication has been turned off.");
          setTwoFactorData(null);
          setEnabled(false);
          setOpenAlertDialog(false);
        } else {
          toast.error(
            "Failed to turn off two-factor authentication. Please try again.",
          );
        }
      });
    } catch (error) {
      toast.error(
        "Failed to turn off two-factor authentication. Please try again.",
      );
    }
  };
  return (
    <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Turn off two-factor authentication?
          </AlertDialogTitle>
          <AlertDialogDescription>
            If you turn off two-factor authentication, your account will no
            longer have an extra layer of protection. Are you sure you want to
            turn it off?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row">
          <AlertDialogCancel className="flex-1">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="flex-1"
            disabled={isDisabling}
            onClick={() => handleDisable2FA()}
          >
            {isDisabling ? "Turning off..." : "Turn off"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Enabled2FA;
