"use client";
import { getEntrances } from "@/app/data/entranceclient";
import {
  getExamCityCityReport,
  getExamCityStateReport,
} from "@/app/data/reports/vendor";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Spinner } from "flowbite-react";
import fileDownload from "js-file-download";
import React, { useState } from "react";

const Vendor = () => {
  const [entranceId, setEntranceId] = useState(null);
  const [stateFetching, setStateFetching] = useState(false);
  const [cityFetching, setCityFetching] = useState(false);

  const { data: entrances, isLoading: entrancesLoading } = useQuery({
    queryKey: ["entrances"],
    queryFn: () => getEntrances(),
  });

  async function handleStateDownload() {
    setStateFetching(true);
    try {
      const data = await getExamCityStateReport(entranceId);

      const filename = `ExamCity-States-${Date.now()}.xlsx`;

      fileDownload(data, filename);
      setStateFetching(false);
    } catch (error) {
      setStateFetching(false);
      console.error("Error downloading Excel file:", error);
    }
  }

  async function handleCityDownload() {
    setCityFetching(true);
    try {
      const data = await getExamCityCityReport(entranceId);

      const filename = `ExamCity-City-${Date.now()}.xlsx`;

      fileDownload(data, filename);
      setCityFetching(false);
    } catch (error) {
      setCityFetching(false);
      console.error("Error downloading Excel file:", error);
    }
  }
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="space-y-5">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Export for Vendor
          </h2>
          <p className="text-sm">
            Download excel reports for vendors conducting entrance exams
          </p>
          <div className="h-4"></div>
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
          </div>
        </div>
        {entranceId && (
          <div className="mt-8 flow-root max-w-screen-sm">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="sr-only">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        State List
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={() => handleStateDownload()}
                          disabled={stateFetching}
                          className={clsx(
                            stateFetching
                              ? "text-indigo-900"
                              : "text-indigo-600"
                          )}
                        >
                          {stateFetching ? "Downloading..." : "Download"}
                          <span className="sr-only">, Download</span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        City List
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={() => handleCityDownload()}
                          disabled={cityFetching}
                          className={clsx(
                            cityFetching ? "text-indigo-900" : "text-indigo-600"
                          )}
                        >
                          {cityFetching ? "Downloading..." : "Download"}
                          <span className="sr-only">, Download</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vendor;
