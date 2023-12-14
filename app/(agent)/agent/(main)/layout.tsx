import "../../../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import TanStackProvider from "@/app/components/tanstackprovides";
import getAgentUser from "@/app/data/agent/getagentuser";
import { UserProvider } from "./components/UserProvider";
import SideBarTwoColumn from "./components/sidebarnav";

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
  const user = await getAgentUser();
  console.log(user);

  if (!user) {
    redirect("/agent");
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
