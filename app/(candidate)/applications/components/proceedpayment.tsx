"use client";
import { ArrowSmallRightIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import React from "react";

const ProceedPayment = ({ application }) => {
  const router = useRouter();
  return (
    <div className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
      <button
        type="button"
        onClick={() => router.push(`/applications/${application.id}/payment`)}
        className="inline-flex items-center gap-x-2 rounded-md bg-pink-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
      >
        Proceed to Payment
        <ArrowSmallRightIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
};

export default ProceedPayment;
