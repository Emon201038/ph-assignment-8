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
import { IUser, UserRole } from "@/interfaces/user.interface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { serverFetch } from "@/lib/server-fetch";
import Link from "next/link";

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
  selectedTourId?: string;
}

export function GuideSearchSelect({
  value,
  onValueChange,
  placeholder = "Select a tour...",
  searchPlaceholder = "Search guides...",
  className,
  disabled = false,
  id,
  selectedTourId,
}: GuideSearchSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [guides, setGuides] = React.useState<IUser<IGuide>[]>([]);
  const [selected, setSelected] = React.useState<IUser<IGuide> | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  React.useEffect(() => {
    const fetchSelected = async () => {
      if (!value) {
        setSelected(null);
        return;
      }

      if (selected?.id === value) return;

      try {
        const res = await serverFetch.get(`/v2/users/${value}`);
        const data = await res.json();

        if (data?.success) {
          setSelected(data.data);
        }
      } catch (error) {
        console.error("Error fetching selected guide:", error);
      }
    };

    fetchSelected();
  }, [value]);

  React.useEffect(() => {
    if (!open) return;
    if (!selectedTourId) return;

    const fetchGuides = async () => {
      setIsLoading(true);

      try {
        const query = debouncedSearchQuery
          ? `searchTerm=${debouncedSearchQuery}`
          : "";

        const res = await serverFetch.get(
          `/v2/tours/${selectedTourId}/guides?${query}`,
        );
        const data = await res.json();

        if (!data?.success) {
          setGuides([]);
          return;
        }

        const newGuides = data.data as IUser<IGuide>[];

        setGuides((prev) => {
          // keep selected in list if missing
          if (selected && !newGuides.some((t) => t.id === selected.id)) {
            return [selected, ...newGuides];
          }

          return newGuides;
        });
      } catch (error) {
        console.error("Error fetching guides:", error);
        setGuides([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuides();
  }, [debouncedSearchQuery, open, selected, selectedTourId]);

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
          className={cn("w-full justify-between", className)}
          disabled={disabled}
        >
          <span className="truncate">
            {selected ? selected.name : placeholder}
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
            ) : guides.length === 0 ? (
              <CommandEmpty>
                {searchQuery ? (
                  "No guides found."
                ) : !selectedTourId ? (
                  <span>
                    Please select a tour to see <br /> available guides.
                  </span>
                ) : (
                  <span>
                    No guides found. <br />{" "}
                    <Link
                      href={`/admin/dashboard/tours-management/update-tour/${selectedTourId}?isSlug=false`}
                      className="text-primary underline"
                    >
                      Assign Guides to this tour
                    </Link>
                  </span>
                )}
              </CommandEmpty>
            ) : (
              <CommandGroup>
                {guides.map((guide) => (
                  <CommandItem
                    key={guide.id}
                    value={guide.id}
                    onSelect={(currentValue) => {
                      onValueChange?.(
                        currentValue === value ? "" : currentValue,
                      );
                      setOpen(false);
                    }}
                    className="cursor-pointer justify-start"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === guide.id ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <Avatar>
                      <AvatarImage
                        src={guide.avatar || "/images/default-avatar.png"}
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
