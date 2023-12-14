import { createEntranceApplication } from "@/app/data/applicationclient";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EntranceApply = ({ entrance, candidate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { mutate: createMutate, isLoading: mutationLoading } = useMutation({
    mutationFn: (data) => createEntranceApplication(data),
    onSettled: (data, error, variables, context) => {
      if (!data.errors) {
        router.push(
          `/agent/candidate/${entrance.code.toLowerCase()}/${data.id}`
        );
      } else {
        setIsSubmitting(false);
      }
    },
  });

  async function createApplication() {
    setIsSubmitting(true);
    await createMutate({
      examId: entrance.Exam[0].id,
      candidateId: candidate.id,
    });
  }
  return (
    <div className="bg-white shadow rounded-md sm:rounded-lg pt-1">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-base font-semibold leading-6 text-gray-900">
          {entrance.code.toUpperCase()} - {entrance.name}{" "}
          {entrance.Exam[0].description}
        </h2>
        <div className="mt-2 sm:flex sm:items-start sm:justify-between">
          <div className="max-w-xl text-sm text-gray-500">
            <p>{entrance.description}</p>
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

export default EntranceApply;
