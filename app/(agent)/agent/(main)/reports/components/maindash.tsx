"use client";
import React, { useContext, useState } from "react";
import UTMReports from "./utm";
import { useQuery } from "@tanstack/react-query";
import getStates from "@/app/data/getStates";
import getDistrictByState from "@/app/data/getDistrictByState";
import { Spinner } from "flowbite-react";
import { UserContext } from "../../components/UserProvider";

const MainDash = () => {
  const [stateId, setStateId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const { username } = useContext(UserContext);

  console.log("contect data", username);

  const { data: states, isLoading: statesLoading } = useQuery({
    queryKey: ["states"],
    queryFn: () => getStates(),
  });

  const {
    data: districts,
    isLoading: districtsLoading,
    isFetching: districtsFetching,
  } = useQuery({
    queryKey: ["district", stateId],
    queryFn: () => getDistrictByState(stateId),
    enabled: !!stateId,
  });
  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Reports
          </h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
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
                <select
                  onChange={(e) => {
                    setDistrictId(null);
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
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Select District{" "}
                {districtsFetching ? (
                  <Spinner
                    aria-label="Pink spinner example"
                    color="pink"
                    size="sm"
                  />
                ) : null}
              </label>
              <div className="relative mt-2">
                <select
                  onChange={(e) => {
                    setDistrictId(parseInt(e.target.value));
                  }}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
                >
                  <option value="0">--Select--</option>
                  {districts &&
                    districts.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-6"></div>
      <div className="px-4 sm:px-6 lg:px-8">
        <UTMReports
          source={username}
          stateId={stateId}
          districtId={districtId}
        />
      </div>
    </div>
  );
};

export default MainDash;
