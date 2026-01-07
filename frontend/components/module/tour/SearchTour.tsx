"use client";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchTour = () => {
  const [inputValue, setInputValue] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    setInputValue(params.get("searchTerm") || "");
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedValue) {
      params.set("searchTerm", debouncedValue);
    } else {
      params.delete("searchTerm");
    }

    router.push(`?${params.toString()}`);
  }, [debouncedValue]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (debouncedValue) {
      params.set("searchTerm", debouncedValue);
    } else {
      params.delete("searchTerm");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        required
        onChange={handleSearch}
        type="search"
        name="searchTerm"
        placeholder="Search Tours..."
        value={inputValue}
      />
    </form>
  );
};

export default SearchTour;
