"use client";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
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
import { TOURIST_PREFERENCES } from "@/constants/user";
import { useDebounce } from "@/hooks/useDebounce";
import { Gender } from "@/interfaces/user.interface";
import { Check, ChevronsUpDown, Filter, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useTransition } from "react";
import allLanguages from "@/data/iso/languages.json";

const GuideFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [expertise, setExpertise] = React.useState<string[]>([]);
  const [languages, setLanguages] = React.useState<string[]>([]);
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [gender, setGender] = React.useState<Gender | "all" | string>("");
  const [open, setOpen] = React.useState(false);
  const [languagesModalOpen, setLanguagesModalOpen] = React.useState(false);

  const debouncedExpertise = useDebounce(expertise, 500);
  const debouncedLanguages = useDebounce(languages, 500);
  const debouncedName = useDebounce(name, 500);
  const debouncedEmail = useDebounce(email, 500);
  const debouncedPhone = useDebounce(phone, 500);
  const debouncedGender = useDebounce(gender, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedName) {
      params.set("name", debouncedName);
    } else {
      params.delete("name");
    }
    if (debouncedEmail) {
      params.set("email", debouncedEmail);
    } else {
      params.delete("email");
    }
    if (debouncedPhone) {
      params.set("phone", debouncedPhone);
    } else {
      params.delete("phone");
    }
    if (debouncedExpertise.length > 0) {
      debouncedExpertise.forEach((e) => params.set("expertise", e));
    } else {
      params.delete("expertise");
    }
    if (debouncedLanguages.length > 0) {
      debouncedLanguages.forEach((l) => params.set("languages", l));
    } else {
      params.delete("languages");
    }
    if (debouncedGender) {
      params.set("gender", debouncedGender);
    } else {
      params.delete("gender");
    }

    // params.set("page", "1");
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }, [
    debouncedExpertise,
    debouncedLanguages,
    debouncedName,
    debouncedEmail,
    debouncedPhone,
    debouncedGender,
  ]);

  const toggleExpertise = (value: string) => {
    if (expertise.includes(value)) {
      setExpertise(expertise.filter((e) => e !== value));
    } else {
      setExpertise([...expertise, value]);
    }
  };
  const toggleLanguage = (value: string) => {
    if (languages.includes(value)) {
      setLanguages(languages.filter((e) => e !== value));
    } else {
      setLanguages([...expertise, value]);
    }
  };

  const applyToggleExpertiseFilter = () => {
    // const params = new URLSearchParams(searchParams.toString());
    // params.delete("interests");

    // if (interests.length > 0) {
    //   interests.forEach((i) => params.set("interests", i));
    // }

    // startTransition(() => {
    //   router.push(`?${params.toString()}`);
    // });

    setOpen(false);
  };

  const clearAllFilters = () => {
    setName("");
    setEmail("");
    setPhone("");
    setExpertise([]);
    setLanguages([]);
    setGender("");

    startTransition(() => {
      router.push(window.location.href);
    });
  };

  const activeFiltersCount =
    expertise.length +
    languages.length +
    (gender ? 1 : 0) +
    (email ? 1 : 0) +
    (phone ? 1 : 0);

  return (
    <div className="space-y-3">
      {/* Row 1: Search and Refresh */}
      <div className="flex items-center gap-3">
        <SearchFilter
          paramsName="searchTerm"
          placeholder="Search guide (name, email, phone)..."
        />
        <RefreshButton />
      </div>

      {/* Row 2: Filter Controls */}
      <div className="flex items-center gap-3">
        {/* Expertise Multi-Select */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-60 justify-between h-10"
            >
              <Filter className="mr-2 h-4 w-4" />
              {expertise.length > 0
                ? `${expertise.length} selected`
                : "Select expertise"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search expertise..." />
              <CommandList>
                <CommandEmpty>No specialty found.</CommandEmpty>
                <CommandGroup>
                  {TOURIST_PREFERENCES.map((interest, index) => {
                    const isSelected = expertise.includes(interest.value);
                    return (
                      <CommandItem
                        key={index}
                        value={interest.value}
                        onSelect={() => toggleExpertise(interest.value)}
                        className={isSelected ? "bg-accent" : ""}
                      >
                        <Checkbox checked={isSelected} className="mr-2" />
                        <span className={isSelected ? "font-medium" : ""}>
                          {interest.label}
                        </span>
                        {isSelected && (
                          <Check className="ml-auto h-4 w-4 text-primary" />
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
              <div className="p-2 border-t">
                <Button
                  onClick={applyToggleExpertiseFilter}
                  className="w-full"
                  size="sm"
                  disabled={isPending}
                >
                  Apply Filter
                </Button>
              </div>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Languages Multi-Select */}
        <Popover open={languagesModalOpen} onOpenChange={setLanguagesModalOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-60 justify-between h-10"
            >
              <Filter className="mr-2 h-4 w-4" />
              {languages.length > 0
                ? `${languages.length} selected`
                : "Select languages"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search languages..." />
              <CommandList>
                <CommandEmpty>No language found.</CommandEmpty>
                <CommandGroup>
                  {allLanguages.map((l, index) => {
                    const isSelected = languages.includes(l.code);
                    return (
                      <CommandItem
                        key={index}
                        value={l.code}
                        onSelect={() => toggleLanguage(l.code)}
                        className={isSelected ? "bg-accent" : ""}
                      >
                        <Checkbox checked={isSelected} className="mr-2" />
                        <span className={isSelected ? "font-medium" : ""}>
                          {l.name}
                        </span>
                        {isSelected && (
                          <Check className="ml-auto h-4 w-4 text-primary" />
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
              <div className="p-2 border-t">
                <Button
                  onClick={applyToggleExpertiseFilter}
                  className="w-full"
                  size="sm"
                  disabled={isPending}
                >
                  Apply Filter
                </Button>
              </div>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Gender Filter */}
        <Select
          value={gender}
          onValueChange={(value) => setGender(value === "all" ? "" : value)}
          disabled={isPending}
        >
          <SelectTrigger className="w-35 h-10">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="MALE">Male</SelectItem>
            <SelectItem value="FEMALE">Female</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            onClick={clearAllFilters}
            disabled={isPending}
            className="h-10 px-3"
          >
            <X className="h-4 w-4 mr-1" />
            Clear ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Row 3: Active Specialty Badges - Fixed Height to Prevent Shift */}

      {expertise.length > 0 && (
        <div className="min-h-8 flex items-center">
          <div className="flex flex-wrap gap-2">
            {expertise.map((e) => (
              <Badge key={e} variant="outline" className="px-2.5 py-1 h-7">
                {e}
                <Button
                  variant="ghost"
                  onClick={() => toggleExpertise(e)}
                  className="ml-1.5 hover:text-destructive transition-colors"
                  aria-label={`Remove ${e}`}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideFilter;
