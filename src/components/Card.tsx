import Image from "next/image";
import Link from "next/link";

interface CardProps {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
  alt: string;
}

function Card({ name, population, region, capital, flag, alt }: CardProps) {
  return (
    <div className="relative h-full cursor-pointer overflow-hidden rounded-md bg-dark-text-light-elements text-light-text shadow-md transition-all focus-within:-translate-y-3 focus-within:shadow-xl focus-within:ring-4 focus-within:ring-dark-elements hover:-translate-y-3 hover:shadow-xl dark:bg-dark-elements dark:text-dark-text-light-elements dark:focus-within:ring-dark-text-light-elements">
      <picture>
        <Image
          src={flag}
          alt={alt || "Country flag"}
          width={264}
          height={500}
          className="aspect-[18/11] w-full max-w-full object-cover"
        />
      </picture>
      <div className="p-8">
        <h2 className="mb-8 overflow-x-hidden text-ellipsis text-nowrap text-xl font-extrabold">
          {name}
        </h2>
        <p className="overflow-x-hidden text-ellipsis text-nowrap text-lg font-semibold">
          Population:{" "}
          <span className="font-light">{population.toLocaleString()}</span>
        </p>
        <p className="text-lg font-semibold">
          Region: <span className="font-light">{region}</span>
        </p>
        <p className="overflow-x-hidden text-ellipsis text-nowrap text-lg font-semibold">
          Capital: <span className="font-light">{capital}</span>
        </p>
      </div>
      <Link
        href={`/details/${name}`}
        aria-label={`See more details about ${name}`}
        className="absolute inset-0 h-full w-full"
      ></Link>
    </div>
  );
}

export default Card;
