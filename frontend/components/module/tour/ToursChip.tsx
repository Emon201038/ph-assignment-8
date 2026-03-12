"use client";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useTransition } from "react";

const ToursChip = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [active, setActive] = React.useState(0);

  const chips = [
    "All Tours",
    "Top Rated",
    "Budget Friendly",
    "Luxury",
    "Family Style",
  ];

  const updateQuery = (params: URLSearchParams) => {
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const handleClick = (index: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (index === 0) {
      setActive(index);
      params.delete("filter");
    } else {
      setActive(index);
      params.set("filter", chips[index].toLowerCase());
    }

    updateQuery(params);
  };
  return (
    <div className="flex gap-3 pb-6 overflow-x-auto no-scrollbar">
      {chips.map((i, index) => (
        <Button
          key={i}
          variant={"ghost"}
          onClick={() => handleClick(index)}
          className={`flex h-10 shrink-0 items-center justify-center gap-2 rounded-full  px-6 text-sm font-bold  ${active === index ? "bg-primary text-white" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary transition-colors"}`}
        >
          {i}
        </Button>
      ))}
    </div>
  );
};

export default ToursChip;
