"use client";

import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/constants/tours";

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  gender: string;
  agreeToTerms: boolean;
}

interface SignupFormProps {
  onSubmit?: (data: { formData: SignupFormData; interests: string[] }) => void;
}

export default function SignupForm({ onSubmit }: SignupFormProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    email: "",
    password: "",
    gender: "",
    agreeToTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      formData,
      interests: selectedInterests,
    };
    console.log("Form data:", submitData);
    if (onSubmit) {
      onSubmit(submitData);
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            className="pl-10"
            placeholder="John Doe"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute z-10 text-slate-400 left-3 top-1/2 -translate-y-1/2  w-5 h-5" />
          <Input
            className="pl-10"
            placeholder="explorer@travel.com"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              className="pl-10"
              placeholder="Min. 8 characters"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="gender" className="text-sm font-semibold">
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

      <div className="flex flex-col gap-3 mt-2">
        <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
          Travel Interests (Select all that apply)
        </label>
        <MultiSelect
          options={categories.map((category) => ({
            value: category.value,
            label: category.label,
          }))}
          value={selectedInterests}
          onValueChange={setSelectedInterests}
          placeholder="Select your interests..."
          maxDisplayed={3}
        />
      </div>

      <div className="flex items-start gap-3 mt-4">
        <input
          className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary border-slate-300 dark:border-slate-600 dark:bg-slate-800 accent-primary"
          type="checkbox"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleInputChange}
          id="terms"
        />
        <p className="text-xs text-slate-500 dark:text-slate-400">
          By signing up, you agree to our Terms of Service and Privacy Policy.
          We'll occasionally send you travel inspiration and updates.
        </p>
      </div>

      <button
        className="w-full bg-primary text-white font-bold py-4 rounded-lg mt-4 hover:brightness-110 shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
        type="submit"
      >
        Create Account
      </button>
    </form>
  );
}
