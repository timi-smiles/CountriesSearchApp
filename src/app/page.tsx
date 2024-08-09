import Card from "@/components/Card";
import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import { getCountriesPage } from "@/lib/data";

interface SearchParamsProps {
  searchParams: {
    page: string;
    search: string;
    region: string;
  };
}

export default async function Home({ searchParams }: SearchParamsProps) {
  const countries = await getCountriesPage(
    Number(searchParams.page) || 1,
    searchParams.search,
    searchParams.region,
  );

  return (
    <main className="mx-auto min-h-screen max-w-screen-xl px-4 pb-12">
      <div className="flex flex-col gap-y-8 py-8 md:flex-row md:justify-between">
        <Search />
        <Filter />
      </div>
      {countries && countries.data.length > 0 ? (
        <section className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {countries.data.map((country) => (
            <Card
              key={country.name.common}
              name={country.name.common}
              capital={country.capital}
              population={country.population}
              region={country.region}
              flag={country.flags.svg}
              alt={country.flags.alt || `${country.name.common} flag.`}
            />
          ))}
        </section>
      ) : (
        <section className="mx-auto w-fit">
          <h2 className="text-3xl font-extrabold text-light-text dark:text-dark-text-light-elements">
            No results found for: &quot;{searchParams.search}&quot;
          </h2>
        </section>
      )}
      <Pagination
        currentPage={Number(searchParams.page) || 1}
        totalPages={countries?.totalPages || 0}
      />
    </main>
  );
}
