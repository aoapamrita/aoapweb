"use client";
import DataLoader from "@/app/components/DataLoader";
import {
  downloadExamCityReport,
  getExamCityReport,
  getUTMReport,
} from "@/app/data/admin/reports";
import { getEntrances, getExamsByEntrance } from "@/app/data/entranceclient";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import React, { useState } from "react";
import FileDownload from "js-file-download";

import v from "voca";

const ExamCityReports = () => {
  const [entranceId, setEntranceId] = useState(null);
  const [examId, setExamId] = useState(null);
  const [showBy, setShowBy] = useState(null);

  const { data: entrances, isLoading: entrancesLoading } = useQuery({
    queryKey: ["entrances"],
    queryFn: () => getEntrances(),
  });

  const { data: exams, isFetching: examsLoading } = useQuery({
    queryKey: ["exam", entranceId],
    queryFn: () => getExamsByEntrance(entranceId),
    enabled: !!entranceId,
  });

  const {
    data: reports,
    isLoading: reportsLoading,
    isFetching: reportsFetching,
  } = useQuery({
    queryKey: ["reports", "examcities", { examId, showBy }],
    queryFn: () => getExamCityReport({ examId, showBy }),
    enabled: !!examId,
  });

  const handleExcelDownload = async () => {
    try {
      const data = await downloadExamCityReport({ examId, showBy });

      const filename = `Examcities-entrance-${Date.now()}.xlsx`;

      FileDownload(data, filename);
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }
  };

  console.log(reports);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="space-y-5">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Exam City Reports
          </h2>
          <p className="text-sm">
            Cities which were chosen by the candidates as their first preference
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Select Entrance{" "}
              {entrancesLoading ? (
                <Spinner
                  aria-label="Pink spinner example"
                  color="pink"
                  size="sm"
                />
              ) : null}
            </label>
            <div className="relative mt-2">
              <div className="">
                <select
                  onChange={(e) => {
                    setEntranceId(e.target.value);
                  }}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
                >
                  <option value="">--Select--</option>
                  {entrances &&
                    entrances.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.code.toUpperCase()}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Select Exam{" "}
              {examsLoading ? (
                <Spinner
                  aria-label="Pink spinner example"
                  color="pink"
                  size="sm"
                />
              ) : null}
            </label>
            <div className="relative mt-2">
              <div className="">
                <select
                  onChange={(e) => {
                    setShowBy("city");
                    setExamId(e.target.value);
                  }}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
                >
                  <option value="">--Select--</option>
                  {exams &&
                    exams.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.description}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          {examId ? (
            <div className="sm:col-span-2">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Show By
              </label>
              <div className="relative mt-2">
                <div className="">
                  <select
                    onChange={(e) => {
                      setShowBy(e.target.value === "" ? null : e.target.value);
                    }}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
                  >
                    <option value="city">City</option>
                    <option value="state">State</option>
                  </select>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {reportsFetching ? (
              <DataLoader size="lg" />
            ) : reports && reports.length > 0 ? (
              <div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="flex gap-1 items-center rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={handleExcelDownload}
                  >
                    <ArrowDownOnSquareIcon className="h-6 w-6" />
                    Download Report
                  </button>
                </div>
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        {v.capitalize(showBy)}
                      </th>
                      {showBy === "city" ? (
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          State
                        </th>
                      ) : null}
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Choice 1
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Choice 2
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Choice 3
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reports.map((report) => (
                      <tr key={report.Location}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {report.Location}
                        </td>
                        {showBy === "city" ? (
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {report.State}
                          </td>
                        ) : null}
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {report.Count1}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {report.Count2}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {report.Count3}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>No Data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamCityReports;
