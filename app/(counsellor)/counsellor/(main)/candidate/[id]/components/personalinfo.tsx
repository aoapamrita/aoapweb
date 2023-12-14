"use client";
import getCandidate from "@/app/data/getCandidate";
import React from "react";
import CldPicture from "../components/cldpicture";
import { useQuery } from "@tanstack/react-query";

import dayjs from "dayjs";
import DataLoader from "@/app/components/DataLoader";
import { getCandidateById } from "@/app/data/agent/candidate";
import { ArrowLeftIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { PiSignatureBold } from "react-icons/pi";
import { useRouter } from "next/navigation";
const PersonalInfo = ({ candidateId }) => {
  const router = useRouter();

  const { data: candidate, isLoading } = useQuery({
    queryKey: ["candidate", candidateId],
    queryFn: () => getCandidateById(candidateId),
  });

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div>
      <div className="py-6">
        <button
          onClick={handleGoBack}
          className="font-semibold text-pink-600 flex gap-3"
        >
          <ArrowLeftIcon className="w-6 h-6" />
          Back
        </button>
      </div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Profile
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-500">
        Please find candidate details below.
      </p>
      <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
        {isLoading ? (
          <div className="pt-6 flex justify-center">
            <DataLoader />
          </div>
        ) : (
          <>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                <p className="mb-2">Photo</p>
                {candidate.photoid ? (
                  <CldPicture
                    width="150"
                    height="250"
                    src={candidate.photoid}
                    sizes="100vw"
                    alt="Description of my image"
                    className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                  />
                ) : (
                  <UserCircleIcon
                    className="h-24 w-24 text-gray-300"
                    aria-hidden="true"
                  />
                )}
              </dt>
              <dd className="mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                <p className="font-medium text-gray-900 mb-2">Signature</p>
                {candidate.signid ? (
                  <CldPicture
                    width="500"
                    height="100"
                    src={candidate.signid}
                    sizes="100vw"
                    alt="Description of my image"
                    className="h-24 w-48 flex-none rounded-lg object-contain border border-gray-200"
                  />
                ) : (
                  <PiSignatureBold
                    className="h-24 w-24 text-gray-300"
                    aria-hidden="true"
                  />
                )}
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Full name
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">
                  {candidate.fullname && candidate.fullname}
                </div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Date of Birth
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">
                  {candidate.dob && dayjs(candidate.dob).format("DD/MM/YYYY")}
                </div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Gender
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">
                  {candidate.gender && candidate.gender.name}
                </div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Social Status
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">
                  {candidate.socialstatus && candidate.socialstatus.name}
                </div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Email
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">
                  {candidate.email && candidate.email}
                </div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Phone
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">
                  {candidate.phone &&
                    `${candidate.phonecode} ${candidate.phone}`}
                </div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Aadhaar
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{candidate.aadhaarnumber}</div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                How did you come to know about Amrita?
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">
                  {candidate.infosource && candidate.infosource.name}
                </div>
              </dd>
            </div>
          </>
        )}
      </dl>
    </div>
  );
};

export default PersonalInfo;
