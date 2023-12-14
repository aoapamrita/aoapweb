import DataLoader from "@/app/components/DataLoader";
import { getApplicationByExam } from "@/app/data/applicationclient";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import ApplicationStats from "./ApplicationStats";

const ActiveApplicationSummary = ({ entrance }) => {
  const { data: application, isLoading } = useQuery({
    queryKey: ["application", "exam", entrance.Exam[0].id],
    queryFn: () => getApplicationByExam({ examid: entrance.Exam[0].id }),
  });

  console.log("application", application);
  console.log("entrance", entrance.Exam[0].id);

  return (
    <>
      {isLoading ? (
        <div className="py-6 flex justify-center">
          <DataLoader />
        </div>
      ) : application ? (
        <ApplicationStats application={application} />
      ) : (
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
                <Link
                  href={`/applications/aeee/${entrance.Exam[0].id}`}
                  className="inline-flex items-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
                >
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActiveApplicationSummary;
