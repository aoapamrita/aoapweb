"use client";
import getCandidate from "@/app/data/getCandidate";
import React from "react";
import CldPicture from "../components/cldpicture";
import { useQuery } from "@tanstack/react-query";
import * as yup from "yup";
import dayjs from "dayjs";
import DataLoader from "@/app/components/DataLoader";
import { getCandidateById } from "@/app/data/agent/candidate";
import { ArrowLeftIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { PiSignatureBold } from "react-icons/pi";
import { useRouter } from "next/navigation";
import ValueDisplay from "./valuedisplay";
import ValueSelectDisplay from "./valueselectdisplay";
import getGender from "@/app/data/getGender";
import getSocialStatus from "@/app/data/getSocialStatus";
import getInfoSource from "@/app/data/getInfoSource";
import ValueDateDisplay from "./valuedatedisplay";
import ValuePhotoDisplay from "./valuephotodisplay";
import ValueSignDisplay from "./valuesigndisplay";
const PersonalInfo = ({ candidateId }) => {
  const router = useRouter();

  const {
    data: candidate,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["candidate", candidateId],
    queryFn: () => getCandidateById(candidateId),
  });

  const handleGoBack = () => {
    router.back();
  };

  const handleRefetchData = async () => {
    refetch();
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
                <ValuePhotoDisplay
                  candidateId={candidate.id}
                  value={candidate.photoid}
                  refetchData={handleRefetchData}
                />
              </dt>
              <dd className="mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                <p className="mb-2">Signature</p>
                <ValueSignDisplay
                  candidateId={candidate.id}
                  value={candidate.signid}
                  refetchData={handleRefetchData}
                />
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Full name
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <ValueDisplay
                  refetchData={handleRefetchData}
                  candidateId={candidate.id}
                  field="fullname"
                  value={candidate.fullname && candidate.fullname}
                  schema={yup.object().shape({
                    fullname: yup.string().required("Name Required"),
                  })}
                />
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Date of Birth
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <ValueDateDisplay
                  refetchData={handleRefetchData}
                  candidateId={candidate.id}
                  field="dob"
                  value={candidate.dob}
                  schema={yup.object().shape({
                    dob: yup
                      .date()
                      .required("DOB is required")
                      .min(
                        new Date("2002-12-31"),
                        "DOB must be on or after January 1, 2003"
                      )
                      .max(
                        new Date("2007-12-31"),
                        "DOB must be on or before December 31, 2007"
                      ),
                  })}
                />
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Gender
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <ValueSelectDisplay
                  refetchData={handleRefetchData}
                  candidateId={candidate.id}
                  field="genderId"
                  value={candidate.gender}
                  schema={yup.object().shape({
                    genderId: yup.number().positive("Gender is required"),
                  })}
                  queryKey="gender"
                  queryFn={getGender}
                />
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Social Status
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <ValueSelectDisplay
                  refetchData={handleRefetchData}
                  candidateId={candidate.id}
                  field="socialstatusId"
                  value={candidate.socialstatus}
                  schema={yup.object().shape({
                    socialstatusId: yup
                      .number()
                      .positive("Social Status is required"),
                  })}
                  queryKey="socialstatus"
                  queryFn={getSocialStatus}
                />
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
                <ValueDisplay
                  refetchData={handleRefetchData}
                  candidateId={candidate.id}
                  field="aadhaarnumber"
                  value={candidate.aadhaarnumber}
                  schema={yup.object().shape({
                    aadhaarnumber: yup
                      .string()
                      .matches(
                        /^\d{12}$/,
                        "Aadhar number must be exactly 12 digits"
                      )
                      .required("Aadhar number is required"),
                  })}
                />
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                How did you come to know about Amrita?
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <ValueSelectDisplay
                  refetchData={handleRefetchData}
                  candidateId={candidate.id}
                  field="infosourceId"
                  value={candidate.infosource}
                  schema={yup.object().shape({
                    infosourceId: yup.number().positive("Source is required"),
                  })}
                  queryKey="infosource"
                  queryFn={getInfoSource}
                />
              </dd>
            </div>
          </>
        )}
      </dl>
    </div>
  );
};

export default PersonalInfo;
