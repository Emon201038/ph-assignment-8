"use client";
import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

const HeaderSearch = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = React.useState(
    searchParams.get("searchTerm") || "",
  );

  const debouncedValue = useDebounce(inputValue, 500);

  let placeholder = "";
  if (pathname.startsWith("/destinations")) {
    placeholder = "destinations";
  } else if (pathname.startsWith("/guides")) {
    placeholder = "guides";
  } else placeholder = "tours";

  React.useEffect(() => {
    // Reset input whenever route changes
    setInputValue("");
  }, [pathname]);

  React.useEffect(() => {
    setInputValue(searchParams.get("searchTerm") || "");
  }, [searchParams]);

  React.useEffect(() => {
    const current = searchParams.get("searchTerm") || "";

    // Don't do anything if URL already matches input
    if (current === debouncedValue) return;

    const params = new URLSearchParams(searchParams.toString());

    if (debouncedValue) {
      params.set("searchTerm", debouncedValue);
    } else {
      params.delete("searchTerm");
    }

    router.replace(`/${placeholder}?${params.toString()}`);
  }, [debouncedValue, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) return;
    router.push(`/${placeholder}?searchTerm=${inputValue}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="hidden md:flex flex-col min-w-40 h-10 max-w-64"
    >
      <div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden border border-slate-200 dark:border-slate-700">
        <div className="text-slate-400 flex bg-slate-50 dark:bg-slate-800 items-center justify-center pl-3">
          <Search className="w-4 h-4" />
        </div>
        <Input
          type="search"
          name="searchTerm"
          className="form-input flex w-full min-w-0 flex-1 border-none bg-slate-50 dark:bg-slate-800 focus-visible:ring-0 focus-visible:outline-none text-sm placeholder:text-slate-400 shadow-none"
          placeholder={`Search ${placeholder}...`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </form>
  );
};

export default HeaderSearch;
