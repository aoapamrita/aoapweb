import DataLoader from "@/app/components/DataLoader";
import getCandidateParent from "@/app/data/getCandidateParent";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ParentInfo = () => {
  const { data: parentInfo, isLoading } = useQuery({
    queryKey: ["candidate", "parent"],
    queryFn: () => getCandidateParent(),
  });
  console.log("parentInfo", parentInfo);

  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Parent’s / Guardian’s Information
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-500">
        Details of Parent / Guardian
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
                Parent’s / Guardian’s Name
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{parentInfo.fullname}</div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Parent’s / Guardian’s Email address
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{parentInfo.email}</div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Parent’s / Guardian’s Phone
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">
                  {parentInfo.phonecode} {parentInfo.phone}
                </div>
              </dd>
            </div>
          </>
        )}
      </dl>
    </div>
  );
};

export default ParentInfo;
