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
import { continents } from "@/constants/data";

interface ContinentSelectProps {
  onChange?: (value: string | null) => void;
  value?: string | null;
  id?: string;
}

export function ContinentSelect({ onChange, value, id }: ContinentSelectProps) {
  return (
    <Combobox
      items={continents}
      onValueChange={onChange}
      value={value}
      name="continent"
      itemToStringValue={(c) => c}
    >
      <ComboboxTrigger
        render={
          <Button
            variant="outline"
            className="w-full justify-between font-normal"
            role="combobox"
            id={id}
          >
            <ComboboxValue placeholder="Select Continent" />
          </Button>
        }
      />
      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder="Search" />
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
