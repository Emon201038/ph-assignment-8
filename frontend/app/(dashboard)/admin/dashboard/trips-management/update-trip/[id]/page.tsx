import UpdateTrip from "@/components/module/trip/UpdateTrip";
import { IResponse } from "@/interfaces";
import { ITrip, TripInclude } from "@/interfaces/trip.interface";
import { serverFetch } from "@/lib/server-fetch";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await serverFetch.get(`/v2/trips/${id}`);
  const data: IResponse<ITrip> = await res.json();

  const includeRes = await serverFetch.get("/v2/trips/includes");
  const includeData = await includeRes.json();
  const tripIncludes: TripInclude[] = includeData?.data || [];
  return <UpdateTrip trip={data.data} tripIncludes={tripIncludes} />;
};

export default page;
