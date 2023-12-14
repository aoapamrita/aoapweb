"use client";
import DataLoader from "@/app/components/DataLoader";
import { getUTMReportBySource, downloadUTMSourceReport} from "@/app/data/admin/reports";
import { getEntrances, getExamsByEntrance } from "@/app/data/entranceclient";
import { getUtmSource } from "@/app/data/misc/utm";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import React, { useState } from "react";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import FileDownload from "js-file-download";


const UTMReportSources = () => {
  const [entranceId, setEntranceId] = useState(null);
  const [examId, setExamId] = useState(null);
  const [utmSource, setUTMSource] = useState(null);

  const { data: entrances, isLoading: entrancesLoading } = useQuery({
    queryKey: ["entrances"],
    queryFn: () => getEntrances(),
  });

  const { data: exams, isFetching: examsLoading } = useQuery({
    queryKey: ["exam", entranceId],
    queryFn: () => getExamsByEntrance(entranceId),
    enabled: !!entranceId,
  });

  const { data: utmSources, isLoading: utmSourcesLoading } = useQuery({
    queryKey: ["utmSources"],
    queryFn: () => getUtmSource(),
  });

  const { data: utms, isLoading: utmsLoading } = useQuery({
    queryKey: ["reports", "utmsource", { entranceId, examId, utmSource }],
    queryFn: () =>
         getUTMReportBySource({ entranceId, examId, utmSource }),
    enabled: !!entranceId && !!examId && (utmSource !== null || utmSource !== undefined),
  });


  const handleExcelDownload = async () => {
    try {
      const data = await downloadUTMSourceReport({ entranceId, examId, utmSource});

      const filename = `UTMSourceReport-${Date.now()}.xlsx`;

      FileDownload(data, filename);
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }
  };

  console.log(utms);
  console.log(exams);
  console.log(utmSources);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="space-y-5">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          UTM Reports : Sourcewise Report
        </h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="entrance-select"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Select Entrance{" "}
              {entrancesLoading ? (
                <Spinner aria-label="Pink spinner example" color="pink" size="sm" />
              ) : null}
            </label>
            <div className="relative mt-2">
              <select
                id="entrance-select"
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
          <div className="sm:col-span-2">
            <label
              htmlFor="exam-select"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Select Exam{" "}
              {examsLoading ? (
                <Spinner aria-label="Pink spinner example" color="pink" size="sm" />
              ) : null}
            </label>
            <div className="relative mt-2">
              <select
                id="exam-select"
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

          <div className="sm:col-span-2">
            <label
              htmlFor="utm-source-select"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Select UTM Source{" "}
              {utmSourcesLoading ? (
                <Spinner aria-label="Pink spinner example" color="pink" size="sm" />
              ) : null}
            </label>
            <div className="relative mt-2">
              <select
                id="utm-source-select"
                onChange={(e) => {
                  setUTMSource(e.target.value);
                }}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
              >
                <option value="">All</option>
                {utmSources &&
                  utmSources.map((source) => (
                    <option key={source.id} value={source.utm_source}>
                      {source.utm_source}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
         
            {utms !== undefined ? (
              utms.length > 0 ? (

          
                
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
                        State
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
                    {utms.map((utm, idx) => (
                      <tr key={idx}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {utm.StateName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {utm.SignedUp}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {utm.ProfileUpdated}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {utm.Applied != null ? utm.Applied : "N/A"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {utm.Registered != null ? utm.Registered : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
              ) : (
                <div>No Data available</div>
              )
            ) : (
              <div>No Data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UTMReportSources;
