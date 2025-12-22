"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "./scroll-area";

interface SearchableSelectProps {
  onValueChange: (value: string) => void;
  defaultValue?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  emptyMessage?: string;
}

export function SearchableSelect({
  options,
  onValueChange,
  defaultValue,
  emptyMessage = "No data found!",
  placeholder = "Select an option",
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (defaultValue) {
      setValue(options.find((v) => v.value === defaultValue)?.value || "");
    }
  }, [defaultValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between text-ellipsis min-w-40"
        >
          <p className=" text-ellipsis">
            {value
              ? options.find((v) => v.value === value)?.label
              : placeholder}
          </p>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command
          onValueChange={onValueChange}
          className="max-h-60 overflow-y-auto"
        >
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((v) => (
                <CommandItem
                  key={v.value}
                  value={v.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {v.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === v.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
