"use client";

import * as React from "react";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { transportations } from "@/constants/data";

type Props = {
  onChange?: (value: React.SetStateAction<string[]>) => void;
  value?: string[];
  id?: string;
  name?: string;
  placeholder?: string;
};

const TransportationSelect = ({
  onChange,
  value,
  id,
  name = "transportations",
  placeholder = "Select transportations",
}: Props) => {
  const anchor = useComboboxAnchor();

  return (
    <Combobox
      onValueChange={(v) =>
        onChange?.((prev: string[]) => {
          if (v.length > 4) {
            return prev;
          } else {
            return v;
          }
        })
      }
      multiple
      autoHighlight
      items={transportations}
      value={value}
      name={name}
    >
      <ComboboxChips
        id={id}
        ref={anchor}
        onClick={() => anchor.current?.focus?.()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            anchor.current?.focus?.();
          }
        }}
        className="w-full max-w-xs"
      >
        <ComboboxValue placeholder={placeholder}>
          {(values: string[]) => {
            if (!values || values.length === 0) {
              return (
                <span className="text-muted-foreground">{placeholder}</span>
              );
            }

            return (
              <>
                {values.map((value: string) => (
                  <ComboboxChip key={value}>{value}</ComboboxChip>
                ))}
                <ComboboxChipsInput />
              </>
            );
          }}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
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
};

export default TransportationSelect;
