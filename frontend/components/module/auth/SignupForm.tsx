"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { TOURIST_PREFERENCES } from "@/constants/user";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { generateStrongPassword } from "@/lib/generate-password";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import InputFieldError from "@/components/shared/InputFieldError";
import { ITour } from "@/interfaces/tour.interface";
import { useActionState, useEffect, useRef, useState } from "react";
import { createTouristAction } from "@/action/user";
import { toast } from "sonner";
import { IInputErrorState } from "@/lib/getInputFieldError";
import { Gender, ITourist } from "@/interfaces/user.interface";
import { signUpAction } from "@/app/(auth)/register/action";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SignupFormProps {
  onClose?: (e: boolean) => void;
  onSuccess?: () => void;
  tourist?: ITourist;
  isSignUp?: boolean;
}

const SignupForm = ({
  tourist,
  onClose,
  onSuccess,
  isSignUp = true,
}: SignupFormProps) => {
  const isEdit = !!tourist;
  const formRef = useRef<HTMLFormElement>(null);
  const [languages, setLanguages] = useState<
    { code: string; name: string; nativeName: string }[]
  >([]);
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preferedLanguage, setPreferedLanguage] = useState<string>(
    tourist?.preferredLanguage || ""
  );
  const [interests, setInterests] = useState<string[]>(
    tourist?.interests || []
  );
  const [gender, setGender] = useState<Gender>(
    tourist?.user.gender || Gender.MALE
  );

  const [state, createTourist, isLoading] = useActionState(signUpAction, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      if (formRef?.current) {
        formRef.current.reset();
      }

      onSuccess?.();
      onClose?.(true);
    } else if (state && !state.success) {
      console.log(state);
      if (state.errors && state.errors?.length === 0)
        toast.error(state.message);
    }
  }, [state]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/lookup/languages`
        );
        const data: {
          success: boolean;
          message: string;
          data: { code: string; name: string; nativeName: string }[];
        } = await res.json();

        if (data.success) {
          setLanguages(data.data);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to fetch languages");
      }
    };

    fetchLanguages();
  }, []);

  return (
    <form
      ref={formRef}
      action={createTourist}
      className="space-y-4 overflow-x-hidden"
    >
      <input type="hidden" name="isSignUp" value={isSignUp.toString()} />
      <input type="hidden" name="interests" value={interests} />
      <input type="hidden" name="gender" value={gender} />
      <input type="hidden" name="preferedLanguage" value={preferedLanguage} />
      <Field className="space-y-1 gap-px">
        <FieldLabel htmlFor="name">Full Name</FieldLabel>
        <FieldContent>
          <Input id="name" type="text" placeholder="John Doe" name="name" />
        </FieldContent>
        <InputFieldError state={state as IInputErrorState} field="name" />
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
              defaultValue={isEdit ? tourist.user.phone : ""}
            />
          </FieldContent>
          <InputFieldError state={state as IInputErrorState} field="phone" />
        </Field>
      </div>
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
      <div className="flex justify-between items-center gap-3">
        <Field className="space-y-1 gap-px w-1/2">
          <FieldLabel htmlFor="interests">Interests</FieldLabel>
          <FieldContent>
            <MultiSelect
              options={TOURIST_PREFERENCES}
              onValueChange={(e) => setInterests(e)}
              value={interests}
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
          <Label htmlFor="interests">Language</Label>
          <SearchableSelect
            options={languages.map((l) => ({
              label: l.nativeName,
              value: l.code,
            }))}
            onValueChange={(e) => {
              console.log(e);
              setPreferedLanguage(e);
            }}
            value={preferedLanguage}
            className="z-2000"
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
              placeholder="City, State, Country"
            />
          </FieldContent>
          <InputFieldError state={state as IInputErrorState} field="address" />
        </Field>
      </div>

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
      <Button type="submit" disabled={isLoading} className="mt-4 w-full">
        Create
      </Button>
    </form>
  );
};

export default SignupForm;
