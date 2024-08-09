import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const nunito = Nunito_Sans({
  weight: ["300", "600", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Rest Countries",
    default: "Home | Rest Countries",
  },
  description:
    "This is a solution to the REST Countries API with color theme switcher challenge on Frontend Mentor. Frontend Mentor challenges help you improve your coding skills by building realistic projects.",
  metadataBase: new URL("https://rest-countries-api-two-teal.vercel.app"),
  keywords: ["countries", "rest api", "frontend mentor", "nextjs"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} w-full bg-light-background transition dark:bg-dark-background`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
