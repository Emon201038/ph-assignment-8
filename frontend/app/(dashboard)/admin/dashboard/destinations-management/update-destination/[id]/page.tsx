import DestinationForm from "@/components/module/destination/DestinationForm";
import { IResponse } from "@/interfaces";
import { IDestination } from "@/interfaces/destination.interface";
import { serverFetch } from "@/lib/server-fetch";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const destinationRes = await serverFetch.get(`/v2/destinations/${id}`);
  const destinationData: IResponse<IDestination> = await destinationRes.json();
  return (
    <div className="space-y-4 p-6 w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">Update Destination</h1>
      {/* Update destination form will go here for destination ID: {params.id} */}
      <DestinationForm destination={destinationData.data} />
    </div>
  );
};

export default page;
