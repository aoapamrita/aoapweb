"use client";
import React from "react";
import {
  UserCircleIcon,
  AcademicCapIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "General", href: "/profile", icon: UserCircleIcon },
  {
    name: "Academic",
    href: "/profile/academic",
    icon: AcademicCapIcon,
  },
  {
    name: "Payments",
    href: "/profile/payments",
    icon: CurrencyRupeeIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SideNav = () => {
  const pathname = usePathname();
  return (
    <nav className="flex-none px-4 sm:px-6 lg:px-0">
      <ul
        role="list"
        className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col"
      >
        {navItems.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className={classNames(
                pathname === item.href
                  ? "bg-gray-50 text-pink-600"
                  : "text-gray-700 hover:text-pink-600 hover:bg-gray-50",
                "group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold"
              )}
            >
              <item.icon
                className={classNames(
                  pathname === item.href
                    ? "text-pink-600"
                    : "text-gray-400 group-hover:text-pink-600",
                  "h-6 w-6 shrink-0"
                )}
                aria-hidden="true"
              />
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
