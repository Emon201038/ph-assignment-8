"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Award, Globe, MapPin, Star, Users } from "lucide-react";
import React from "react";

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

const GuideViewDetailsDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-auto max-w-6xl sm:max-w-3xl w-full">
        <Card className="p-6 mb-6 border-primary/20 bg-card/95 backdrop-blur-sm">
          <div className="relative flex flex-col gap-6 items-start md:items-center ">
            <div className="w-full h-50 flex justify-center items-end relative">
              <div
                style={{
                  backgroundImage: 'url("/images/barcelona.jpeg")',
                }}
                className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover bg-center bg-linear-to-r from-primary/20 via-chart-2/20 to-chart-3/20 backdrop-blur-3xl filter-blur-3xl -z-10"
              ></div>
              <Avatar className="h-32 w-32 border-4 border-primary/30 shadow-xl">
                <AvatarImage
                  src="/professional-tour-guide-portrait.jpg"
                  alt="Sofia Martinez"
                />
                <AvatarFallback>SMS</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-1">
                    {profile.name}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-2">
                    {profile.title}
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                  <p className="text-foreground/80 max-w-2xl">{profile.bio}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {profile.specialties.map((specialty) => (
                  <Badge
                    key={specialty}
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                <span className="text-2xl font-bold text-foreground">4.9</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Average Rating
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">350+</div>
              <div className="text-sm text-muted-foreground">
                Tours Completed
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-chart-2">
                {profile.experience}
              </div>
              <div className="text-sm text-muted-foreground">Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-chart-3">245</div>
              <div className="text-sm text-muted-foreground">Reviews</div>
            </div>
          </div>
        </Card>

        {/* Quick Info Cards */}
        <div className="flex flex-wrap w-full gap-4 mb-6">
          <Card className="p-4 border-primary/20">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Languages</div>
                <div className="font-semibold">
                  {profile.languages.join(", ")}
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-primary/20">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-chart-2/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Certified</div>
                <div className="font-semibold">{profile.certifications[0]}</div>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-primary/20">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-chart-3/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Rate</div>
                <div className="font-semibold">{profile.hourlyRate}/hour</div>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuideViewDetailsDialog;
