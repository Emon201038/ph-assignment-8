"use client";

import { ITrip, TripInclude } from "@/interfaces/trip.interface";
import TripForm from "./TripForm";

interface UpdateTripProps {
  trip: ITrip;
  tripIncludes: TripInclude[];
}

const UpdateTrip = ({ trip, tripIncludes }: UpdateTripProps) => {
  return (
    <div className="space-y-4 p-6 max-w-2xl mx-auto">
      <div>
        <h1 className="font-bold text-2xl">Update Trip</h1>
        <p>Modify the details of an existing trip</p>
      </div>
      <TripForm trip={trip} tripIncludes={tripIncludes} />
    </div>
  );
};

export default UpdateTrip;
