"use client";
import {
  ArrowSmallRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";

const JeeProceedPayment = ({ application }) => {
  const router = useRouter();
  return (
    <div>
      <p className="text-sm my-3 flex items-center gap-3">
        <InformationCircleIcon className="h-6 w-6 text-pink-700 flex-shrink-0" />
        Kindly complete the payment process to consider your application for
        B.Tech admission with JEE Mains Percentile.
      </p>
      <div className="flex justify-center mt-6 mb-8">
        <div className="flex justify-center mt-6 mb-8">
          <button
            type="button"
            onClick={() => router.push(`/jee/${application.id}/payment`)}
            className="inline-flex items-center gap-x-2 rounded-md bg-pink-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
          >
            Proceed to Payment
            <ArrowSmallRightIcon
              className="-ml-0.5 h-5 w-5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JeeProceedPayment;
