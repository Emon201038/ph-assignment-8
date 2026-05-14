"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";

import { Loader2 } from "lucide-react";

interface Country {
  name: string;
  iso2: string;
  iso3: string;
  flag: string;
  continent: string;
  currency: string;
}

interface CountrySelectProps {
  onChange?: (value: Country | null) => void;
  value?: Country | null;
  id?: string;
  placeholder?: string;
  continent?: string;
  filterByContinent?: boolean;
  defaultValue?: Country | null;
}

export function CountrySelect({
  onChange,
  value,
  id,
  placeholder,
  continent,
  filterByContinent = false,
  defaultValue,
}: CountrySelectProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const filteredCountries = useMemo(() => {
    if (!filterByContinent) {
      return countries;
    }

    if (!continent) {
      return [];
    }

    return countries.filter((country) => country.continent === continent);
  }, [continent, filterByContinent, countries]);

  const loadCountries = async () => {
    if (loaded || loading) return;

    try {
      setLoading(true);

      const module = await import("@/constants/countries");

      console.log(module.default);
      setCountries(module.default);

      setLoaded(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Combobox
      items={filteredCountries}
      onValueChange={(v) => onChange?.(v)}
      defaultValue={defaultValue || value}
      itemToStringValue={(c) => c.name}
      name="country"
    >
      <ComboboxTrigger
        onClick={loadCountries}
        render={
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between font-normal"
            id={id}
          >
            {value ? (
              <div className="flex items-center gap-2 truncate">
                <Image
                  src={value.flag}
                  alt={value.name}
                  width={20}
                  height={15}
                  className="rounded-sm object-cover"
                />

                <span className="truncate">{value.name}</span>
              </div>
            ) : (
              <ComboboxValue
                placeholder={placeholder || "Select a country..."}
              />
            )}

            {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        }
      />

      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder="Search country..." />

        {loading ? (
          <div className="p-4 flex items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : (
          <>
            <ComboboxEmpty>No items found.</ComboboxEmpty>

            <ComboboxList>
              {(country: Country) => (
                <ComboboxItem key={country.iso3} value={country}>
                  <Image
                    src={country.flag?.trimStart()}
                    alt={country.name}
                    width={20}
                    height={15}
                    className="inline mr-2 rounded-sm"
                  />

                  {country.name}
                </ComboboxItem>
              )}
            </ComboboxList>
          </>
        )}
      </ComboboxContent>
    </Combobox>
  );
}
