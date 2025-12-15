"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
}

const TablePagination = ({ currentPage, totalPages }: TablePaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const navigatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2">
      <Button
        disabled={isPending || currentPage === 1}
        onClick={() => navigatePage(currentPage - 1)}
        variant={"outline"}
        size={"sm"}
      >
        <ChevronLeft className="mr-1 size-4" />
        previous
      </Button>

      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
          let pageNumber;

          if (totalPages <= 5) {
            pageNumber = index + 1;
          } else if (totalPages <= 3) {
            pageNumber = index + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNumber = totalPages - 4 + index;
          } else {
            pageNumber = currentPage - 2 + index;
          }
          return pageNumber;
        }).map((page) => (
          <Button
            key={page}
            disabled={isPending || currentPage === page}
            onClick={() => navigatePage(page)}
            variant={currentPage === page ? "default" : "outline"}
            size={"sm"}
            className="w-10"
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        disabled={isPending || currentPage === totalPages}
        onClick={() => navigatePage(currentPage + 1)}
        variant={"outline"}
        size={"sm"}
      >
        <ChevronRight className="mr-1 size-4" />
        Next
      </Button>

      <span className="text-sm text-muted-foreground ml-2">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default TablePagination;
