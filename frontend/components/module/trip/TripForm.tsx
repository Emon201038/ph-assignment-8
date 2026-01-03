"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ITrip } from "@/interfaces/trip.interface";
import { mockGuides, mockTours } from "@/lib/mock-data";
import { createTrip } from "@/services/trip/trip.service";
import React, { useActionState, useState } from "react";

interface TripFormProps {
  trip?: ITrip;
  onClose?: () => void;
  onSuccess?: () => void;
}

const TripForm = ({ onClose, onSuccess, trip }: TripFormProps) => {
  const [selectedTourId, setSelectedTourId] = useState("");
  const [selectedGuideId, setSelectedGuideId] = useState("");

  const [state, formAction, isPending] = useActionState(createTrip, null);
  return (
    <form action={formAction} className="space-y-4 max-w-4xl w-full mx-auto ">
      <Field>
        <FieldLabel htmlFor="tourId">Select Tour</FieldLabel>
        <FieldContent>
          <Select
            name="tourId"
            value={selectedTourId}
            onValueChange={setSelectedTourId}
            required
            disabled={!!trip?.tourId}
          >
            <SelectTrigger id="tourId">
              <SelectValue placeholder="Choose a tour" />
            </SelectTrigger>
            <SelectContent>
              {mockTours.map((tour) => (
                <SelectItem key={tour.id} value={tour.id}>
                  {tour.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="guideId">Assign Guide</FieldLabel>
        <FieldContent>
          <Select
            name="guideId"
            value={selectedGuideId}
            onValueChange={setSelectedGuideId}
            required
          >
            <SelectTrigger id="guideId">
              <SelectValue placeholder="Choose a guide" />
            </SelectTrigger>
            <SelectContent className="relative mt-6">
              <div className="absolute top-0 left-0">
                <Input type="text" name="search" placeholder="search guide" />
              </div>
              {mockGuides.map((guide) => (
                <SelectItem key={guide.id} value={guide.id}>
                  {guide.name} - {guide.location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="startDate">Start Date</FieldLabel>
        <FieldContent>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            required
            min={new Date().toISOString().split("T")[0]}
          />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="endDate">End Date</FieldLabel>
        <FieldContent>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            required
            min={new Date().toISOString().split("T")[0]}
          />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="maxCapacity">Max Capacity</FieldLabel>
        <FieldContent>
          <Input
            id="maxCapacity"
            name="maxCapacity"
            type="number"
            placeholder="e.g., 10"
            required
            min="1"
            max="50"
          />
        </FieldContent>
      </Field>

      {state?.success && (
        <div className="p-3 bg-accent/10 text-accent rounded-md text-sm">
          {state.message}
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1" disabled={isPending}>
          {isPending ? "Creating..." : "Create Trip"}
        </Button>
      </div>
    </form>
  );
};

export default TripForm;
