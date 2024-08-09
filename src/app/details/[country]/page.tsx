import Image from "next/image";
import Link from "next/link";

import { getCountryDetails } from "@/lib/data";
import BackButton from "@/components/BackButton";
import { Metadata } from "next";
import NotFoundPage from "@/app/not-found";

export const metadata: Metadata = {
  title: "Country Details",
  description: "Relevant details about countries.",
  keywords: ["capital", "population", "region"],
};

async function DetailsPage({ params }: { params: { country: string } }) {
  const countryName = params.country.replaceAll("%20", " ");
  const data = await getCountryDetails(countryName);

  if (!data) return <NotFoundPage />;

  return (
    <main className="mx-auto max-w-screen-xl px-4 pb-12">
      <div className="pb-12 pt-8 lg:pt-12">
        <BackButton />
      </div>
      <article className="flex max-w-full flex-col gap-y-12 text-light-text dark:text-dark-text-light-elements sm:flex-row sm:gap-x-8 lg:items-center lg:justify-between lg:gap-x-12">
        <picture className="sm:w-1/2">
          <Image
            src={data.flags.svg}
            alt={data.flags.alt || `${data.name.common} flag`}
            width={100}
            height={70}
            className="w-full"
          />
        </picture>
        <div className="flex flex-col gap-8 text-base font-semibold sm:w-1/2">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-y-2">
              <h2 className="mb-6 overflow-x-hidden text-ellipsis text-nowrap text-xl font-extrabold lg:text-2xl">
                {data.name.common}
              </h2>
              <p>
                Native Name:{" "}
                <span className="font-light">{data.nativeName.join(", ")}</span>
              </p>
              <p>
                Population:{" "}
                <span className="font-light">
                  {data.population.toLocaleString()}
                </span>
              </p>
              <p>
                Region: <span className="font-light">{data.region}</span>
              </p>
              <p>
                Sub Region: <span className="font-light">{data.subregion}</span>
              </p>
              <p>
                Capital: <span className="font-light">{data.capital}</span>
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <p>
                Top Level Domain:{" "}
                <span className="font-light">{data.tld.join(", ")}</span>
              </p>
              <p>
                Currencies:{" "}
                <span className="font-light">
                  {data.currenciesName.join(", ")}
                </span>
              </p>
              <p>
                Languages:{" "}
                <span className="font-light">
                  {data.languagesName.join(", ")}
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <h3>Border Countries:</h3>
            {data.bordersName && data.bordersName.length > 0 ? (
              data.bordersName.map((border) => (
                <Link
                  key={border}
                  href={`/details/${border}`}
                  aria-label={`More details about ${border}`}
                  className="rounded bg-dark-text-light-elements px-6 py-1 text-light-text shadow-[0px_0px_6px_rgba(0,0,0,0.3)] hover:brightness-[97%] dark:bg-dark-elements dark:text-dark-text-light-elements dark:hover:brightness-125"
                >
                  {border}
                </Link>
              ))
            ) : (
              <p className="font-light">No border countries.</p>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}

export default DetailsPage;
