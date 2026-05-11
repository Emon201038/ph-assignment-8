"use client";

import * as React from "react";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { languages } from "@/constants/data";

interface LanguagesSelectProps {
  onChange?: (value: string[]) => void;
  value?: string[];
  id?: string;
}

export function LanguagesSelect({ onChange, value, id }: LanguagesSelectProps) {
  const anchor = useComboboxAnchor();

  return (
    <Combobox
      onValueChange={(v) => {
        if (value && value.length === 4) {
          return;
        } else {
          onChange?.(v.filter((i) => i !== "Select a languages"));
        }
      }}
      multiple
      autoHighlight
      items={languages}
      value={value}
      defaultValue={["Select a languages"]}
    >
      <ComboboxChips ref={anchor} className="w-full max-w-xs">
        <ComboboxValue placeholder="Select languages">
          {(values: string[]) => (
            <React.Fragment>
              {values.map((value: string) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
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
