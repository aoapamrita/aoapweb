"use client";
import { getAllCandidatesInfo } from "@/app/data/reports/candidate";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import FileDownload from "js-file-download";
import DataLoader from "@/app/components/DataLoader";

const Candidates = () => {
  const [isFetching, setIsFetching] = useState(false);

  async function handleExcelDownload() {
    setIsFetching(true);
    try {
      const data = await getAllCandidatesInfo();

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
            Candidates Reports
          </h2>
          <p className="text-sm">Download details of all the candidates</p>
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
