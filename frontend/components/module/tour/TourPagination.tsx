"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
};

export default function Pagination({ meta }: { meta: PaginationMeta }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(meta.total / meta.limit);

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pages = [];

  if (totalPages >= 1) pages.push(1);
  if (totalPages >= 2) pages.push(2);
  if (totalPages > 3) pages.push("...");
  if (totalPages > 2) pages.push(totalPages);

  return (
    <div className="mt-12 flex justify-center">
      <nav className="flex items-center gap-1">
        {/* Prev */}
        <button
          disabled={meta.page === 1}
          onClick={() => router.push(createPageURL(meta.page - 1))}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-50"
        >
          <ChevronLeftIcon className="size-4" />
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span key={i} className="px-2 text-slate-400">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => router.push(createPageURL(Number(p)))}
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                meta.page === p
                  ? "bg-primary text-white font-bold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {p}
            </button>
          ),
        )}

        {/* Next */}
        <button
          disabled={meta.page === totalPages}
          onClick={() => router.push(createPageURL(meta.page + 1))}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-50"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </nav>
    </div>
  );
}
