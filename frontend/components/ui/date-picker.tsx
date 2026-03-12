"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function DatePicker({
  className,
  showIcon = true,
  placeholder = "Pick a date",
  name = "date",
}: {
  className?: string;
  showIcon?: boolean;
  placeholder?: string;
  name?: string;
}) {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <input
        type="hidden"
        name={name}
        value={date ? format(date, "yyyy-MM-dd") : ""}
      />
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className={cn(
            "w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground",
            className,
          )}
        >
          {date ? (
            format(date, "PPP")
          ) : (
            <span className="opacity-60">{placeholder}</span>
          )}
          {showIcon && <ChevronDownIcon />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={date}
          disabled={(date) => date < new Date() || date < new Date(Date.now())}
        />
      </PopoverContent>
    </Popover>
  );
}
