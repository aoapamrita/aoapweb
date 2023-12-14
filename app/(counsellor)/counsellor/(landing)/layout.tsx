import "../../../globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AOAP Counsellor",
  description: "AOAP Counsellor",
};

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`${inter.className} h-full`}>{children}</body>
    </html>
  );
}
