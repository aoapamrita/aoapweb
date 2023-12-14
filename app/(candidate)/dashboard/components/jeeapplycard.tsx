import { createJeeApplication } from "@/app/data/jee";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const JeeApplyCard = ({ jee }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { mutate: createMutate, isLoading: mutationLoading } = useMutation({
    mutationFn: (data) => createJeeApplication(data),
    onSettled: (data, error, variables, context) => {
      if (!data.errors) {
        router.push(`/jee/${data.id}`);
      } else {
        setIsSubmitting(false);
      }
    },
  });

  async function createApplication() {
    setIsSubmitting(true);
    await createMutate({ jeeId: jee.id });
  }

  return (
    <div className="bg-white shadow rounded-md sm:rounded-lg pt-1">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-base font-semibold leading-6 text-gray-900">
          Apply for B.Tech with JEE Mains {jee.description} Percentile
        </h2>
        <div className="mt-2 sm:flex sm:items-start sm:justify-between">
          <div className="max-w-xl text-sm text-gray-500">
            <p>
              This option is to apply for B.Tech admission based only on the JEE
              Mains {jee.description} percentile.
            </p>
          </div>
          <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
            <button
              onClick={createApplication}
              disabled={isSubmitting}
              className="inline-flex items-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
            >
              {isSubmitting ? "Processing..." : "Register Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JeeApplyCard;
