import DataLoader from "@/app/components/DataLoader";
import {
  getExamCities,
  getExamCityByState,
} from "@/app/data/applicationclient";
import getStates from "@/app/data/getStates";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import React, { useState } from "react";

const ApplicationCities = ({
  applicationCities,
  removeCity,
  application,
  addCity,
  cityaddloading,
  cityremoveloading,
}) => {
  const [stateId, setStateId] = useState(null);

  const { data: states, isLoading: statesLoading } = useQuery({
    queryKey: ["states"],
    queryFn: () => getStates(),
  });

  const {
    data: examcities,
    isLoading: examcitiesLoading,
    isFetching: examcitiesFetching,
  } = useQuery({
    queryKey: ["examcities", application.exam.entranceId, stateId],
    queryFn: () => getExamCityByState(application.exam.entranceId, stateId),
    enabled: !!stateId,
  });

  function handleRemove(city) {
    removeCity(city);
  }

  function citySelected(e) {
    addCity(e.target.value);
  }
  function stateSelected(e) {
    setStateId(e.target.value);
  }

  const isCityAdded = (city) => {
    return applicationCities.some(
      (applncity) => applncity.examcity.cityId === city.cityId
    );
  };

  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 rounded-md border border-gray-200"
    >
      {applicationCities.map((city, idx) => (
        <li
          key={city.id}
          className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
        >
          <div className="flex w-0 flex-1 items-center">
            <div className="ml-4 flex min-w-0 flex-1 gap-2">
              <span className="truncate font-medium">
                {idx + 1}. {city.examcity.city.name}
              </span>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={() => handleRemove(city)}
              className="font-medium text-pink-600 hover:text-pink-500"
            >
              Remove
            </button>
          </div>
        </li>
      ))}
      {applicationCities.length < 3 ? (
        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
          <div className="ml-4 flex-shrink-0">
            <div className="flex items-baseline gap-3">
              {cityaddloading || cityremoveloading ? (
                <DataLoader size="lg" />
              ) : (
                <div className="grid grid-cols-1 gap-y-6 ">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State
                      {statesLoading ? (
                        <Spinner
                          aria-label="Pink spinner example"
                          color="pink"
                          size="sm"
                        />
                      ) : null}
                    </label>
                    <div>
                      <select
                        id="state"
                        name="state"
                        onChange={stateSelected}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
                      >
                        <option value={0}>--Select--</option>
                        {states &&
                          states.map((state) => (
                            <option key={state.id} value={state.id}>
                              {state.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                      {examcitiesFetching ? (
                        <Spinner
                          aria-label="Pink spinner example"
                          color="pink"
                          size="sm"
                        />
                      ) : null}
                    </label>
                    <div>
                      <select
                        id="location"
                        name="location"
                        onChange={citySelected}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option value={0}>--Select--</option>
                        {examcities &&
                          examcities.map((city) => {
                            if (!isCityAdded(city)) {
                              return (
                                <option key={city.id} value={city.id}>
                                  {city.city.name}
                                </option>
                              );
                            }
                          })}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </li>
      ) : null}
    </ul>
  );
};

export default ApplicationCities;
