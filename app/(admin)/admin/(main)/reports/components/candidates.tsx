"use client";
import {getAllCandidatesInfo, getAllCandidatesInfoByStatus, getAllAppliedCandidatesInfo } from "@/app/data/reports/candidate";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import FileDownload from "js-file-download";
import DataLoader from "@/app/components/DataLoader";

const Candidates = () => {
  const [isFetching, setIsFetching] = useState(false);

  async function handleExcelDownload() {
    setIsFetching(true);
    try {
      const data = await getAllCandidatesInfoByStatus();

      const filename = `All-Candidates-${Date.now()}.xlsx`;

      FileDownload(data, filename);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.error("Error downloading Excel file:", error);
    }
  }
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="space-y-5">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Candidates Status Wise Reports
          </h2>
          <p className="text-sm">Download details of all the candidates</p>
        </div>
        <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">

        <div className="sm:col-span-2">
            <label
              htmlFor="entrance-select"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
             Candidate Status
            </label>
            <div className="relative mt-2">
              <select
                id="entrance-select"
                
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
              >
                 <option value="">Select Status</option>
              <option value="0">All</option>
              <option value="1">Signed Up</option>
              <option value="2">Profile Completed</option>
              <option value="3">Applied</option>
               </select>
            </div>
          </div>



          <div className="sm:col-span-2 pt-6 pl-3">
        

            <button
              type="button"
              disabled={isFetching}
              className="flex gap-1 items-center rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={handleExcelDownload}
            >
              {isFetching ? (
                <DataLoader />
              ) : (
                <>
                  {" "}
                  <ArrowDownOnSquareIcon className="h-6 w-6" />
                  Download Report
                </>
              )}
            </button>
            </div>
          </div>                  
        </div>
      </div>
   
  );
};

export default Candidates;
