"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { categories, cities } from "@/lib/mock-data";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { createTourAction } from "@/action/tour";

const CreateTourModal = ({ userId }: { userId: string }) => {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [state, createTour, isLoading] = useActionState(createTourAction, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      if (formRef?.current) {
        formRef.current.reset();
      }
      setOpen(false);
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  const getFieldError = (fieldName: string) => {
    if (state && state?.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      return error?.message;
    } else {
      return null;
    }
  };

  console.log(state);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Tour
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <form ref={formRef} action={createTour}>
          <Card>
            <CardHeader>
              <CardTitle>Tour Details</CardTitle>
              <CardDescription>
                Provide information about your tour
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Tour Title *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Hidden Jazz Bars of New Orleans"
                />
                {getFieldError("title") && (
                  <p className="text-sm text-destructive">
                    {getFieldError("title")}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe what makes your tour special..."
                  rows={5}
                />
                {getFieldError("description") && (
                  <p className="text-sm text-destructive">
                    {getFieldError("description")}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Select name="city">
                    <SelectTrigger name="city" id="city">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.name} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {getFieldError("city") && (
                    <p className="text-sm text-destructive">
                      {getFieldError("city")}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">country *</Label>
                  <Select name="country">
                    <SelectTrigger name="country" id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((country) => (
                        <SelectItem key={country.name} value={country.country}>
                          {country.country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {getFieldError("country") && (
                    <p className="text-sm text-destructive">
                      {getFieldError("country")}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select name="category">
                    <SelectTrigger name="category" id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {getFieldError("category") && (
                    <p className="text-sm text-destructive">
                      {getFieldError("category")}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD) *</Label>
                  <Input
                    name="price"
                    id="price"
                    type="number"
                    placeholder="50"
                    min="1"
                  />
                  {getFieldError("price") && (
                    <p className="text-sm text-destructive">
                      {getFieldError("price")}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration *</Label>
                  <Input name="duration" id="duration" placeholder="3 hours" />
                  {getFieldError("duration") && (
                    <p className="text-sm text-destructive">
                      {getFieldError("duration")}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxGroupSize">Max Group Size *</Label>
                  <Input
                    id="maxGroupSize"
                    name="maxGroupSize"
                    type="number"
                    placeholder="8"
                    min="1"
                  />
                  {getFieldError("maxGroupSize") && (
                    <p className="text-sm text-destructive">
                      {getFieldError("maxGroupSize")}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meetingPoint">Meeting Point *</Label>
                <Input
                  id="meetingPoint"
                  name="meetingPoint"
                  placeholder="e.g., Jackson Square, Main Entrance"
                />
                {getFieldError("meetingPoint") && (
                  <p className="text-sm text-destructive">
                    {getFieldError("meetingPoint")}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="languages">Languages (comma-separated)</Label>
                <Input
                  id="languages"
                  name="language"
                  placeholder="English, Spanish, French"
                />
                {getFieldError("languages") && (
                  <p className="text-sm text-destructive">
                    {getFieldError("languages")}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="images">Images (max 3MB)</Label>
                <Input
                  id="images"
                  name="images"
                  type="file"
                  placeholder="English, Spanish, French"
                />
                {getFieldError("images") && (
                  <p className="text-sm text-destructive">
                    {getFieldError("images")}
                  </p>
                )}
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  // disabled={loading}
                  className="flex-1"
                >
                  {/* {loading ? "Creating..." : "Create Tour"} */}
                  Create Tour
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    // onClick={() => router.push("/dashboard")}
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </CardContent>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTourModal;
