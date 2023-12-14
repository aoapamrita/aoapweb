import "../../../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import TanStackProvider from "@/app/components/tanstackprovides";
import SuperHeader from "../components/super-header";
import Footer from "../components/footer";
import { UserProvider } from "./components/UserProvider";
import getCounsellorUser from "@/app/data/counsellor/getcounselloruser";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AOAP Counsellor",
  description: "AOAP Counsellor",
};

export default async function AdminMainRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCounsellorUser();
  console.log(user);

  if (!user) {
    redirect("/counsellor");
  }
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`${inter.className} h-full`}>
        <div className="min-h-full flex flex-col">
          <SuperHeader user={user} />
          <div className="flex-1">
            <TanStackProvider>
              <UserProvider user={user}>{children}</UserProvider>
            </TanStackProvider>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
