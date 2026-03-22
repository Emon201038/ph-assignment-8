"use client";

import { useState } from "react";
import { User, Briefcase, MapPin, Send, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const specialtyOptions = [
  "History",
  "Food & Drink",
  "Architecture",
  "Adventure",
  "Nightlife",
  "Art",
];

interface GuideFormData {
  fullName: string;
  email: string;
  baseLocation: string;
  bio: string;
  gender: string;
  experience: string;
}

interface GuideSignupFormProps {
  onSubmit?: (data: {
    formData: GuideFormData;
    specialties: string[];
    languages: string[];
  }) => void;
}

export default function GuideSignupForm({ onSubmit }: GuideSignupFormProps) {
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [languageInput, setLanguageInput] = useState("");
  const [formData, setFormData] = useState<GuideFormData>({
    fullName: "",
    email: "",
    baseLocation: "",
    bio: "",
    gender: "",
    experience: "",
  });

  const handleAddLanguage = () => {
    if (languageInput.trim() && !languages.includes(languageInput.trim())) {
      setLanguages((prev) => [...prev, languageInput.trim()]);
      setLanguageInput("");
    }
  };

  const handleRemoveLanguage = (language: string) => {
    setLanguages((prev) => prev.filter((l) => l !== language));
  };

  const handleLanguageKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddLanguage();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      formData,
      specialties: selectedSpecialties,
      languages,
    };
    if (onSubmit) {
      onSubmit(submitData);
    }
  };

  return (
    <form className="p-8 space-y-8" onSubmit={handleSubmit}>
      {/* Personal Info */}
      <section>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <div className="flex flex-col gap-1">
            <Label htmlFor="fullName" className="text-sm font-medium">
              Full Name
            </Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              placeholder="john@example.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="experience" className="text-sm font-medium">
              Experience (years)
            </Label>
            <Input
              id="experience"
              placeholder="4"
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="gender" className="text-sm font-medium">
              Gender
            </Label>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, gender: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <hr className="border-slate-100 dark:border-slate-800" />

      {/* Professional Details */}
      <section>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          Professional Details
        </h3>
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="baseLocation" className="text-sm font-medium">
              Base Location
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                id="baseLocation"
                className="pl-10"
                placeholder="City, Country"
                type="text"
                name="baseLocation"
                value={formData.baseLocation}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="languages" className="text-sm font-medium">
              Languages Spoken
            </Label>
            <div className="flex gap-2 w-full">
              <div className="flex-1 w-full!">
                <Input
                  id="languages"
                  placeholder="Enter a language..."
                  type="text"
                  value={languageInput}
                  onChange={(e) => setLanguageInput(e.target.value)}
                  onKeyDown={handleLanguageKeyDown}
                />
              </div>
              <Button
                type="button"
                onClick={handleAddLanguage}
                className="text-primary-foreground"
              >
                Add <Plus className="w-4 h-4" />
              </Button>
            </div>
            {languages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {languages.map((language) => (
                  <div
                    key={language}
                    className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {language}
                    <button
                      type="button"
                      onClick={() => handleRemoveLanguage(language)}
                      className="ml-1 hover:text-primary/70"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium mb-2">Specialties</Label>
            <MultiSelect
              options={specialtyOptions.map((specialty) => ({
                value: specialty.toLowerCase().replace(/\s+/g, "-"),
                label: specialty,
              }))}
              value={selectedSpecialties.map((s) =>
                s.toLowerCase().replace(/\s+/g, "-"),
              )}
              onValueChange={(values) => {
                const mapped = values.map((val) => {
                  const option = specialtyOptions.find(
                    (opt) => opt.toLowerCase().replace(/\s+/g, "-") === val,
                  );
                  return option || val;
                });
                setSelectedSpecialties(mapped);
              }}
              placeholder="Select specialties..."
              maxDisplayed={3}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="bio" className="text-sm font-medium">
              Bio / Experience
            </Label>
            <Textarea
              id="bio"
              placeholder="Tell us about your background and what makes your tours special..."
              rows={4}
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </section>

      <div className="pt-4">
        <Button
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary/90 py-4 text-white font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all"
          type="submit"
        >
          <span>Submit Application</span>
          <Send className="w-5 h-5" />
        </Button>
        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4">
          By submitting, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </form>
  );
}
