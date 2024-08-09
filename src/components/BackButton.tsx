"use client";

import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  return (
    <button onClick={handleBack} className="group inline-flex items-center gap-1 rounded bg-dark-text-light-elements px-6 py-1 text-light-text shadow-[0px_0px_6px_rgba(0,0,0,0.3)] hover:brightness-[97%] dark:bg-dark-elements dark:text-dark-text-light-elements dark:hover:brightness-125" >
      <ArrowLongLeftIcon className="size-5 transition-transform group-hover:-translate-x-1 group-focus:-translate-x-1" />
      Back
    </button>
  );
}

export default BackButton;
