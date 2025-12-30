"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, ChevronsUpDown, Filter } from "lucide-react";
import { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  values: Option[];
  onChange: (value: Option) => void;
  options: Option[];
  placeholder?: string;
  emptyText?: string;
  searchPlaceholder?: string;
  className?: string;
  disabled?: boolean;
  maxSelected?: number;
  maxDisplayed?: number;
  id?: string;
}

function MultiSelect({
  onChange,
  options,
  values,
  className,
  disabled,
  emptyText,
  id,
  maxDisplayed,
  maxSelected,
  placeholder,
  searchPlaceholder,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-60 justify-between h-10"
        >
          <Filter className="mr-2 h-4 w-4" />
          {values.length > 0 ? `${values.length} selected` : "Select interests"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search interests..." />
          <CommandList>
            <CommandEmpty>No specialty found.</CommandEmpty>
            <CommandGroup>
              {options.map((i, index) => {
                const isSelected = values.includes(i);
                return (
                  <CommandItem
                    key={index}
                    value={i.value as string}
                    onSelect={() => onChange(i)}
                    className={isSelected ? "bg-accent" : ""}
                  >
                    <Checkbox checked={isSelected} className="mr-2" />
                    <span className={isSelected ? "font-medium" : ""}>
                      {i.label}
                    </span>
                    {isSelected && (
                      <Check className="ml-auto h-4 w-4 text-primary" />
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
          {/* <div className="p-2 border-t">
            <Button
              onClick={applyToggleInterestsFilter}
              className="w-full"
              size="sm"
              disabled={isPending}
            >
              Apply Filter
            </Button>
          </div> */}
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default MultiSelect;
