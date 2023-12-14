"use client";
import DataLoader from "@/app/components/DataLoader";
import getCandidate from "@/app/data/getCandidate";
import getUser from "@/app/data/getuser";
import {
  EnvelopeIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CldPicture from "../../profile/components/cldpicture";
import Link from "next/link";

const DashProfile = () => {
  const { data: candidate, isLoading } = useQuery({
    queryKey: ["candidate"],
    queryFn: () => getCandidate(),
  });
  return (
    <div className="bg-white shadow rounded-md sm:rounded-lg pt-1">
      <div className=" bg-white px-4 py-5 sm:px-6">
        {isLoading ? (
          <DataLoader size="lg" />
        ) : (
          <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CldPicture
                    width="150"
                    height="250"
                    src={candidate.photoid}
                    sizes="100vw"
                    alt="Description of my image"
                    className="h-12 w-12 rounded-full"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    {candidate.fullname}
                  </h3>
                  <p className="text-sm text-gray-500">
                    <a href="#">{candidate.email}</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="ml-4 mt-4 flex flex-shrink-0">
              <Link
                href="/profile"
                className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <UserCircleIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>View Profile</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashProfile;
