"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
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
import { useDebounce } from "@/hooks/useDebounce";
import { ITour } from "@/interfaces/tour.interface";
import Image from "next/image";
import { serverFetch } from "@/lib/server-fetch";

interface TourSearchSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
}

export function TourSearchSelect({
  value,
  onValueChange,
  placeholder = "Select a tour...",
  searchPlaceholder = "Search tours...",
  className,
  disabled = false,
  id,
}: TourSearchSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [options, setOptions] = React.useState<ITour[]>([]);
  const [selected, setSelected] = React.useState<ITour | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // ✅ Fetch selected tour (only if not already loaded)
  React.useEffect(() => {
    const fetchSelected = async () => {
      if (!value) {
        setSelected(null);
        return;
      }

      if (selected?.id === value) return;

      try {
        const res = await serverFetch.get(`/v2/tours/${value}`);
        const data = await res.json();

        if (data?.success) {
          setSelected(data.data);
        }
      } catch (error) {
        console.error("Error fetching selected tour:", error);
      }
    };

    fetchSelected();
  }, [value]);

  // ✅ Fetch tours list (search + initial load)
  React.useEffect(() => {
    if (!open) return;

    const fetchTours = async () => {
      setIsLoading(true);

      try {
        const query = debouncedSearchQuery
          ? `?searchTerm=${debouncedSearchQuery}`
          : "?limit=10";

        const res = await serverFetch.get(`/v2/tours${query}`);
        const data = await res.json();

        if (!data?.success) {
          setOptions([]);
          return;
        }

        const newTours = data.data as ITour[];

        setOptions((prev) => {
          // keep selected in list if missing
          if (selected && !newTours.some((t) => t.id === selected.id)) {
            return [selected, ...newTours];
          }

          return newTours;
        });
      } catch (error) {
        console.error("Error fetching tours:", error);
        setOptions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTours();
  }, [debouncedSearchQuery, open, selected]);

  // ✅ Handle open/close behavior
  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setSearchQuery("");
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild id={id}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select tour"
          className={cn("w-full justify-between", className)}
          disabled={disabled}
        >
          <span className="truncate">
            {selected ? selected.title : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
        sideOffset={5}
        style={{ zIndex: 9999 }}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          inputRef.current?.focus();
        }}
      >
        <Command shouldFilter={false}>
          <CommandInput
            ref={inputRef}
            placeholder={searchPlaceholder}
            value={searchQuery}
            onValueChange={setSearchQuery}
          />

          <CommandList className="max-h-75 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : options.length === 0 ? (
              <CommandEmpty>
                {searchQuery
                  ? "No tours found."
                  : "Start typing to search tours..."}
              </CommandEmpty>
            ) : (
              <CommandGroup>
                {options.map((tour) => (
                  <CommandItem
                    key={tour.id}
                    value={tour.id}
                    onSelect={(currentValue) => {
                      const selectedTour = options.find(
                        (t) => t.id === currentValue,
                      );

                      setSelected(selectedTour || null);
                      onValueChange?.(
                        currentValue === value ? "" : currentValue,
                      );
                      setOpen(false);
                    }}
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <Check
                      className={cn(
                        "h-4 w-4",
                        value === tour.id ? "opacity-100" : "opacity-0",
                      )}
                    />

                    <Image
                      src={tour.image || "/placeholder.png"}
                      alt={tour.title}
                      width={32}
                      height={32}
                      className="rounded object-cover"
                    />

                    <span className="truncate">{tour.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
