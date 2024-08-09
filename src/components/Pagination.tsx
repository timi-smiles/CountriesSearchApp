"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { generatePagination } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

interface PageArrowProps extends PaginationProps {
  href: string;
  direction: string;
}

function Pagination({ currentPage, totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const pages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  useEffect(() => {
    const isNotFiltering =
      !searchParams.has("search") && !searchParams.has("region");
    const isMoreThanTotal = currentPage > totalPages;
    const isLessThanTotal = currentPage <= 0;

    if ((isMoreThanTotal && isNotFiltering) || isLessThanTotal) {
      replace("?page=1");
    }
  }, [currentPage, totalPages, searchParams, replace]);

  return (
    <div className="mx-auto mt-12 flex w-fit flex-wrap justify-center">
      <PageArrow
        href={createPageURL(currentPage - 1)}
        direction="left"
        currentPage={currentPage}
        totalPages={totalPages}
      />
      {pages.map((page, index) => (
        <Link
          href={createPageURL(page)}
          aria-label={page !== "..." ? `Page ${page}` : "Others pages"}
          key={index}
          className={clsx(
            "grid h-10 w-10 place-items-center bg-dark-text-light-elements text-light-text hover:brightness-95 focus:ring-0 focus:brightness-95 dark:bg-dark-elements dark:text-dark-text-light-elements dark:hover:brightness-125 dark:focus:brightness-125",
            currentPage === page && "brightness-95 dark:brightness-125",
            page === "..." &&
              "pointer-events-none opacity-50 hover:brightness-100 dark:hover:brightness-100",
          )}
        >
          {page}
        </Link>
      ))}
      <PageArrow
        href={createPageURL(currentPage + 1)}
        direction="right"
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

function PageArrow({
  href,
  direction,
  currentPage,
  totalPages,
}: PageArrowProps) {
  return (
    <Link
      href={href}
      aria-label="Next Page"
      className={clsx(
        "grid h-10 w-10 place-items-center rounded-e bg-dark-text-light-elements text-light-text hover:brightness-95 focus:ring-0 focus:brightness-95 dark:bg-dark-elements dark:text-dark-text-light-elements dark:hover:brightness-125 dark:focus:brightness-125",
        direction === "left" &&
          currentPage <= 1 &&
          "pointer-events-none opacity-50 hover:brightness-100 dark:hover:brightness-100",
        direction === "right" &&
          currentPage >= totalPages &&
          "pointer-events-none opacity-50 hover:brightness-100 dark:hover:brightness-100",
        direction === "left" ? "rounded-s" : "rounded-e",
      )}
    >
      {direction === "left" ? (
        <ChevronLeftIcon className="size-4" />
      ) : (
        <ChevronRightIcon className="size-4" />
      )}
    </Link>
  );
}

export default Pagination;
