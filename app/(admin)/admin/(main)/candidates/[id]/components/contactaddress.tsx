"use client";
import DataLoader from "@/app/components/DataLoader";
import { getCandidateById } from "@/app/data/agent/candidate";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import EditContactAddress from "./editcontactaddress";

const ContactAddress = ({ candidateId }) => {
  const [editMode, setEditMode] = useState(false);

  const {
    data: candidate,
    isLoading,
    refetch: refetchData,
  } = useQuery({
    queryKey: ["candidate", candidateId],
    queryFn: () => getCandidateById(candidateId),
  });

  async function completeEdit() {
    refetchData();
    setEditMode(false);
  }

  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Address
      </h2>
      <div className="flex items-center justify-between">
        <p className="mt-1 text-sm leading-6 text-gray-500">Contact Address</p>
        {isLoading ? null : editMode ? null : (
          <button
            onClick={() => setEditMode(true)}
            className="text-sm rounded-md bg-white font-medium text-pink-600 hover:text-pink-500"
          >
            Update
          </button>
        )}
      </div>
      <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
        {isLoading ? (
          <div className="pt-6 flex justify-center">
            <DataLoader />
          </div>
        ) : editMode ? (
          <EditContactAddress
            completeEdit={completeEdit}
            candidate={candidate}
          />
        ) : (
          <>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                State
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">
                  {candidate.state && candidate.state.name}
                </div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                District
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">
                  {candidate.district && candidate.district.name}
                </div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                City
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">
                  {candidate.city ? candidate.city.name : candidate.otherCity}
                </div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Address Line 1
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{candidate.address1}</div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Address Line 2
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-400 ">{candidate.address2}</div>
              </dd>
            </div>
          </>
        )}
      </dl>
    </div>
  );
};

export default ContactAddress;
