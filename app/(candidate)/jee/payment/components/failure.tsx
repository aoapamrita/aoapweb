import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const Failure = () => {
  return (
    <div className="bg-white shadow-sm border border-red-400 rounded-lg mt-10 px-5 py-5 max-w-lg mx-auto">
      <p className="text-sm mb-4 flex items-center gap-2">
        <ExclamationTriangleIcon
          className="h-8 w-8 text-red-500"
          aria-hidden="true"
        />{" "}
        Payment Failed
      </p>
      <p className="text-3xl font-bold mb-2 text-gray-800">Please try again.</p>
      <p>
        Please{" "}
        <Link href="/dashboard" className="text-pink-800 cursor-pointer">
          {" "}
          click here{" "}
        </Link>
        to go to dashboard.
      </p>
    </div>
  );
};

export default Failure;
