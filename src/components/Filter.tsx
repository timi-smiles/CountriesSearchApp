"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Filter() {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  function handleChangeRegion(region: string) {
    setValue(region);

    const params = new URLSearchParams(searchParams);

    params.delete("page");
    if (region && region !== "All") params.set("region", region);
    else params.delete("region");

    replace(`${pathname}?${params.toString()}`);
    setShow(false);
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    const param = params.get("region")?.toString();
    if (param) setValue(param);
  }, [searchParams]);

  return (
    <div className="relative max-w-60 text-dark-elements dark:text-dark-text-light-elements">
      <div
        className="group peer flex cursor-pointer items-center justify-between gap-x-2 rounded-lg bg-dark-text-light-elements px-6 py-4 shadow-md outline-none transition focus:ring focus:ring-dark-elements dark:bg-dark-elements dark:focus:ring-dark-text-light-elements"
        id="filter"
        aria-label="Filter by region"
        aria-expanded={show}
        tabIndex={0}
        onClick={() => setShow(!show)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Spacebar") setShow(!show);
        }}
      >
        <span>
          {value === "" || value === "All" ? "Filter by Region" : value}
        </span>

        <ChevronDownIcon className="size-4 transition-transform group-aria-expanded:rotate-180" />
      </div>
      <ul
        aria-labelledby="filter"
        className="absolute top-16 z-10 flex max-h-0 w-full max-w-60 flex-col overflow-hidden rounded-lg bg-dark-text-light-elements py-0 shadow-md transition-all peer-aria-expanded:max-h-60 peer-aria-expanded:py-4 dark:bg-dark-elements"
      >
        {regions.map((region) => (
          <li key={region} className="flex flex-col">
            <button
              onClick={() => handleChangeRegion(region)}
              className="flex cursor-pointer justify-start px-6 py-1 hover:bg-light-background focus:bg-light-background focus:ring-0 dark:hover:bg-dark-background dark:focus:bg-dark-background"
            >
              {region}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Filter;
