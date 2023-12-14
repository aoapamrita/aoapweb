import Link from "next/link";
import React from "react";

const JeeApplication = ({ jeeapplication }) => {
  console.log("insde jee appln", jeeapplication);

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow py-3">
      <h2 className="sr-only" id="profile-overview-title">
        JEE Application Overview
      </h2>
      <div className="bg-white p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                Application for B.Tech with JEE Mains{" "}
                {jeeapplication.jee.description} Percentile
              </p>
              <p className="text-sm font-medium text-gray-600">
                {jeeapplication.status === "PENDING"
                  ? "Registration Pending"
                  : `Registration Completed`}
              </p>
            </div>
          </div>
          <div className="mt-5 flex justify-center sm:mt-0">
            <Link
              href={`/jee/${jeeapplication.id}`}
              className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {jeeapplication.status === "PENDING"
                ? "Registration Pending"
                : `Registration Completed`}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JeeApplication;
