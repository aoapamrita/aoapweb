"use client";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import signOut from "@/app/data/signout";
import { CldImage } from "next-cloudinary";

const navigation = [
  { name: "Dashboard", href: "vendor/dashboard" },
  //   { name: "Applications", href: "applications" },
];
const userNavigation = [{ name: "My Profile", href: "/vendor/profile" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SuperHeader = ({ user }) => {
  const fullPath = usePathname();
  const pathname = fullPath.split("/")[1];
  const router = useRouter();

  console.log(user);

  async function handleSignout(e) {
    e.preventDefault();
    await signOut();
    router.replace("/vendor");
  }

  return (
    <Disclosure as="nav" className="bg-pink-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href="/agent/dashboard">
                    <Image
                      priority
                      src="/images/logo.svg"
                      height={32}
                      width={32}
                      alt="Logo"
                      className="w-auto h-auto"
                    />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={`/${item.href}`}
                        className={classNames(
                          item.href === pathname
                            ? "bg-pink-900 text-white"
                            : "text-white hover:bg-pink-700 hover:text-pink-50",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={
                          item.href === pathname ? "page" : undefined
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex max-w-xs items-center rounded-full bg-pink-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <UserCircleIcon className="h-8 w-8 rounded-full" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <Link
                                href={item.href}
                                className={classNames(
                                  active ? "bg-pink-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="#"
                              onClick={handleSignout}
                              className={classNames(
                                active ? "bg-pink-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-pink-800 p-2 text-white hover:bg-pink-700 hover:text-pink-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pink-800">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={`/${item.href}`}
                  className={classNames(
                    item.href === pathname
                      ? "bg-pink-900 text-white"
                      : "text-white hover:bg-pink-700 hover:text-pink-50",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.href === pathname ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <UserCircleIcon
                    className="block h-6 w-6"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {/* Put Name */}
                  </div>
                  <div className="text-sm font-medium text-pink-200">
                    Campusv
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-pink-700 hover:text-pink-200"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                <Disclosure.Button
                  as="a"
                  href="#"
                  onClick={handleSignout}
                  className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-pink-700 hover:text-pink-200"
                >
                  Sign Out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default SuperHeader;