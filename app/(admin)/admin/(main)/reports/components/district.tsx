"use client";
import DataLoader from "@/app/components/DataLoader";
import { getDistrictReport } from "@/app/data/admin/reports";
import { getEntrances, getExamsByEntrance } from "@/app/data/entranceclient";
import getStates from "@/app/data/getStates";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import React, { useState } from "react";

const DistrictReports = () => {
  const [stateId, setStateId] = useState(null);
  const [entranceId, setEntranceId] = useState(null);
  const [examId, setExamId] = useState(null);

  const { data: states, isLoading: statesLoading } = useQuery({
    queryKey: ["states"],
    queryFn: () => getStates(),
  });

  const { data: entrances, isLoading: entrancesLoading } = useQuery({
    queryKey: ["entrances"],
    queryFn: () => getEntrances(),
  });

  const { data: exams, isFetching: examsLoading } = useQuery({
    queryKey: ["exam", entranceId],
    queryFn: () => getExamsByEntrance(entranceId),
    enabled: !!entranceId,
  });

  const { data: reports, isFetching: reportsFetching } = useQuery({
    queryKey: ["reports", "district", stateId, { entranceId, examId }],
    queryFn: () => getDistrictReport(stateId, { entranceId, examId }),
    enabled: !!stateId,
  });

  console.log(reports);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="space-y-5">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          District Wise Reports
        </h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Select State{" "}
              {statesLoading ? (
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
                    setStateId(parseInt(e.target.value));
                  }}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
                >
                  <option value="0">--Select--</option>
                  {states &&
                    states.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
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
            {reportsFetching ? (
              <DataLoader size="lg" />
            ) : reports && reports.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      District
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Signed Up
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Profile Updated
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Applied
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Registered
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr key={report.districtId}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {report.district}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {report.signed_count}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {report.profile_created}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {report.applied != null ? report.applied : "N/A"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {report.registered != null ? report.registered : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="py-10 px-4 text-center border rounded-lg">
                Select State
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistrictReports;
