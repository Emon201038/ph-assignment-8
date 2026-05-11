"use client";

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
import { useState } from "react";

interface CurrencySelectProps {
  onChange?: (value: string | null) => void;
  value?: string | null;
  id?: string;
}

export function CurrencySelect({ onChange, value, id }: CurrencySelectProps) {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const loadCurrencies = async () => {
    if (loaded || loading) return;

    try {
      setLoading(true);

      const module = await import("@/constants/countries");

      setCurrencies(
        module.default.map((c) => c.currency).filter(Boolean) as string[],
      );

      setLoaded(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Combobox
      items={currencies}
      onValueChange={onChange}
      value={value}
      name="currency"
      itemToStringValue={(c) => c}
    >
      <ComboboxTrigger
        onClick={loadCurrencies}
        render={
          <Button
            variant="outline"
            className="w-full justify-between font-normal"
            role="combobox"
            id={id}
          >
            <ComboboxValue placeholder="Select Currency" />
          </Button>
        }
      />
      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder="Search" />
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item, idx) => (
            <ComboboxItem key={idx} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
