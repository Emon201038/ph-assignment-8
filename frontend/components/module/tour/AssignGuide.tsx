"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
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
import { MultiSelect } from "@/components/ui/multi-select";
import { Badge } from "@/components/ui/badge";

export interface Guide {
  id: string;
  name: string;
}

interface AssignGuidesProps {
  values?: IUser[];
  onValueChange?: (value: IUser[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
}

export function AssignGuides({
  values = [],
  onValueChange,
  placeholder = "Select a tour...",
  searchPlaceholder = "Search guides...",
  className,
  disabled = false,
  id,
}: AssignGuidesProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [guides, setGuides] = React.useState<IUser[]>([]);
  const [selected, setSelected] = React.useState<IUser[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  React.useEffect(() => {
    if (!open) return;

    const fetchGuides = async () => {
      setIsLoading(true);

      try {
        const params = new URLSearchParams();

        if (debouncedSearchQuery) {
          params.append("searchTerm", debouncedSearchQuery);
        }

        const url = id
          ? `/v2/tours/${id}/guides?${params.toString()}`
          : `/v2/users?role=${UserRole.GUIDE}&${params.toString()}`;

        const res = await serverFetch.get(url);
        const data = await res.json();

        if (!data?.success) {
          setGuides([]);
          return;
        }

        const fetchedGuides = data.data as IUser[];

        // keep selected values visible
        const mergedGuides = [
          ...values,
          ...fetchedGuides.filter(
            (guide) => !values.some((v) => v.id === guide.id),
          ),
        ];

        setGuides(mergedGuides);
      } catch (error) {
        console.error("Error fetching guides:", error);
        setGuides([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuides();
  }, [debouncedSearchQuery, open, id, values]);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setSearchQuery("");
    }
  }, [open]);

  const handleRemove = (valueToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange?.(values.filter((v) => v.id !== valueToRemove));
  };
  const handleSelect = (selectedValue: string) => {
    const newValue = values.map((v) => v.id).includes(selectedValue)
      ? values.filter((v) => v.id !== selectedValue)
      : [...values, guides.find((g) => g.id === selectedValue) as IUser];
    onValueChange?.(newValue);
  };

  const displayedOptions = values.slice(0, 4);
  const remainingCount = values.length - 4;

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between min-h-10 h-auto relative hover:bg-primary hover:text-primary-foreground",
            className,
          )}
          disabled={disabled}
        >
          <div className="flex flex-wrap gap-1 flex-1 w-full">
            {values.length > 0 ? (
              <>
                {displayedOptions.map((option) => (
                  <Badge
                    key={option.id}
                    variant="secondary"
                    className="mr-0.5 text-ellipsis overflow-hidden w-auto truncate gap-0"
                  >
                    {option.name}
                    <div
                      className="rounded-full outline-none hover:bg-muted cursor-pointer flex items-center justify-center"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleRemove(option.id, e as any);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => handleRemove(option.id, e)}
                    >
                      <X className="h-3 w-3" />
                    </div>
                  </Badge>
                ))}
                {remainingCount > 0 && (
                  <Badge variant="secondary" className="mr-1">
                    +{remainingCount} more
                  </Badge>
                )}
              </>
            ) : (
              <span className=" text-ellipsis overflow-hidden">
                {placeholder}
              </span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 absolute right-2  top-1/2 -translate-y-1/2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-(--radix-popover-trigger-width) p-0 z-100"
        align="start"
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
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : (
              <>
                <CommandEmpty>No guides found.</CommandEmpty>
                <CommandGroup>
                  {guides.map((option) => {
                    const isSelected = values.some((i) => i.id === option.id);
                    const isDisabled =
                      !isSelected && 4 !== undefined && values.length >= 4;

                    return (
                      <CommandItem
                        key={option.id}
                        value={option.id}
                        onSelect={() => {
                          if (!isDisabled) {
                            handleSelect(option.id);
                          }
                        }}
                        disabled={isDisabled}
                        className={cn(
                          isDisabled && "opacity-50 cursor-not-allowed",
                        )}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            isSelected ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {option.name}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
