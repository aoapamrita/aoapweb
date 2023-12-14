"use client";
import DataLoader from "@/app/components/DataLoader";
import { getApplicationReport, downloadApplicationReport } from "@/app/data/admin/reports";
import { getEntrances, getExamsByEntrance } from "@/app/data/entranceclient";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import React, { useState } from "react";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import FileDownload from "js-file-download";

const ApplicationReports = () => {
  const [entranceId, setEntranceId] = useState(null);
  const [examId, setExamId] = useState(null);

  const { data: entrances, isLoading: entrancesLoading } = useQuery({
    queryKey: ["entrances"],
    queryFn: () => getEntrances(),
  });

  const { data: exams, isFetching: examsLoading } = useQuery({
    queryKey: ["exam", entranceId],
    queryFn: () => getExamsByEntrance(entranceId),
    enabled: !!entranceId,
  });

  const { data: applications, isLoading: applicationsLoading } = useQuery({
    queryKey: ["reports", "utm", { entranceId, examId }],
    queryFn: () => getApplicationReport({ entranceId, examId }),
  });

  const handleExcelDownload = async () => {
    try {
      const data = await downloadApplicationReport({examId});

      const filename = `ApplicationReport-${Date.now()}.xlsx`;

      FileDownload(data, filename);
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }
  };

  console.log(applications);
  console.log(exams);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="space-y-5">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Application Report
        </h2>

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
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {applicationsLoading ? (
              <DataLoader size="lg" />
            ) : applications && applications.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                <tr><th colSpan={5}> <div className="flex justify-end">
                  <button
                    type="button"
                    className="flex gap-1 items-center rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={handleExcelDownload}
                  >
                    <ArrowDownOnSquareIcon className="h-6 w-6"  />
                    Download Report
                  </button>
                </div></th></tr>
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Application No.
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email Id
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Phone No.
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Registered Date and Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {applications.map((application, idx) => (
                    <tr key={idx}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {application.AppNo}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {application.Name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {application.EmailId}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {application.PhoneNumber}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {application.RegisteredDateandTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No Data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationReports;
