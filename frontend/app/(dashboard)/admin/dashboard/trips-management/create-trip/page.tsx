import TripForm from "@/components/module/trip/TripForm";
import { TripInclude } from "@/interfaces/trip.interface";
import { serverFetch } from "@/lib/server-fetch";

const page = async () => {
  const res = await serverFetch.get("/v2/trips/includes");
  const data = await res.json();
  const tripIncludes: TripInclude[] = data?.data || [];
  return (
    <div className="space-y-4 p-6 max-w-2xl h-[calc(100vh-81px)]  mx-auto">
      <div>
        <h1 className="font-bold text-2xl">Create Trip</h1>
        <p>Add a new trip to the platform</p>
      </div>
      <TripForm tripIncludes={tripIncludes} />
    </div>
  );
};

export default page;
