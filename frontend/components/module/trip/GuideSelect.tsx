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
import { IGuide } from "@/interfaces/guide.interface";
import Image from "next/image";
import { getGuides, getSingleGuide } from "@/services/guide/guide.service";
import { IUser } from "@/interfaces/user.interface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Guide {
  id: string;
  title: string;
}

interface GuideSearchSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
}

export function GuideSearchSelect({
  value,
  onValueChange,
  placeholder = "Select a tour...",
  searchPlaceholder = "Search guides...",
  className,
  disabled = false,
  id,
}: GuideSearchSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [guides, setGuides] = React.useState<IUser<IGuide>[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  React.useEffect(() => {
    const fetchGuide = async () => {
      const data = await getSingleGuide(value!);
      if (!data?.success) {
        setGuides([]);
        return;
      }
      setGuides([data.data?.userId]); // Adjust based on your API response structure
    };
    if (value && !guides.some((guide) => guide._id === value)) {
      fetchGuide();
    }
  }, []);

  // Fetch guides based on search query
  React.useEffect(() => {
    const fetchGuides = async () => {
      if (!open) return;

      setIsLoading(true);
      try {
        const data = await getGuides("searchTerm=" + debouncedSearchQuery);
        if (!data?.success) {
          setGuides([]);
          return;
        }
        setGuides(data.data); // Adjust based on your API response structure
      } catch (error) {
        console.error("Error fetching guides:", error);
        setGuides([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuides();
  }, [debouncedSearchQuery, open]);

  // Load initial guides when popover opens
  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setSearchQuery("");
    }
  }, [open]);

  const selectedGuide = guides.find((tour) => tour._id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild id={id}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          disabled={disabled}
        >
          <span className="truncate">
            {selectedGuide ? selectedGuide.name : placeholder}
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
          <CommandList className="max-h-[300px] overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : guides.length === 0 ? (
              <CommandEmpty>
                {searchQuery
                  ? "No guides found."
                  : "Start typing to search guides..."}
              </CommandEmpty>
            ) : (
              <CommandGroup>
                {guides.map((guide) => (
                  <CommandItem
                    key={guide._id}
                    value={guide._id}
                    onSelect={(currentValue) => {
                      onValueChange?.(
                        currentValue === value ? "" : currentValue
                      );
                      setOpen(false);
                    }}
                    className="cursor-pointer justify-start"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === guide._id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <Avatar>
                      <AvatarImage
                        src={guide.profileImage}
                        alt={guide.name}
                        width={32}
                        height={32}
                      />
                      <AvatarFallback className="text-2xl [data-state=active]:text-primary-foreground hover:text-primary-foreground">
                        {guide.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {guide.name}
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
