"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Star,
  MapPin,
  Users,
  Calendar,
  Edit,
  Save,
  X,
  Globe,
  Award,
} from "lucide-react";
import NavigationTabs from "./NavigationTabs";
import ProfileEditModal from "./ProfileEditModal";
import { ITourist, IUser } from "@/interfaces/user.interface";
import { formatDate } from "date-fns";
import { IGuide } from "@/interfaces/guide.interface";

const profile = {
  name: "Sofia Martinez",
  title: "Professional Tour Guide",
  email: "sofia.martinez@email.com",
  location: "Barcelona, Spain",
  bio: "Passionate local guide with 8+ years of experience showcasing the beauty and culture of Barcelona. I love sharing my city's hidden gems and creating unforgettable experiences for travelers.",
  specialties: ["Architecture", "History", "Food & Wine", "Art"],
  languages: ["Spanish", "English", "French", "Catalan"],
  phone: "+34 612 345 678",
  hourlyRate: "€50",
  experience: "8 years",
  certifications: ["Licensed Tour Guide", "First Aid Certified"],
};

export default function GuideProfile({
  profile,
}: {
  profile: ITourist<IUser>;
}) {
  return (
    <Card className="p-6 mb-6 border-primary/20 bg-card/95 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        <Avatar className="h-32 w-32 border-4 border-primary/30 shadow-xl">
          <AvatarImage
            src={profile?.profile?.profileImage}
            alt="Alex Thompson"
          />
          <AvatarFallback>
            {profile?.profile?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {profile?.profile?.name}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <MapPin className="h-4 w-4" />
                <span>{profile?.profile?.address}</span>
              </div>
              <p className="text-foreground/80 max-w-2xl">
                {profile?.profile?.bio}
              </p>
            </div>
            <ProfileEditModal
              profile={profile as unknown as IUser<ITourist | IGuide>}
            />
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {profile?.interests.map((interest) => (
              <Badge
                key={interest}
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {profile?.totalTrips || 0}
          </div>
          <div className="text-sm text-muted-foreground">Tours Completed</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-chart-2">
            {formatDate(profile.createdAt, "dd-MM-yyyy")}
          </div>
          <div className="text-sm text-muted-foreground">Joined At</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-chart-3">
            {profile.reviewsGiven.length}
          </div>
          <div className="text-sm text-muted-foreground">Reviews Written</div>
        </div>
      </div>
    </Card>
  );
}
