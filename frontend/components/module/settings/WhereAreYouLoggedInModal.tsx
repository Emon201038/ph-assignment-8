"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { serverFetch } from "@/lib/server-fetch";
import React, { useEffect } from "react";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
};

interface DeviceSession {
  id: string;
  deviceId: string;
  os: string;
  browserName: string;
  updatedAt: string;
}

const WhereAreYouLoggedInModal = ({ children }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [devices, setDevices] = React.useState<DeviceSession[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await serverFetch.get("/v2/auth/devices");
        const data = await res.json();
        if (data?.success) {
          setDevices(data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch device sessions");
      } finally {
        setIsLoading(false);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Where You&apos;re Logged In</DialogTitle>
          <DialogDescription>
            Review devices with active access to your account. If something
            looks unfamiliar, sign out that session immediately.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          {isLoading ? (
            <>
              <Skeleton className="w-full h-16.5" />
              <Skeleton className="w-full h-16.5" />
              <Skeleton className="w-full h-16.5" />
            </>
          ) : null}
          {!isLoading && !devices.length && (
            <p className="text-muted-foreground text-sm">
              No device sessions found
            </p>
          )}
          {!isLoading &&
            devices.length &&
            devices.map((session) => (
              <div
                key={session.id}
                className="flex items-start justify-between gap-3 rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium text-sm">
                    {session.os} - {session.browserName}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {new Date(session.updatedAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>

                {session.deviceId === localStorage.getItem("device_id") ? (
                  <Badge variant="secondary">Current device</Badge>
                ) : (
                  <Button variant="outline" size="sm">
                    Sign out
                  </Button>
                )}
              </div>
            ))}

          <div className="flex justify-end gap-2 pt-1">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button variant="destructive">Sign Out All Other Devices</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhereAreYouLoggedInModal;
