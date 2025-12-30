"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect, useRef, useState } from "react";
import { Gender, IUser } from "@/interfaces/user.interface";
import { toast } from "sonner";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import InputFieldError from "@/components/shared/InputFieldError";
import { IInputErrorState } from "@/lib/getInputFieldError";
import { generateStrongPassword } from "@/lib/generate-password";
import { MultiSelect } from "@/components/ui/multi-select";
import { IGuide } from "@/interfaces/guide.interface";
import { createGuide, editGuide } from "@/services/guide/guide.service";
import { GUIDE_EXPERTISE } from "@/constants/user";
import allLanguages from "@/data/iso/languages.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

interface IGuideForm {
  onClose?: (e: boolean) => void;
  onSuccess?: () => void;
  guide?: IUser<IGuide>;
  isSignUp?: boolean;
}

const GuideForm = ({ guide, isSignUp, onClose, onSuccess }: IGuideForm) => {
  const isEdit = !!guide;
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [languages, setlanguages] = useState<string[]>(
    guide?.profile?.languages || []
  );
  const [expertise, setExpertise] = useState<string[]>(
    guide?.profile?.expertise || []
  );
  const [gender, setGender] = useState<Gender>(guide?.gender || Gender.MALE);

  const [state, createguide, isLoading] = useActionState(
    isEdit ? editGuide.bind(null, guide._id) : createGuide,
    null
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      if (formRef?.current) {
        formRef.current.reset();
      }

      if (fileInputRef?.current) {
        fileInputRef.current.value = "";
      }
      setImage(null);
      onSuccess?.();
      onClose?.(true);
    } else if (state && !state.success) {
      if ((state.errors && state.errors?.length === 0) || !state.errors)
        toast.error(state.message);
      if (image && fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(image);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={createguide}
      className="space-y-4 overflow-x-hidden"
    >
      <input type="hidden" name="isSignUp" value={isSignUp?.toString()} />
      <input type="hidden" name="expertise" value={expertise || null} />
      <input type="hidden" name="gender" value={gender} />
      <input type="hidden" name="languages" value={languages} />
      <Field className="space-y-1 gap-px">
        <FieldLabel htmlFor="name">Full Name</FieldLabel>
        <FieldContent>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            name="name"
            defaultValue={
              state?.formData?.name || (isEdit ? guide.name : undefined)
            }
          />
        </FieldContent>
        <InputFieldError state={state as IInputErrorState} field="name" />
      </Field>
      <Field className="space-y-1 gap-px">
        <FieldLabel htmlFor="bio">Bio</FieldLabel>
        <FieldContent>
          <Textarea
            id="bio"
            placeholder="Explain yourself"
            name="bio"
            defaultValue={
              state?.formData?.bio || (isEdit ? guide.bio : undefined)
            }
          />
        </FieldContent>
        <InputFieldError state={state as IInputErrorState} field="bio" />
      </Field>
      <div className="flex justify-between items-center gap-3">
        <Field className="space-y-1 gap-px">
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <FieldContent>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              name="email"
              // defaultValue={isEdit ? guide?.user.email : undefined}
              defaultValue={
                state?.formData?.email || (isEdit ? guide?.email : undefined)
              }
              disabled={isEdit}
            />
          </FieldContent>
          <InputFieldError state={state as IInputErrorState} field="email" />
        </Field>
        <Field className="space-y-1 gap-px">
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <FieldContent>
            <Input
              id="phone"
              placeholder="+8801*********"
              name="phone"
              // defaultValue={isEdit ? guide.user.phone : undefined}
              defaultValue={
                state?.formData?.phone || (isEdit ? guide.phone : undefined)
              }
            />
          </FieldContent>
          <InputFieldError state={state as IInputErrorState} field="phone" />
        </Field>
      </div>
      {!isEdit && (
        <Field className="space-y-1 gap-px">
          <div className="flex justify-between items-center w-full">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <p
              onClick={() => {
                setPassword(generateStrongPassword(8));
              }}
              className="text-sm text-primary underline cursor-pointer"
            >
              Generate password
            </p>
          </div>
          <FieldContent>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FieldContent>
          <InputFieldError state={state as IInputErrorState} field="password" />
        </Field>
      )}
      <div className="flex justify-between items-center gap-3">
        <Field className="space-y-1 gap-px w-1/2">
          <FieldLabel htmlFor="expertise">Expertise</FieldLabel>
          <FieldContent>
            <MultiSelect
              options={GUIDE_EXPERTISE}
              onValueChange={(e) => setExpertise(e)}
              value={expertise}
              placeholder="Select expertise..."
              searchPlaceholder="Search expertise..."
              maxDisplayed={2}
              id="expertise"
            />
          </FieldContent>
          <InputFieldError
            state={state as IInputErrorState}
            field="expertise"
          />
        </Field>
        <div className="space-y-2 w-1/2">
          <Label htmlFor="languages">Languages</Label>
          <MultiSelect
            options={allLanguages.map((l) => ({
              label: l.nativeName,
              value: l.code,
            }))}
            onValueChange={(e) => {
              console.log(e);
              setlanguages(e);
            }}
            value={languages}
            className="z-2000"
            id="languages"
          />
          <InputFieldError
            state={state as IInputErrorState}
            field="languages"
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
              placeholder="City, State, Country"
              // defaultValue={isEdit ? guide.user.address : undefined}
              defaultValue={
                state?.formData?.address || (isEdit ? guide.address : undefined)
              }
            />
          </FieldContent>
          <InputFieldError state={state as IInputErrorState} field="address" />
        </Field>
      </div>

      <div className="flex justify-between items-center gap-3">
        <Field className="space-y-1 gap-px">
          <FieldLabel htmlFor="hourlyRate">Hourly Rate ($)</FieldLabel>
          <FieldContent>
            <Input
              type="number"
              name="hourlyRate"
              id="hourlyRate"
              placeholder="Hourly Rate in USD"
              defaultValue={
                state?.formData?.hourlyRate ||
                (isEdit ? guide.profile.hourlyRate : undefined)
              }
            />
          </FieldContent>
          <InputFieldError
            state={state as IInputErrorState}
            field="hourlyRate"
          />
        </Field>
        <Field className="space-y-1 gap-px">
          <FieldLabel htmlFor="experienceYears">Experience (year)</FieldLabel>
          <FieldContent>
            <Input
              type="number"
              name="experienceYears"
              id="experienceYears"
              placeholder="Experience in year"
              defaultValue={
                state?.formData?.experienceYears ||
                (isEdit ? guide.profile.experienceYears : undefined)
              }
            />
          </FieldContent>
          <InputFieldError
            state={state as IInputErrorState}
            field="experienceYears"
          />
        </Field>
      </div>

      {!isEdit && (
        <div className="space-y-2">
          <div className="flex justify-between items-center w-full">
            <Label htmlFor="image">Profile Photo</Label>
            {image && (
              <div
                onClick={() => {
                  setImage(null);
                }}
                className="text-sm cursor-pointer"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </div>
            )}
          </div>
          <Input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target!.files![0] || null)}
            ref={fileInputRef}
          />
          {image && (
            <div className="w-full flex justify-center items-center">
              <Image
                src={URL.createObjectURL(image)}
                alt="profile"
                width={100}
                height={100}
                className="rounded-full aspect-square"
              />
            </div>
          )}
          <InputFieldError state={state as IInputErrorState} field="image" />
        </div>
      )}
      <Button type="submit" disabled={isLoading} className="mt-4 w-full">
        {isEdit ? "Update" : " Create"}
      </Button>
    </form>
  );
};

export default GuideForm;
