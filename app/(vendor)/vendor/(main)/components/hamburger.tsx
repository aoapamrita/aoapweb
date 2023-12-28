"use client";
import React from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { $menuopen, toggle } from "@/app/stores/adminmenu";
import { useStore } from "@nanostores/react";

const Hamburger = () => {
  return (
    <button
      type="button"
      className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
      onClick={() => toggle(true)}
    >
      <span className="sr-only">Open sidebar</span>
      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
};

export default Hamburger;
