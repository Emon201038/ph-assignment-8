import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SearchableSelect } from "@/components/ui/searchable-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IInputErrorState } from "@/lib/getInputFieldError";
import { createTour, updateTour } from "@/services/tour/tour.service";
import { Edit, Eye, Loader2, Trash2, X } from "lucide-react";
import Image from "next/image";
import {
  useActionState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import languages from "@/data/iso/languages.json";
import { toast } from "sonner";
import { ITour } from "@/interfaces/tour.interface";
import { TOUR_CATEGORIES } from "@/constants/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TextInput } from "../dashboard/tour/TextInput";
import { DestinationSelect } from "../dashboard/tour/DestinationFilter";
import { InputNumber } from "../dashboard/tour/NumberInput";
import { TOUR_DIFFICULTY } from "@/constants/tours";
import { useRouter } from "next/navigation";
import useBeforeUnload from "@/hooks/useBeforeUnload";
import { AssignGuides } from "./AssignGuide";
import { IUser } from "@/interfaces/user.interface";

interface TourFormProps {
  tourData?: ITour;
  guides?: IUser[];
  onSuccess?: () => void;
  onClose?: () => void;
}

interface Destination {
  city: string;
  country: string;
  id: string;
}

const TourForm = ({
  tourData,
  guides = [],
  onSuccess,
  onClose,
}: TourFormProps) => {
  useBeforeUnload(true);
  const isEdit = !!tourData;
  const [category, setCategory] = useState(
    tourData?.category?.toUpperCase() || "",
  );
  const [tourImage, setTourImage] = useState<File | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(
    tourData?.difficulty || "",
  );
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  useState<Destination | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [selectedGuides, setSelectedGuides] = useState<IUser[]>([]);

  const action = !isEdit ? createTour : updateTour;
  const [state, formAction, isPending] = useActionState(action, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      router.push(`/admin/dashboard/tours-management`);
      if (formRef?.current) {
        formRef.current.reset();
      }

      if (fileInputRef?.current) {
        fileInputRef.current.value = "";
      }
      setTourImage(null);
      onSuccess?.();
      onClose?.();
    } else if (state && !state.success) {
      if (!state.errors || state.errors?.length === 0)
        toast.error(state.message);
      if (tourImage && fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(tourImage);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  }, [state, tourImage, router]);

  useEffect(() => {
    if (!tourImage) return;
    const url = URL.createObjectURL(tourImage);
    return () => URL.revokeObjectURL(url);
  }, [tourImage]);

  const getDefaultChecked = (field: string) => {
    return state?.formData?.[field]
      ? true
      : isEdit
        ? tourData[field as keyof ITour]
          ? true
          : false
        : false;
  };

  const handleRemoveImage = useCallback(() => {
    setTourImage(null);
    fileInputRef.current?.value && (fileInputRef.current.value = "");
  }, []);

  const imagePreview = useMemo(() => {
    if (tourImage) return URL.createObjectURL(tourImage);
    if (tourData?.image) return tourData.image;
    return null;
  }, [tourImage, tourData]);

  return (
    <div className="relative">
      <form ref={formRef} action={formAction} className="space-y-6">
        {isEdit && tourData && (
          <input type="hidden" name="tourId" value={tourData.id} />
        )}
        <input
          type="hidden"
          name="destinationId"
          value={
            selectedDestination
              ? selectedDestination.id
              : tourData
                ? tourData.destinationId
                : ""
          }
        />

        {/* Basic Information */}
        <div className="space-y-4">
          <TextInput
            type="text"
            name="title"
            defaultValue={
              state?.formData?.title || (isEdit ? tourData.title : undefined)
            }
            id="title"
            label="Tour Name *"
            state={state}
          />

          <TextInput
            type="textarea"
            name="description"
            id="description"
            placeholder="Describe what makes this tour special..."
            rows={4}
            defaultValue={
              state?.formData?.description ||
              (isEdit ? tourData.description : undefined)
            }
            state={state}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputNumber
              defaultValue={
                state?.formData?.maxGroupSize ||
                (isEdit ? tourData.maxGroupSize : undefined)
              }
              placeholder="e.g. 10"
              state={state}
              label="Max Group Size *"
              id="maxGroupSize"
            />
            <InputNumber
              defaultValue={
                state?.formData?.priceFrom ||
                (isEdit ? tourData.priceFrom : undefined)
              }
              placeholder="89"
              state={state}
              label="Price From (USD) *"
              id="priceFrom"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field className="relative">
              <FieldLabel htmlFor="difficulty">Difficulty *</FieldLabel>
              <Select
                value={selectedDifficulty}
                onValueChange={setSelectedDifficulty}
                name="difficulty"
              >
                <SelectTrigger
                  name="difficulty"
                  id="difficulty"
                  className="w-full"
                >
                  <SelectValue placeholder="Select tour difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {TOUR_DIFFICULTY.map((diff) => (
                    <SelectItem key={diff.value} value={diff.value}>
                      {diff.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputFieldError
                state={state as IInputErrorState}
                field="difficulty"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="category">Category *</FieldLabel>
              <Select
                name="category"
                value={category.toUpperCase()}
                onValueChange={setCategory}
              >
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {TOUR_CATEGORIES.map((category) => (
                    <SelectItem
                      key={category.value}
                      value={category.value.toUpperCase()}
                    >
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputFieldError
                state={state as IInputErrorState}
                field="category"
              />
            </Field>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputNumber
              defaultValue={
                state?.formData?.durationDays ||
                (isEdit ? tourData.durationDays : undefined)
              }
              placeholder="e.g. 1"
              state={state}
              label="Duration Days *"
              id="durationDays"
            />
            <Field>
              <FieldLabel htmlFor="destinationId">Destination *</FieldLabel>
              <FieldContent>
                <DestinationSelect
                  defaultValue={tourData}
                  selected={selectedDestination}
                  setSelected={setSelectedDestination}
                />
              </FieldContent>
              <InputFieldError
                state={state as IInputErrorState}
                field="destinationId"
              />
            </Field>
          </div>

          {/* Tour Images */}
          <Field className="space-y-2 gap-0">
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              name="image"
              id="tourImages"
              placeholder="Tour banner"
              onChange={(e) => setTourImage(e.target.files?.[0] as File)}
            />
            {imagePreview && (
              <div className="relative w-60 h-60">
                <Image src={imagePreview} alt="preview" fill />
                <Button
                  type="button"
                  className="absolute top-2 left-2"
                  onClick={handleRemoveImage}
                  size="icon"
                >
                  <Trash2 />
                </Button>
              </div>
            )}
          </Field>
          {/* {tourData?.image && !tourImage ? (
            <div className="relative h-45 w-[60%] mx-auto">
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const field = document.createElement("input");
                  field.type = "file";
                  field.accept = "image/*";
                  field.click();
                  field.onchange = () => {
                    const file = field.files?.[0];
                    if (file) setTourImage(file);
                  };
                }}
                variant={"ghost"}
                className="z-10 absolute top-2 right-2"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Image
                src={tourData.image}
                alt={tourData.title}
                fill
                className="z-1"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field className="space-y-2 gap-0">
                <div className="flex justify-between items-center">
                  <FieldLabel htmlFor="tourImages">
                    Upload images that represent your tour
                  </FieldLabel>
                  <div className="flex gap-1">
                    {tourImage && <ImagePreview file={tourImage} />}
                    {tourImage && (
                      <Button
                        type="button"
                        variant={"ghost"}
                        size={"icon"}
                        onClick={(e) => {
                          setTourImage(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  name="image"
                  id="tourImages"
                  placeholder="Tour banner"
                  onChange={(e) => setTourImage(e.target.files?.[0] as File)}
                  multiple
                  max={3}
                />
                <InputFieldError
                  state={state as IInputErrorState}
                  field="image"
                />
              </Field>
            </div>
          )} */}
        </div>

        {/* Additional Settings */}
        <div className="space-y-3 pt-4 border-t">
          <h3 className="font-semibold text-base">Additional Settings</h3>
          <AssignGuides
            values={selectedGuides}
            onValueChange={setSelectedGuides}
          />
          <FieldGroup className="space-y-2 gap-0">
            {[
              { label: "Published tour", field: "isPublished" },
              { label: "Featured tour", field: "featured" },
            ].map((setting) => {
              return (
                <Field
                  orientation={"horizontal"}
                  key={setting.field}
                  className="gap-2"
                >
                  <Checkbox
                    key={`${setting.field}-${state?.formData?.[setting.field] ?? ""}`}
                    name={setting.field}
                    id={setting.field}
                    className="rounded"
                    defaultChecked={getDefaultChecked(setting.field)}
                  />
                  <FieldLabel
                    htmlFor={setting.field}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <span className="text-sm">{setting.label}</span>
                  </FieldLabel>
                </Field>
              );
            })}
          </FieldGroup>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button
            type="submit"
            size="lg"
            className="flex-1"
            disabled={isPending}
          >
            {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {isEdit ? "Update Tour" : "Create Tour"}
          </Button>
        </div>
      </form>
    </div>
  );
};

const ImagePreview = ({ file }: { file: File }) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  useEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => setImageUrl(reader.result as string);
    reader.readAsDataURL(file);
  }, [file]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"sm"} className="">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogTitle>Image Preview</DialogTitle>
        <DialogDescription className="sr-only"> </DialogDescription>

        <Image
          src={imageUrl}
          alt="Preview"
          width={800}
          height={600}
          className="object-contain"
        />
      </DialogContent>
    </Dialog>
  );
};

export default TourForm;
