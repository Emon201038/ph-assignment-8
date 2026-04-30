import { serverFetch } from "@/lib/server-fetch";
import DestinationCard from "@/components/module/destination/DestinationCard";
import { IDestination } from "@/interfaces/destination.interface";

export default async function Destinations({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const res = await serverFetch.get(
    "/v2/destinations?limit=12&" +
      new URLSearchParams(searchParamsObj as Record<string, string>).toString(),
  );
  const data = await res.json();
  return (
    <>
      {data.data?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data?.data?.map((destination: IDestination, index: number) => (
            <DestinationCard
              destination={destination}
              index={index}
              key={index}
            />
          ))}
        </div>
      ) : (
        <div className="w-full py-12 text-center font-semibold">
          No Destination Found!!!
        </div>
      )}
    </>
  );
}
