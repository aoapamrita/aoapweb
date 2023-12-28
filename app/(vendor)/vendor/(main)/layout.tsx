import "../../../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import TanStackProvider from "@/app/components/tanstackprovides";
import { UserProvider } from "./components/UserProvider";
import SideBarTwoColumn from "./components/sidebarnav";
import getVendorUser from "@/app/data/vendor/getvendoruser";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AOAP Agent",
  description: "AOAP Agent",
};

export default async function AdminMainRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getVendorUser();
  console.log(user);

  if (!user) {
    redirect("/vendor");
  }
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`${inter.className} h-full`}>
        <SideBarTwoColumn user={user}>
          <TanStackProvider>
            <UserProvider user={user}>{children}</UserProvider>
          </TanStackProvider>
        </SideBarTwoColumn>
      </body>
    </html>
  );
}
