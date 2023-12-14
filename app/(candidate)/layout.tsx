import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SuperHeader from "./components/super-header";
import getUser from "../data/getuser";
import { redirect } from "next/navigation";
import Footer from "./dashboard/components/footer";
import TanStackProvider from "../components/tanstackprovides";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Amrita Online Application Portal (AOAP) managed by Directorate of Admissions.",
  description:
    "Amrita Online Application Portal (AOAP) managed by Directorate of Admissions.",
};

export default async function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  if (!user.onboardingstatus) {
    redirect("/onboarding");
  }

  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`${inter.className} h-full`}>
        <div className="min-h-full flex flex-col">
          <SuperHeader user={user} />
          <div className="flex-1">
            <TanStackProvider>{children}</TanStackProvider>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
