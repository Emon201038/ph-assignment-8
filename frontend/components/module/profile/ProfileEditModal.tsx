"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Edit, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { ITourist, IUser, UserRole } from "@/interfaces/user.interface";
import { IGuide } from "@/interfaces/guide.interface";
import TouristFormDialog from "../tourist/TouristCreateModal";
import GuideModal from "../guide/GuideModal";

const ProfileEditModal = ({
  profile,
}: {
  profile: IUser<ITourist | IGuide>;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<IUser<
    ITourist | IGuide
  > | null>(null);
  const [, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const handleSave = () => {
    setIsEditing(false);
    setEditedProfile(null);
    startTransition(() => {
      router.refresh();
    });
  };

  const handleCancel = () => {
    setEditedProfile(null);
    setIsEditing(false);
  };

  return (
    <>
      <Button onClick={() => setEditedProfile(profile)}>Edit Profile</Button>
      {profile.role === UserRole.TOURIST ? (
        <TouristFormDialog
          open={!!editedProfile}
          onClose={handleCancel}
          tourist={profile as IUser<ITourist>}
          onSuccess={handleSave}
        />
      ) : profile.role === UserRole.GUIDE ? (
        <GuideModal
          open={!!editedProfile}
          onClose={handleCancel}
          guide={profile as IUser<IGuide>}
          onSuccess={handleSave}
        />
      ) : null}
    </>
  );
};

export default ProfileEditModal;
