"use client";

import { MoonIcon as MoonSolid } from "@heroicons/react/24/solid";
import { MoonIcon as MoonOutline } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Link from "next/link";

function Header() {
  const isWindowDefined = typeof window !== "undefined";
  const isDark = isWindowDefined && localStorage.getItem("dark") !== null;
  const [dark, setDark] = useState(isDark || false);

  function handleToggleTheme() {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  }

  if (isWindowDefined) {
    dark
      ? localStorage.setItem("dark", "true")
      : localStorage.removeItem("dark");
  }

  useEffect(() => {
    const isDark = localStorage.getItem("dark");
    if (isDark) document.documentElement.classList.add("dark");
  }, []);

  return (
    <header className="w-full bg-dark-text-light-elements shadow-md transition dark:bg-dark-elements">
      <div className="mx-auto flex max-w-screen-xl justify-between px-4 py-8 text-base transition dark:text-dark-text-light-elements">
        <Link href="/" aria-label="Return to Homepage">
          <h1 className="font-extrabold">Where in the world?</h1>
        </Link>
        <button
          className="flex items-center gap-x-2 font-semibold"
          onClick={handleToggleTheme}
        >
          {dark ? (
            <MoonSolid className="size-4" />
          ) : (
            <MoonOutline className="size-4" />
          )}{" "}
          Dark Mode
        </button>
      </div>
    </header>
  );
}

export default Header;
