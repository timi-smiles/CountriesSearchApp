import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="m-auto mt-12 flex w-fit flex-col gap-y-2 text-center text-light-text dark:text-dark-text-light-elements">
      <h2 className="text-3xl">Oops! Looks like you&apos;re lost :(</h2>
      <p>
        We couldn&apos;t find the page you&apos;re looking for. But don&apos;t
        worry, we can help you get back on track.
      </p>
      <Link
        href="/"
        className="mx-auto mt-2 w-fit rounded bg-dark-text-light-elements px-6 py-1 shadow-md hover:brightness-[97%] dark:bg-dark-elements dark:hover:brightness-125"
      >
        Go Back
      </Link>
    </div>
  );
}
