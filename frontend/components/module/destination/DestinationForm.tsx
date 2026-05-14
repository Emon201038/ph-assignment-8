"use client";

import { CitySelect } from "@/components/shared/CitySelect";
import { ContinentSelect } from "@/components/shared/ContinentSelect";
import { CountrySelect } from "@/components/shared/CountrySelect";
import { CurrencySelect } from "@/components/shared/CurrencySelect";
import { LanguagesSelect } from "@/components/shared/LanguagesSelect";
import MonthSelect from "@/components/shared/MonthSelect";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useActionState, useEffect } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { createDestination } from "@/services/destination/destination.service";
import { IDestination } from "@/interfaces/destination.interface";
import TransportationSelect from "@/components/shared/TransportationSelect";
import { toast } from "sonner";
import InputFieldError from "@/components/shared/InputFieldError";
import { IInputErrorState } from "@/lib/getInputFieldError";
import { useRouter } from "next/navigation";

type Props = {
  destination?: IDestination;
};
interface Country {
  name: string;
  iso2: string;
  iso3: string;
  flag: string;
  continent: string;
  currency: string;
}

const DestinationForm = ({ destination }: Props) => {
  const isEditMode = !!destination;
  const [selectedContinent, setSelectedContinent] = React.useState<
    string | null
  >(null);
  const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(
    null,
  );
  const [selectedCity, setSelectedCity] = React.useState<string | null>(null);
  const [currency, setCurrency] = React.useState<string | null>(null);
  const [image, setImage] = React.useState<File | null>(null);
  const [location, setLocation] = React.useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [state, createDestinationAction, isLoading] = useActionState(
    createDestination,
    null,
  );

  const router = useRouter();

  useEffect(() => {
    if (selectedCountry) {
      setCurrency(selectedCountry.currency);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (state && state.success) {
      toast.success(
        `Destination ${isEditMode ? "updated" : "created"} successfully`,
      );
      router.push("/admin/dashboard/destinations-management");
    } else if (state && !state.success && state.errors?.length === 0) {
      toast.error(state.message || "Something went wrong");
    }
  }, [state, router, isEditMode]);

  useEffect(() => {
    if (state && !state.success && image && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(image);
      fileInputRef.current.files = dataTransfer.files;
    }
  }, [state, image]);

  const handleFileRemove = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleGetLocation = async () => {
    try {
      setIsLoadingLocation(true);
      if (!selectedCity || !selectedCountry) {
        toast.warning("Please select country and city first");
        return;
      }

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${selectedCity}&country=${selectedCountry.name}&format=json`,
      );
      const data = await res.json();
      if (data && data.length > 0) {
        setLocation({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        });
      } else {
        toast.error(
          "Location not found. Please select different city or country",
        );
      }
    } catch (error) {
      toast.error("Failed to fetch location");
    } finally {
      setIsLoadingLocation(false);
    }
  };

  console.log(destination);

  return (
    <form className="space-y-5" action={createDestinationAction}>
      <div className="grid grid-cols-2 gap-3">
        <Field>
          <FieldLabel htmlFor="name">Name *</FieldLabel>
          <FieldContent>
            <Input
              defaultValue={
                (state?.formData?.name as string) ||
                (isEditMode ? destination?.name : undefined)
              }
              id="name"
              name="name"
              placeholder="Enter destination name"
            />
          </FieldContent>
          <InputFieldError state={state as IInputErrorState} field="name" />
        </Field>
        <Field>
          <FieldLabel htmlFor="continent">Continent *</FieldLabel>
          <FieldContent>
            <ContinentSelect
              id="continent"
              value={selectedContinent}
              defaultValue={
                (state?.formData?.continent as string) ||
                (isEditMode ? destination?.continent : undefined)
              }
              onChange={(value) => {
                setSelectedContinent(value);
                setSelectedCountry(null);
                setSelectedCity(null);
              }}
            />
          </FieldContent>
          <InputFieldError
            state={state as IInputErrorState}
            field="continent"
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field>
          <FieldLabel htmlFor="country">Country *</FieldLabel>
          <FieldContent>
            <CountrySelect
              id="country"
              placeholder={
                selectedContinent ? "Select Country" : "Select Continent first"
              }
              value={selectedCountry}
              onChange={(c) => {
                setSelectedCountry(c);
                setSelectedCity(null);
              }}
              continent={selectedContinent ?? undefined}
              filterByContinent={true}
            />
          </FieldContent>
          <InputFieldError state={state as IInputErrorState} field="country" />
        </Field>
        <Field>
          <FieldLabel htmlFor="city">City *</FieldLabel>
          <FieldContent>
            <CitySelect
              id="city"
              country={selectedCountry?.name as string | null}
              placeholder={
                selectedCountry?.name ? "Select City" : "Select Country first"
              }
              value={selectedCity}
              onChange={(c) => {
                setSelectedCity(c);
                setLocation(null);
              }}
            />
          </FieldContent>
          <InputFieldError state={state as IInputErrorState} field="city" />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field>
          <FieldLabel htmlFor="description">Description *</FieldLabel>
          <FieldContent>
            <Textarea
              rows={3}
              id="description"
              defaultValue={
                (state?.formData?.description as string) ||
                (isEditMode ? destination?.description : undefined)
              }
              name="description"
              placeholder="Enter destination description"
            />
          </FieldContent>
          <InputFieldError
            state={state as IInputErrorState}
            field="description"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="currency">Currency *</FieldLabel>
          <FieldContent>
            <CurrencySelect
              id="currency"
              value={currency}
              onChange={(c) => {
                setCurrency(c);
              }}
            />
          </FieldContent>
          <InputFieldError state={state as IInputErrorState} field="currency" />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field>
          <FieldLabel htmlFor="languages">Languages *</FieldLabel>
          <FieldContent>
            <LanguagesSelect id="languages" />
          </FieldContent>
          <InputFieldError
            state={state as IInputErrorState}
            field="languages"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="bestSeason">Best Seasons *</FieldLabel>
          <FieldContent>
            <MonthSelect id="bestSeason" name="bestSeason" />
          </FieldContent>
          <InputFieldError
            state={state as IInputErrorState}
            field="bestSeason"
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field>
          <FieldLabel htmlFor="transportation">Transportation *</FieldLabel>
          <FieldContent>
            <TransportationSelect id="transportation" name="transportation" />
          </FieldContent>
          <InputFieldError
            state={state as IInputErrorState}
            field="transportation"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="lat_lng">Latitude, Longitude *</FieldLabel>
          <FieldContent className="flex flex-row gap-1">
            <Input readOnly name="lat" value={location?.lat || ""} />
            <Input readOnly name="lng" value={location?.lng || ""} />
            <Button
              disabled={
                !selectedCity || !selectedCountry?.name || isLoadingLocation
              }
              type="button"
              onClick={handleGetLocation}
            >
              {isLoadingLocation ? "Getting Location..." : "Get Location"}
            </Button>
          </FieldContent>
          <div className="w-full flex gap-2 items-center">
            <InputFieldError state={state as IInputErrorState} field="lat" />
            <InputFieldError state={state as IInputErrorState} field="lng" />
          </div>
        </Field>
      </div>
      <Field>
        <FieldLabel htmlFor="image">Image *</FieldLabel>
        <div>
          {image && (
            <div className="flex gap-1 relative w-full h-64 overflow-hidden">
              <Image
                src={URL.createObjectURL(image)}
                alt={image.name}
                className="aspect-video object-cover mb-3 rounded-md"
                width={400}
                height={128}
              />
              <Button
                variant={"ghost"}
                className="group"
                onClick={handleFileRemove}
              >
                <Trash2 className="h-4 w-4 text-destructive group-hover:text-white" />
              </Button>
            </div>
          )}
        </div>
        <FieldContent>
          <Input
            ref={fileInputRef}
            onChange={(e) => setImage(e.target.files?.[0] as File | null)}
            type="file"
            id="image"
            name="image"
            accept="image/*"
          />
        </FieldContent>
        <InputFieldError state={state as IInputErrorState} field="image" />
      </Field>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default DestinationForm;
