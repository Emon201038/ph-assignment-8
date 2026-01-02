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
import { Dialog, DialogContent } from "./dialog";
import { set } from "zod";

export interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: Option[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
  searchPlaceholder?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SearchableSelect({
  options,
  value,
  onValueChange,
  placeholder = "Select an option...",
  emptyText = "No results found.",
  searchPlaceholder = "Search...",
  className,
  disabled = false,
  id,
  open,
  onOpenChange,
}: SearchableSelectProps) {
  const [openPopover, setOpenPopover] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (openPopover) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [openPopover]);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover} modal={true}>
      <PopoverTrigger asChild id={id}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={openPopover}
          className={cn("w-full justify-between", className)}
          disabled={disabled}
        >
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-(--radix-popover-trigger-width) p-0 z-100"
        align="start"
      >
        <Command>
          <CommandInput
            ref={inputRef}
            placeholder={searchPlaceholder}
            autoFocus
          />
          <CommandList className="max-h-75 overflow-y-auto">
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onValueChange?.(currentValue === value ? "" : currentValue);
                    setOpenPopover(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
