"use client";
import DataLoader from "@/app/components/DataLoader";
import { getCandidatePlustwoById } from "@/app/data/agent/candidate";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ValuePlusTwo from "./valueplustwo";

const PlusTwo = ({ candidateId }) => {
  const {
    data: plusttwo,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["candidate", "plustwo", candidateId],
    queryFn: () => getCandidatePlustwoById(candidateId),
  });

  const handleRefetchData = async () => {
    refetch();
  };

  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        12th Standard
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-500">
        Details of 12th Standard.
      </p>
      <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
        {isLoading ? (
          <div className="pt-6 flex justify-center">
            <DataLoader />
          </div>
        ) : plusttwo ? (
          <>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                12th Standard State
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <ValuePlusTwo
                  candidateId={candidateId}
                  value={plusttwo}
                  refetchData={handleRefetchData}
                />
              </dd>
            </div>
          </>
        ) : (
          <p>No Data Present</p>
        )}
      </dl>
    </div>
  );
};

export default PlusTwo;
