import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const Success = () => {
  return (
    <div className="bg-white shadow-sm border border-green-300 rounded-lg mt-10 px-5 py-5 max-w-lg mx-auto">
      <p className="text-sm mb-4 flex items-center gap-2">
        <HandThumbUpIcon
          className="h-8 w-8 text-green-500"
          aria-hidden="true"
        />{" "}
        Payment Successful
      </p>
      <p className="text-3xl font-bold mb-2 text-gray-800">
        Thanks for Registering
      </p>
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

export default Success;
