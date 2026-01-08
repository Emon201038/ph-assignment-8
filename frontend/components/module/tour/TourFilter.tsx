"use client";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import { Button } from "@/components/ui/button";
import { TOUR_CATEGORIES } from "@/constants/user";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useTransition } from "react";
import languages from "@/data/iso/languages.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";

const TourFilter = () => {
  const [language, setLanguage] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const clearAllFilters = () => {
    setCategory("");
    setLanguage("");

    startTransition(() => {
      router.push(window.location.href);
    });
  };

  const debouncedLanguage = useDebounce(language, 500);
  const debouncedCategory = useDebounce(category, 500);

  const params = new URLSearchParams(searchParams.toString());
  const activeFiltersCount =
    (params.get("language") || language.length > 0 ? 1 : 0) +
    (params.get("category") || category.length > 0 ? 1 : 0);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedLanguage) {
      params.set("language", debouncedLanguage);
    } else {
      params.delete("language");
    }
    if (debouncedCategory) {
      params.set("category", debouncedCategory);
    } else {
      params.delete("category");
    }
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }, [debouncedCategory, debouncedLanguage, startTransition, router]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <SearchFilter
          paramsName="searchTerm"
          placeholder="Search tour (title, description)..."
        />
        <RefreshButton />
      </div>
      <div className="flex items-center gap-4">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger>
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            {languages.map((lang) => (
              <SelectItem key={lang.name} value={lang.name}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Category</SelectItem>
            {TOUR_CATEGORIES.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
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
    </div>
  );
};

export default TourFilter;
