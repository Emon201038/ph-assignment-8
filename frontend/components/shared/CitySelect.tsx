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

interface CitySelectProps {
  onChange?: (value: string | null) => void;
  value?: string | null;
  id?: string;
  placeholder?: string;
  country: string | null;
}

export function CitySelect({
  onChange,
  value,
  id,
  placeholder,
  country,
}: CitySelectProps) {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const loadCities = async () => {
    if (loaded || loading || !country) return;

    try {
      setLoading(true);

      const module = await import("@/constants/cities");

      setCities(module.getCities(country));

      setLoaded(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Combobox
      items={cities}
      onValueChange={(v) => onChange?.(v)}
      value={value}
      itemToStringValue={(c) => c}
      name="city"
    >
      <ComboboxTrigger
        onClick={loadCities}
        render={
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between font-normal"
            id={id}
          >
            <ComboboxValue placeholder={placeholder || "Select a city..."} />

            {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        }
      />

      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder="Search city..." />

        {loading ? (
          <div className="p-4 flex items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : (
          <>
            <ComboboxEmpty>No items found.</ComboboxEmpty>

            <ComboboxList>
              {(city) => (
                <ComboboxItem key={city} value={city}>
                  {city}
                </ComboboxItem>
              )}
            </ComboboxList>
          </>
        )}
      </ComboboxContent>
    </Combobox>
  );
}
