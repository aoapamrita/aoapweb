"use client";
import { getEntrances, getExamsByEntrance } from "@/app/data/entranceclient";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import React, { useState } from "react";
import USDReports from "./usdreports";
import EntranceReports from "./entrancereports";

const UTMReports = ({ source, stateId, districtId }) => {
  const [entranceId, setEntranceId] = useState(null);
  //   const [examId, setExamId] = useState(null);

  const { data: entrances, isLoading: entrancesLoading } = useQuery({
    queryKey: ["entrances"],
    queryFn: () => getEntrances(),
  });

  //   const { data: exams, isFetching: examsLoading } = useQuery({
  //     queryKey: ["exam", entranceId],
  //     queryFn: () => getExamsByEntrance(entranceId),
  //     enabled: !!entranceId,
  //   });

  return (
    <div>
      <div className="space-y-5">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          UTM Wise Reports
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
          {/* <div className="sm:col-span-2">
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
          </div> */}
        </div>
      </div>

      {entranceId ? (
        <EntranceReports
          source={source}
          stateId={stateId}
          districtId={districtId}
          entranceId={entranceId}
        />
      ) : (
        <USDReports source={source} stateId={stateId} districtId={districtId} />
      )}
    </div>
  );
};

export default UTMReports;
