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
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Edit, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const ProfileEditModal = ({ profile }: { profile: any }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const pathname = usePathname();

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <>
      {pathname === "/profile" ? (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              className="border-primary/30 hover:bg-primary/10"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Guide Profile</DialogTitle>
              <DialogDescription>
                Update your professional profile and tour guide information
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={editedProfile.name}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input
                  id="title"
                  value={editedProfile.title}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={editedProfile.phone}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      phone: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={editedProfile.location}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      location: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  value={editedProfile.bio}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, bio: e.target.value })
                  }
                  rows={4}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rate">Hourly Rate</Label>
                  <Input
                    id="rate"
                    value={editedProfile.hourlyRate}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        hourlyRate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    value={editedProfile.experience}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        experience: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Specialties</Label>
                <div className="flex flex-wrap gap-2">
                  {editedProfile.specialties.map(
                    (specialty: any, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-primary/10 text-primary"
                      >
                        {specialty}
                        <button
                          onClick={() => {
                            const newSpecialties =
                              editedProfile.specialties.filter(
                                (_: any, i: any) => i !== index
                              );
                            setEditedProfile({
                              ...editedProfile,
                              specialties: newSpecialties,
                            });
                          }}
                          className="ml-2 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )
                  )}
                </div>
                <Input
                  placeholder="Add new specialty and press Enter"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const value = e.currentTarget.value.trim();
                      if (value) {
                        setEditedProfile({
                          ...editedProfile,
                          specialties: [...editedProfile.specialties, value],
                        });
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>Languages</Label>
                <div className="flex flex-wrap gap-2">
                  {editedProfile.languages.map(
                    (language: any, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-chart-2/10 text-chart-2"
                      >
                        {language}
                        <button
                          onClick={() => {
                            const newLanguages = editedProfile.languages.filter(
                              (_: any, i: number) => i !== index
                            );
                            setEditedProfile({
                              ...editedProfile,
                              languages: newLanguages,
                            });
                          }}
                          className="ml-2 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )
                  )}
                </div>
                <Input
                  placeholder="Add new language and press Enter"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const value = e.currentTarget.value.trim();
                      if (value) {
                        setEditedProfile({
                          ...editedProfile,
                          languages: [...editedProfile.languages, value],
                        });
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>Certifications</Label>
                <div className="flex flex-wrap gap-2">
                  {editedProfile.certifications.map(
                    (cert: any, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-chart-3/10 text-chart-3"
                      >
                        {cert}
                        <button
                          onClick={() => {
                            const newCerts =
                              editedProfile.certifications.filter(
                                (_: any, i: number) => i !== index
                              );
                            setEditedProfile({
                              ...editedProfile,
                              certifications: newCerts,
                            });
                          }}
                          className="ml-2 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )
                  )}
                </div>
                <Input
                  placeholder="Add new certification and press Enter"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const value = e.currentTarget.value.trim();
                      if (value) {
                        setEditedProfile({
                          ...editedProfile,
                          certifications: [
                            ...editedProfile.certifications,
                            value,
                          ],
                        });
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-primary hover:bg-primary/90"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
};

export default ProfileEditModal;
