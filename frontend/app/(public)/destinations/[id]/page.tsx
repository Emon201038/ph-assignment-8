import { IResponse } from "@/interfaces";
import { IDestination } from "@/interfaces/destination.interface";
import { serverFetch } from "@/lib/server-fetch";
import Image from "next/image";

const DestinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await serverFetch.get("/v2/destinations/" + id);
  const data: IResponse<IDestination> = await res.json();

  return (
    <div className="lg:col-span-2 space-y-12">
      {/* <!-- Overview --> */}
      <section id="overview">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-primary rounded-full"></span>
          Overview
        </h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
          <p className="mb-4">{data.data.overview}</p>
        </div>
      </section>
      {/* <!-- Top Attractions --> */}
      <section id="attractions">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-primary rounded-full"></span>
          Top Attractions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.data.attractions.map((attraction) => (
            <div
              key={attraction.id}
              className="group overflow-hidden rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all w-full"
            >
              <Image
                src={attraction.image}
                alt={attraction.name}
                width={500}
                height={500}
                className="h-48 bg-cover bg-center"
                data-alt="Lush green Monkey Forest in Ubud with stone statues"
                // style={{
                //   backgroundImage: `url(${attraction.image});`,
                // }}
              ></Image>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{attraction.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {attraction.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DestinationDetailsPage;
