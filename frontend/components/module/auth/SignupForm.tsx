"use client";

import { useActionState, useEffect, useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Phone, FileText } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import InputFieldError from "@/components/shared/InputFieldError";
import { IInputErrorState } from "@/lib/getInputFieldError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/constants/tours";
import { createTouristAction } from "@/services/tourist/tourist.service";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Gender, ITourist, IUser } from "@/interfaces/user.interface";
import { TOURIST_PREFERENCES } from "@/constants/user";
import { SearchableSelect } from "@/components/ui/searchable-select";
import languages from "@/data/iso/languages.json";
import { Textarea } from "@/components/ui/textarea";

export default function SignupForm({ tourist }: { tourist?: IUser<ITourist> }) {
  const [gender, setGender] = useState("MALE");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [deviceId, setDeviceId] = useState<string | null>();
  const [preferedLanguage, setPreferedLanguage] = useState<string>(
    tourist?.profile?.languages.join(",") || "",
  );
  const [interests, setInterests] = useState<
    { label: string; value: string }[]
  >(tourist?.profile?.interests.map((i) => ({ label: i, value: i })) || []);
  const [state, signupAction, isPending] = useActionState(
    createTouristAction,
    null,
  );

  useEffect(() => {
    if (state && !state?.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  useEffect(() => {
    const storedDeviceId = localStorage.getItem("device_id");

    if (!storedDeviceId) {
      const newDeviceId = uuid();
      localStorage.setItem("device_id", newDeviceId);
      setDeviceId(newDeviceId);
    } else {
      setDeviceId(storedDeviceId);
    }
  }, []);

  console.log(state, interests, preferedLanguage);

  return (
    <form action={signupAction} className="space-y-5">
      <input type="hidden" name="isSignUp" value="true" />
      <input
        type="hidden"
        name="interests"
        value={interests.map((i) => i.value).join(",")}
      />
      <input type="hidden" name="preferredLanguage" value={preferedLanguage} />
      <input type="hidden" name="gender" value={gender} />
      {deviceId && <input type="hidden" name="deviceId" value={deviceId} />}

      <div className="space-y-2">
        <Label
          htmlFor="name"
          className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1"
        >
          Full Name
        </Label>
        <div className="relative">
          <User className="absolute z-1 left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
          <Input
            id="name"
            className="pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-slate-100"
            placeholder="John Doe"
            type="text"
            name="name"
            defaultValue={(state?.formData?.name as string) || undefined}
            required
          />
        </div>
        <InputFieldError field="name" state={state as IInputErrorState} />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1"
        >
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute z-1 left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
          <Input
            id="email"
            className="pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-slate-100"
            placeholder="explorer@travel.com"
            type="email"
            name="email"
            defaultValue={(state?.formData?.email as string) || undefined}
            required
          />
        </div>
        <InputFieldError field="email" state={state as IInputErrorState} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label
            htmlFor="phone"
            className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1"
          >
            Phone Number
          </Label>
          <div className="relative">
            <Phone className="absolute z-1 left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
            <Input
              id="phone"
              className="pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-slate-100"
              placeholder="+8801XXXXXXXXX"
              type="text"
              name="phone"
              defaultValue={(state?.formData?.phone as string) || undefined}
              required
            />
          </div>
          <InputFieldError field="phone" state={state as IInputErrorState} />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1"
          >
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute z-1 left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
            <Input
              id="password"
              className="pl-12 pr-12 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-slate-100"
              placeholder="Min. 6 characters"
              type={showPassword ? "text" : "password"}
              name="password"
              defaultValue={(state?.formData?.password as string) || undefined}
              required
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          <InputFieldError field="password" state={state as IInputErrorState} />
        </div>
      </div>
      <Field className="md:col-span-2 space-y-2  mb-3">
        <FieldLabel htmlFor="bio" className="flex items-center gap-2">
          Bio/About Me
        </FieldLabel>
        <Textarea
          placeholder="Tell us about your travel style and favorite adventures..."
          rows={4}
          id="bio"
          name="bio"
          defaultValue={state?.formData?.bio || undefined}
        />
      </Field>
      <div className="flex justify-between items-center gap-3">
        <Field className="space-y-1 gap-px w-1/2">
          <FieldLabel htmlFor="interests">Interests</FieldLabel>
          <FieldContent>
            <MultiSelect
              options={categories}
              onValueChange={(e) => {
                console.log(e);
                setInterests(
                  e.map((i) => {
                    const interest = categories.find((p) => p.value === i);
                    console.log({ interest });
                    return {
                      label: interest?.label || "",
                      value: interest?.value || "",
                    };
                  }),
                );
              }}
              value={interests.map((i) => i.value)}
              placeholder="Select interest..."
              searchPlaceholder="Search interest..."
              maxDisplayed={2}
              id="interests"
            />
          </FieldContent>
          <InputFieldError
            state={state as IInputErrorState}
            field="interests"
          />
        </Field>
        <div className="space-y-2 w-1/2">
          <Label htmlFor="preferredLanguage">Language</Label>
          <SearchableSelect
            options={languages.map((l) => ({
              label: l.nativeName,
              value: l.code,
            }))}
            onValueChange={(e) => {
              setPreferedLanguage(e);
            }}
            value={preferedLanguage}
            className="z-2000"
            id="preferredLanguage"
          />
          <InputFieldError
            state={state as IInputErrorState}
            field="preferedLanguage"
          />
        </div>
      </div>

      <div className="flex justify-between items-center gap-3">
        <Field className="space-y-1 gap-px">
          <FieldLabel htmlFor="gender">Gender</FieldLabel>
          <FieldContent>
            <Select value={gender} onValueChange={(v: Gender) => setGender(v)}>
              <SelectTrigger id="gender" className="w-full">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Gender).map((g) => (
                  <SelectItem key={g} value={g} className="capitalize">
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldContent>
          <InputFieldError state={state as IInputErrorState} field="gender" />
        </Field>
        <Field className="space-y-1 gap-px">
          <FieldLabel htmlFor="address">Address</FieldLabel>
          <FieldContent>
            <Input
              type="text"
              name="address"
              id="address"
              placeholder="City, Country"
              // defaultValue={isEdit ? tourist.user.address : undefined}
              defaultValue={
                state?.formData?.address || (false ? "tourist.city" : undefined)
              }
            />
          </FieldContent>
          <InputFieldError state={state as IInputErrorState} field="address" />
        </Field>
      </div>

      <div className="flex items-center space-x-2 py-1">
        <Checkbox
          id="terms"
          checked={agreedToTerms || state?.formData?.agree === "on"}
          name="agree"
          onCheckedChange={(checked) => setAgreedToTerms(Boolean(checked))}
        />
        <Label
          htmlFor="terms"
          className="text-xs text-slate-500 dark:text-slate-400 cursor-pointer leading-relaxed"
        >
          By signing up, you agree to our Terms of Service and Privacy Policy.
          We'll occasionally send you travel inspiration and updates.
        </Label>
      </div>

      <Button
        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
        type="submit"
        disabled={
          isPending || (!agreedToTerms && state?.formData?.agree !== "on")
        }
      >
        {isPending ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}
