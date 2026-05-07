"use client";
import { AssignGuides } from "@/components/module/tour/AssignGuide";
import { useState } from "react";

const TouristsManagementLoading = () => {
  const [selectedGuides, setSelectedGuides] = useState<string[]>([]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log(formData.getAll("guides"));
        console.log(selectedGuides);
      }}
    >
      <AssignGuides />
      <button>Submit</button>
    </form>
  );
};

export default TouristsManagementLoading;
