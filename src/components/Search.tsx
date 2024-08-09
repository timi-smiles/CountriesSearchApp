"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams);

    params.delete("page");
    if (value) params.set("search", value);
    else params.delete("search");

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <label
      htmlFor="search"
      className="flex rounded-lg bg-dark-text-light-elements p-4 text-light-input shadow-md transition focus-within:ring focus-within:ring-dark-elements dark:bg-dark-elements dark:text-dark-text-light-elements dark:focus-within:ring-dark-text-light-elements md:w-96"
    >
      <div className="my-auto pr-4">
        <MagnifyingGlassIcon className="size-5" />
      </div>
      <input
        type="text"
        name="search"
        id="search"
        className="w-full bg-transparent outline-none"
        placeholder="Search for a country..."
        onChange={(e) => handleSearch(e.target.value)}
      />
    </label>
  );
}

export default Search;
