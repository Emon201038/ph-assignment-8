import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SearchableSelect } from "@/components/ui/searchable-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IInputErrorState } from "@/lib/getInputFieldError";
import { unicodeToEmoji } from "@/lib/unicodeToEmoji";
import { createTour, updateTour } from "@/services/tour/tour.service";
import { Loader2, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import languages from "@/data/iso/languages.json";
import { toast } from "sonner";
import { ITour } from "@/interfaces/tour.interface";
import { TOUR_CATEGORIES } from "@/constants/user";

interface Country {
  id: number;
  name: string;
  iso2: string;
  emoji: string;
}

interface TourFormProps {
  tourData?: ITour;
  onSuccess?: () => void;
  onClose?: () => void;
}

const TourForm = ({ tourData, onSuccess, onClose }: TourFormProps) => {
  const isEdit = !!tourData;
  const [category, setCategory] = useState(tourData?.category || "");
  const [tourImage, setTourImage] = useState<File | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<
    { name: string; country_name: string }[]
  >([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(
    tourData?.city || ""
  );
  const [selectedCountry, setSelectedCountry] = useState<string | null>(
    tourData?.country || ""
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
    tourData?.language || ""
  );
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const action = !isEdit ? createTour : updateTour;
  const [state, formAction, isPending] = useActionState(action, null);

  useEffect(() => {
    const fetchContries = async () => {
      const res = await fetch(
        "https://country-state-city-nine.vercel.app/api/v1/country"
      );
      const data = await res.json();
      setCountries(data?.data);
    };

    fetchContries();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedCountry || !countries.length) return;

      const countryId = countries.find(
        (country) => country.name === selectedCountry
      )?.id;

      if (!countryId) return;

      const res = await fetch(
        `https://country-state-city-nine.vercel.app/api/v1/city/country/${countryId}`
      );
      const data = await res.json();

      setCities(data?.data || []);
    };

    fetchCities();
  }, [selectedCountry, countries]);

  useEffect(() => {
    if (!cities.length || !tourData?.city) return;

    const cityExists = cities.some((city) => city.name === tourData.city);

    if (cityExists) {
      setSelectedCity(tourData.city);
    }
  }, [cities, tourData]);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      if (formRef?.current) {
        formRef.current.reset();
      }

      if (fileInputRef?.current) {
        fileInputRef.current.value = "";
      }
      setTourImage(null);
      onSuccess?.();
      onClose?.();
    } else if (state && !state.success) {
      if (!state.errors || state.errors?.length === 0)
        toast.error(state.message);
      if (tourImage && fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(tourImage);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      {isEdit && tourData && (
        <input type="hidden" name="tourId" value={tourData._id} />
      )}
      <input type="hidden" name="category" value={category} />
      {/* <input type="hidden" name="country" value={selectedCountry as string} /> */}
      {/* <input type="hidden" name="city" value={selectedCity as string} /> */}
      <input type="hidden" name="language" value={selectedLanguage as string} />

      {/* Basic Information */}
      <div className="space-y-4">
        <Field>
          <FieldLabel>Tour Name *</FieldLabel>
          <Input
            name="title"
            placeholder="e.g. Historic City Walking Tour"
            defaultValue={
              state?.formData?.title || (isEdit ? tourData.title : undefined)
            }
          />
          <InputFieldError state={state as IInputErrorState} field="title" />
        </Field>

        <Field>
          <FieldLabel>Description *</FieldLabel>
          <Textarea
            name="description"
            placeholder="Describe what makes this tour special..."
            rows={4}
            defaultValue={
              state?.formData?.description ||
              (isEdit ? tourData.description : undefined)
            }
          />
          <InputFieldError
            state={state as IInputErrorState}
            field="description"
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel>Country *</FieldLabel>
            <Input
              name="country"
              placeholder="e.g. Japan"
              defaultValue={
                state?.formData?.country ||
                (isEdit ? tourData.country : undefined)
              }
            />
            <InputFieldError
              state={state as IInputErrorState}
              field="country"
            />
          </Field>
          <Field>
            <FieldLabel>City *</FieldLabel>
            <Input
              name="city"
              placeholder="e.g. Tokyo"
              defaultValue={
                state?.formData?.city || (isEdit ? tourData.city : undefined)
              }
            />
            <InputFieldError state={state as IInputErrorState} field="city" />
          </Field>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field className="relative">
            <FieldLabel>Language *</FieldLabel>
            <SearchableSelect
              options={languages
                .map((c) => ({
                  value: c.name,
                  label: c.name,
                }))
                .sort((a, b) => a.value.localeCompare(b.value))}
              value={selectedLanguage as string}
              onValueChange={(v) => {
                setSelectedLanguage(v);
              }}
            />
            <InputFieldError
              state={state as IInputErrorState}
              field="category"
            />
          </Field>

          <Field>
            <FieldLabel>Category *</FieldLabel>
            <Select
              name="category"
              value={category}
              onValueChange={setCategory}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {TOUR_CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
                <SelectItem value="cultural">Cultural</SelectItem>
                <SelectItem value="adventure">Adventure</SelectItem>
                <SelectItem value="food">Food & Culinary</SelectItem>
                <SelectItem value="leisure">Leisure</SelectItem>
                <SelectItem value="nature">Nature</SelectItem>
                <SelectItem value="history">History</SelectItem>
              </SelectContent>
            </Select>
            <InputFieldError
              state={state as IInputErrorState}
              field="category"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel>Price (USD) *</FieldLabel>
            <Input
              name="price"
              type="number"
              placeholder="89"
              min="0"
              defaultValue={
                state?.formData?.price || (isEdit ? tourData.price : undefined)
              }
            />
            <InputFieldError state={state as IInputErrorState} field="price" />
          </Field>

          {/* <Field>
            <FieldLabel>Duration *</FieldLabel>
            <Input
              name="duration"
              placeholder="e.g. 3 hours"
              defaultValue={
                state?.formData?.duration ||
                (isEdit ? tourData.duration : undefined)
              }
            />
            <InputFieldError
              state={state as IInputErrorState}
              field="duration"
            />
          </Field> */}
        </div>
      </div>

      {/* Tour Images */}
      <Field className="space-y-2 pt-4 gap-0">
        <FieldLabel className="text-sm text-muted-foreground">
          Upload images that represent your tour
        </FieldLabel>
        <InputFieldError state={state as IInputErrorState} field="image" />
        <Input
          type="file"
          accept="image/*"
          name="images"
          placeholder="Tour banner"
          onChange={(e) => setTourImage(e.target.files?.[0] as File)}
          multiple
          max={3}
        />
        {tourImage && (
          <div className="mt-2 flex items-center gap-2">
            <div className="h-30 w-full rounded-lg overflow-hidden relative">
              <Image
                src={URL.createObjectURL(tourImage)}
                alt="Tour banner"
                fill
                className="object-cover aspect-video"
              />
              <Button
                type="button"
                onClick={() => setTourImage(null)}
                variant={"outline"}
                size={"sm"}
                className="text-sm text-muted-foreground absolute top-1 right-1 hover:bg-primary-foreground/20 rounded-full size-6"
              >
                <X />
              </Button>
            </div>
          </div>
        )}
      </Field>

      {/* Additional Settings */}
      <div className="space-y-3 pt-4 border-t">
        <h3 className="font-semibold text-base">Additional Settings</h3>
        <FieldGroup className="space-y-2 gap-0">
          <Field orientation={"horizontal"}>
            <Checkbox
              id="active"
              name="isActive"
              className="rounded"
              defaultChecked={
                state?.formData?.isActive ||
                (isEdit ? tourData.isActive : false)
              }
            />
            <FieldLabel
              htmlFor="active"
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="text-sm">Active tour</span>
            </FieldLabel>
          </Field>
          <Field orientation={"horizontal"}>
            <Checkbox
              name="isFeatured"
              id="featured"
              className="rounded"
              defaultChecked={
                state?.formData?.isFeatured ||
                (isEdit ? tourData.isFeatured : false)
              }
            />
            <FieldLabel
              htmlFor="featured"
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="text-sm">Featured tour</span>
            </FieldLabel>
          </Field>
        </FieldGroup>
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-3 pt-4 border-t">
        <Button type="submit" size="lg" className="flex-1" disabled={isPending}>
          {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {isEdit ? "Update Tour" : "Create Tour"}
        </Button>
      </div>
    </form>
  );
};

export default TourForm;
