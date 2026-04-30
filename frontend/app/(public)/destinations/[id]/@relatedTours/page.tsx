import { IResponse } from "@/interfaces";
import { ITour } from "@/interfaces/tour.interface";
import { serverFetch } from "@/lib/server-fetch";
import { Star } from "lucide-react";
import Link from "next/link";

const DestinationRelatedToursPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await serverFetch.get(`/v2/tours?searchTerm=${id}&limit=4`);
  const data: IResponse<ITour[]> = await res.json();
  return (
    <div className="lg:col-span-2 space-y-12">
      <section id="tours">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <span className="w-1.5 h-8 bg-primary rounded-full"></span>
            Related Tours
          </h2>
        </div>
        <div className="space-y-4">
          {data.data.map((tour) => (
            <Link
              key={tour._id}
              href={`/tours/${tour.id}`}
              className="flex gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary/50 transition-all cursor-pointer"
            >
              <div
                className="size-24 rounded-lg bg-cover bg-center shrink-0"
                data-alt={tour.title}
                style={{
                  backgroundImage: `url("${tour.image}")`,
                }}
              ></div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-lg">{tour.title}</h4>
                  <p className="text-slate-500 text-sm">{tour.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="size-4.5 fill-current" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      {tour.averageRating} ({tour.totalReviews} reviews)
                    </span>
                  </div>
                  <span className="font-bold text-primary">
                    ${tour.priceFrom} / person
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DestinationRelatedToursPage;
