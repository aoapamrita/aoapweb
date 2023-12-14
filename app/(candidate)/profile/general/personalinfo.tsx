"use client";
import getCandidate from "@/app/data/getCandidate";
import React from "react";
import CldPicture from "../components/cldpicture";
import { useQuery } from "@tanstack/react-query";

import dayjs from "dayjs";
import DataLoader from "@/app/components/DataLoader";
const PersonalInfo = () => {
  const { data: candidate, isLoading } = useQuery({
    queryKey: ["candidate"],
    queryFn: () => getCandidate(),
  });

  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Profile
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-500">
        Please find your profile information below.
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
                <CldPicture
                  width="150"
                  height="250"
                  src={candidate.photoid}
                  sizes="100vw"
                  alt="Description of my image"
                  className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                />
              </dt>
              <dd className="mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                <p className="font-medium text-gray-900 mb-2">Signature</p>
                <CldPicture
                  width="500"
                  height="100"
                  src={candidate.signid}
                  sizes="100vw"
                  alt="Description of my image"
                  className="h-24 w-48 flex-none rounded-lg object-contain border border-gray-200"
                />
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Full name
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{candidate.fullname}</div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Date of Birth
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">
                  {dayjs(candidate.dob).format("DD/MM/YYYY")}
                </div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Gender
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{candidate.gender.name}</div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Social Status
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">
                  {candidate.socialstatus.name}
                </div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Email
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{candidate.email}</div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Phone
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">
                  {candidate.phonecode} {candidate.phone}
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
                <div className="text-gray-900">{candidate.infosource.name}</div>
              </dd>
            </div>
          </>
        )}
      </dl>
    </div>
  );
};

export default PersonalInfo;
