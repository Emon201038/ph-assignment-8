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

const TouristFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [interests, setInterests] = React.useState<string[]>([]);
  const [preferredLanguage, setPreferredLanguage] = React.useState<string>("");
  const [preferredCurrency, setPreferredCurrency] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [gender, setGender] = React.useState<Gender | "all" | string>("");
  const [open, setOpen] = React.useState(false);

  const debouncedInterests = useDebounce(interests, 500);
  const debouncedPreferredLanguage = useDebounce(preferredLanguage, 500);
  const debouncedPreferredCurrency = useDebounce(preferredCurrency, 500);
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
    if (debouncedInterests.length > 0) {
      params.set("interests", debouncedInterests.join(","));
    } else {
      params.delete("interests");
    }
    if (debouncedPreferredLanguage) {
      params.set("preferredLanguage", debouncedPreferredLanguage);
    } else {
      params.delete("preferredLanguage");
    }
    if (debouncedPreferredCurrency) {
      params.set("preferredCurrency", debouncedPreferredCurrency);
    } else {
      params.delete("preferredCurrency");
    }
    if (debouncedGender) {
      params.set("gender", debouncedGender);
    } else {
      params.delete("gender");
    }

    params.set("page", "1");
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }, [
    debouncedInterests,
    debouncedPreferredLanguage,
    debouncedPreferredCurrency,
    debouncedName,
    debouncedEmail,
    debouncedPhone,
    debouncedGender,
  ]);

  const toggleInterests = (value: string) => {
    if (interests.includes(value)) {
      setInterests(interests.filter((interest) => interest !== value));
    } else {
      setInterests([...interests, value]);
    }
  };

  const applyToggleInterestsFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("interests");

    if (interests.length > 0) {
      interests.forEach((i) => params.set("interests", i));
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });

    setOpen(false);
  };

  const clearAllFilters = () => {
    setName("");
    setEmail("");
    setPhone("");
    setInterests([]);
    setPreferredLanguage("");
    setPreferredCurrency("");
    setGender("");

    startTransition(() => {
      router.push(window.location.href);
    });
  };

  const activeFiltersCount =
    interests.length + (gender ? 1 : 0) + (email ? 1 : 0) + (phone ? 1 : 0);

  return (
    <div className="space-y-3">
      {/* Row 1: Search and Refresh */}
      <div className="flex items-center gap-3">
        <SearchFilter paramsName="searchTerm" placeholder="Search doctors..." />
        <RefreshButton />
      </div>

      {/* Row 2: Filter Controls */}
      <div className="flex items-center gap-3">
        {/* Specialties Multi-Select */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-60 justify-between h-10"
            >
              <Filter className="mr-2 h-4 w-4" />
              {interests.length > 0
                ? `${interests.length} selected`
                : "Select interests"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search interests..." />
              <CommandList>
                <CommandEmpty>No specialty found.</CommandEmpty>
                <CommandGroup>
                  {TOURIST_PREFERENCES.map((interest, index) => {
                    const isSelected = interests.includes(interest.label);
                    return (
                      <CommandItem
                        key={index}
                        value={interest.label}
                        onSelect={() => toggleInterests(interest.label)}
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
                  onClick={applyToggleInterestsFilter}
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

        {/* Email Filter */}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-50 h-10"
          disabled={isPending}
        />

        {/* Contact Number Filter */}
        <Input
          type="text"
          placeholder="Contact"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-40 h-10"
          disabled={isPending}
        />

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

      {interests.length > 0 && (
        <div className="min-h-8 flex items-center">
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <Badge
                key={interest}
                variant="outline"
                className="px-2.5 py-1 h-7"
              >
                {interest}
                <Button
                  variant="ghost"
                  onClick={() => toggleInterests(interest)}
                  className="ml-1.5 hover:text-destructive transition-colors"
                  aria-label={`Remove ${interest}`}
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

export default TouristFilter;
