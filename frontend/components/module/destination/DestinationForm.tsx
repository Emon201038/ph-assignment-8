"use client";

import { CitySelect } from "@/components/shared/CitySelect";
import { ContinentSelect } from "@/components/shared/ContinentSelect";
import { CountrySelect } from "@/components/shared/CountrySelect";
import { CurrencySelect } from "@/components/shared/CurrencySelect";
import { LanguagesSelect } from "@/components/shared/LanguagesSelect";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect } from "react";

type Props = {};
interface Country {
  name: string;
  iso2: string;
  iso3: string;
  flag: string;
  continent: string;
  currency: string;
}

const DestinationForm = ({}: Props) => {
  const [selectedContinent, setSelectedContinent] = React.useState<
    string | null
  >(null);
  const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(
    null,
  );
  const [selectedCity, setSelectedCity] = React.useState<string | null>(null);
  const [currency, setCurrency] = React.useState<string | null>(null);
  const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>(
    [],
  );

  useEffect(() => {
    if (selectedCountry) {
      setCurrency(selectedCountry.currency);
    }
  }, [selectedCountry]);
  return (
    <form className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <Field>
          <FieldLabel htmlFor="name">Name *</FieldLabel>
          <FieldContent>
            <Input id="name" name="name" placeholder="Enter destination name" />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="continent">Continent *</FieldLabel>
          <FieldContent>
            <ContinentSelect
              id="continent"
              value={selectedContinent}
              onChange={(value) => {
                setSelectedContinent(value);
              }}
            />
          </FieldContent>
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
                console.log(c);
              }}
              continent={selectedContinent ?? undefined}
              filterByContinent={true}
            />
          </FieldContent>
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
                console.log(c);
                setSelectedCity(c);
              }}
            />
          </FieldContent>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field>
          <FieldLabel htmlFor="description">Description *</FieldLabel>
          <FieldContent>
            <Textarea
              rows={3}
              id="description"
              name="description"
              placeholder="Enter destination description"
            />
          </FieldContent>
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
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field>
          <FieldLabel htmlFor="languages">Languages *</FieldLabel>
          <FieldContent>
            <LanguagesSelect
              id="languages"
              value={selectedLanguages}
              onChange={(languages) => {
                setSelectedLanguages(languages);
              }}
            />
          </FieldContent>
        </Field>
      </div>
    </form>
  );
};

export default DestinationForm;
