"use client";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import v from "voca";
export default function BreadCrumbs({ application }) {
  const pathname = usePathname();
  const crumbs = pathname.split("/");
  //   if (crumbs[3] === "applications") {
  //     crumbs[2] = `no : ${application.reference}`;
  //   }

  crumbs[4] = `no : ${application.reference}`;

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        {crumbs.map((crumb) =>
          crumb === "" ? (
            <li key="home">
              <div>
                <Link
                  href="/agent/candidates"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <HomeIcon
                    className="h-5 w-5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Home</span>
                </Link>
              </div>
            </li>
          ) : (
            <li key={crumb}>
              <div className="flex items-center">
                <ChevronRightIcon
                  className="h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <p className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                  {v.capitalize(crumb)}
                </p>
              </div>
            </li>
          )
        )}
      </ol>
    </nav>
  );
}
