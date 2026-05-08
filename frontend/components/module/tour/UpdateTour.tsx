"use client";

import React from "react";
import TourForm from "./TourForm";
import { ITour } from "@/interfaces/tour.interface";
import { IUser } from "@/interfaces/user.interface";

const UpdateTour = ({ tour, guides }: { tour: ITour; guides: IUser[] }) => {
  return (
    <div className="space-y-4 p-6 max-w-2xl mx-auto">
      <div>
        <h1 className="font-bold text-2xl">Update Tour</h1>
        <p>Modify the details of an existing tour</p>
      </div>
      <TourForm tourData={tour} guides={guides} />
    </div>
  );
};

export default UpdateTour;
