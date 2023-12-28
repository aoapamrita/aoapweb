"use client";
import { getAllCandidatesInfo, getSignedUpCandidates, getProfileCompleted, getAppliedReport } from "@/app/data/reports/candidate";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import FileDownload from "js-file-download";
import DataLoader from "@/app/components/DataLoader";

const Candidates = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [selectedReport, setSelectedReport] = useState("allCandidates");

  const reportOptions = [
    { value: "signedUp", label: "Signed Up" },
    { value: "profileCompleted", label: "Profile Completed" },
    { value: "applied", label: "Applied" },
  ];

  const handleExcelDownload = async () => {
    setIsFetching(true);

    try {
      let data;

      if (selectedReport === "allCandidates") {
        data = await getAllCandidatesInfo();
      } else {
        switch (selectedReport) {
          case "signedUp":
            data = await getSignedUpCandidates();
            break;
          case "profileCompleted":
            data = await getProfileCompleted();
            break;
          case "applied":
            data = await getAppliedReport();
            break;
          default:
            break;
        }
      }

      const filename = `${selectedReport}-Report-${Date.now()}.xlsx`;
      FileDownload(data, filename);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.error("Error downloading Excel file:", error);
    }
  };


  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="space-y-5">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Candidates Reports
          </h2>
          <p className="text-sm">Download details of all the candidates</p>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2">
          <select
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
          >
            <option value="allCandidates">All Candidates</option>
            {reportOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          </div>
        </div>
        <div>
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
  );
};

export default Candidates;
