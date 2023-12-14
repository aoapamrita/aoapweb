import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TanStackProvider from "../components/tanstackprovides";
import Footer from "./onboarding/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Amrita Online Application Portal (AOAP) managed by Directorate of Admissions.",
  description:
    "Amrita Online Application Portal (AOAP) managed by Directorate of Admissions.",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`${inter.className} h-full`}>
        <TanStackProvider>{children}</TanStackProvider>
        <Footer />
      </body>
    </html>
  );
}
