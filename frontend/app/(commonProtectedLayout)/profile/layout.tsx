import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Users, Globe, Award } from "lucide-react";
import ProfileEditModal from "@/components/module/profile/ProfileEditModal";
import NavigationTabs from "@/components/module/profile/NavigationTabs";
import { auth } from "@/lib/session";
import { ITourist, IUser, UserRole } from "@/interfaces/user.interface";
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

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth<ITourist | IGuide>();

  if (session?.role === "ADMIN") {
    return (
      <div>
        <h1>Admin Profile will not visible by users</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-primary/5 to-background">
      {/* Cover Section */}
      <div className="relative h-64 bg-linear-to-r from-primary/20 via-chart-2/20 to-chart-3/20">
        <img
          src="/images/barcelona.jpeg"
          alt="Barcelona"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <Card className="p-6 mb-6 border-primary/20 bg-card/95 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="h-32 w-32 border-4 border-primary/30 shadow-xl">
              <AvatarImage src={session?.profileImage} alt={session?.name} />
              <AvatarFallback>{session?.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-1">
                    {session?.name}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-2">
                    {session?.role}
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4" />
                    <span>{session?.address}</span>
                  </div>
                  <p className="text-foreground/80 max-w-2xl">{session?.bio}</p>
                </div>
                <ProfileEditModal
                  profile={session as IUser<ITourist | IGuide>}
                />
              </div>

              {session?.role === UserRole.GUIDE && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {(session as IUser<IGuide>).profile.expertise.map(
                    (specialty) => (
                      <Badge
                        key={specialty}
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        {specialty}
                      </Badge>
                    )
                  )}
                </div>
              )}
              {session?.role === UserRole.TOURIST && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {(session as IUser<ITourist>).profile.interests.map(
                    (interest) => (
                      <Badge
                        key={interest}
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        {interest}
                      </Badge>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          {session?.role === "GUIDE" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  <span className="text-2xl font-bold text-foreground">
                    4.9
                  </span>
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
          )}
        </Card>

        {/* Quick Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
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

        {/* <NavigationTabs role={session?.role as UserRole} /> */}

        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
