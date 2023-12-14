"use client";
import { updateJeeApplication } from "@/app/data/jee";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const JeeCompleteReg = ({ application }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { mutate: updateMutate, isLoading: mutationLoading } = useMutation({
    mutationFn: (data) => updateJeeApplication(data),
    onSettled: (data, error, variables, context) => {
      console.log("got here 12");

      if (!data.errors) {
        console.log("got here 13");
        router.refresh();
      } else {
        setIsSubmitting(false);
      }
    },
  });

  async function updateApplication() {
    setIsSubmitting(true);
    await updateMutate({ id: application.id, input: { status: "REGISTERED" } });
  }
  return (
    <div>
      <p className="text-sm my-3 flex items-center gap-3">
        <InformationCircleIcon className="h-6 w-6 text-pink-700 flex-shrink-0" />
        The payment is already settled with AEEE entrance fee, and there is no
        outstanding amount. Please proceed to complete the registration using
        the button below.
      </p>
      <div className="flex justify-center mt-6 mb-8">
        <button
          type="button"
          onClick={updateApplication}
          disabled={isSubmitting}
          className="inline-flex items-center gap-x-2 rounded-md bg-pink-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
        >
          {isSubmitting ? "Processing..." : "Complete Registration"}
        </button>
      </div>
    </div>
  );
};

export default JeeCompleteReg;
