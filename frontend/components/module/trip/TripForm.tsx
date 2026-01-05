"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ITrip, TripStatus } from "@/interfaces/trip.interface";
import { createTrip, updateTrip } from "@/services/trip/trip.service";
import { useActionState, useEffect, useRef, useState } from "react";
import { TourSearchSelect } from "./TourSelect";
import { GuideSearchSelect } from "./GuideSelect";
import InputFieldError from "@/components/shared/InputFieldError";
import { IInputErrorState } from "@/lib/getInputFieldError";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TripFormProps {
  trip?: ITrip;
  onClose?: () => void;
  onSuccess?: () => void;
}

const TripForm = ({ onClose, onSuccess, trip }: TripFormProps) => {
  const isEdit = !!trip;
  const [selectedTourId, setSelectedTourId] = useState(trip?.tour?._id || "");
  const [selectedGuideId, setSelectedGuideId] = useState(
    trip?.guide?._id || ""
  );
  const [status, setStatus] = useState<TripStatus>(
    trip?.status || TripStatus.OPEN
  );

  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    isEdit ? updateTrip : createTrip,
    null
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      if (formRef?.current) {
        formRef.current.reset();
      }

      onSuccess?.();
      onClose?.();
    } else if (state && !state.success) {
      if ((state.errors && state.errors?.length === 0) || !state.errors)
        toast.error(state.message);
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-4 max-w-4xl w-full mx-auto "
    >
      {isEdit && <input type="hidden" name="tripId" value={trip?._id} />}
      <input type="hidden" name="status" value={status} />
      <input type="hidden" name="tourId" value={selectedTourId} />
      <input type="hidden" name="guideId" value={selectedGuideId} />
      <Field>
        <FieldLabel htmlFor="tourId">Select Tour</FieldLabel>
        <FieldContent>
          <TourSearchSelect
            value={trip?.tour?._id || selectedTourId}
            onValueChange={setSelectedTourId}
            id="tourId"
          />
          <InputFieldError state={state as IInputErrorState} field="tourId" />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="guideId">Assign Guide</FieldLabel>
        <FieldContent>
          <GuideSearchSelect
            value={trip?.guide?._id || selectedGuideId}
            onValueChange={setSelectedGuideId}
            id="guideId"
          />
          <InputFieldError state={state as IInputErrorState} field="guideId" />
        </FieldContent>
      </Field>

      {isEdit && (
        <Field>
          <FieldLabel htmlFor="status">Status</FieldLabel>
          <FieldContent>
            <Select
              value={status}
              onValueChange={(e) => setStatus(e as TripStatus)}
            >
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(TripStatus).map((status) => (
                  <SelectItem
                    key={status}
                    value={status}
                    // className="capitalize"
                  >
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldContent>
        </Field>
      )}

      <Field>
        <FieldLabel htmlFor="startDate">Start Date</FieldLabel>
        <FieldContent>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            defaultValue={
              state?.formData?.startDate
                ? (state?.formData?.startDate?.toString() as string)
                : "".split("T")[0] ||
                  (isEdit
                    ? new Date(trip.startDate).toISOString().split("T")[0]
                    : "")
            }
          />
          <InputFieldError
            state={state as IInputErrorState}
            field="startDate"
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
            min={new Date().toISOString().split("T")[0]}
            defaultValue={
              state?.formData?.endDate
                ? (state?.formData?.endDate?.toString() as string)
                : "".split("T")[0] ||
                  (isEdit
                    ? new Date(trip.endDate).toISOString().split("T")[0]
                    : "")
            }
          />
          <InputFieldError state={state as IInputErrorState} field="endDate" />
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
            // min="1"
            // max="50"
            defaultValue={
              state?.formData?.maxCapacity
                ? (state?.formData?.maxCapacity?.toString() as string)
                : isEdit
                ? trip.maxCapacity.toString()
                : ""
            }
          />
          <InputFieldError
            state={state as IInputErrorState}
            field="maxCapacity"
          />
        </FieldContent>
      </Field>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1" disabled={isPending}>
          {isPending
            ? isEdit
              ? "Updating..."
              : "Creating..."
            : isEdit
            ? "Update Trip"
            : "Create Trip"}
        </Button>
      </div>
    </form>
  );
};

export default TripForm;
