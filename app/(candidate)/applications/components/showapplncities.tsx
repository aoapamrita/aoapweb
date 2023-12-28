import DataLoader from "@/app/components/DataLoader";
import {
  getExamCities,
  getExamCityByState,
} from "@/app/data/applicationclient";
import getStates from "@/app/data/getStates";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import React, { useState } from "react";

const ShowApplicationCities = ({ applicationCities }) => {
  return (
    <>
      {applicationCities.length > 0 && (
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
            </li>
          ))}
        </ul>
      )}
      {applicationCities.length < 3 && (
        <p className="py-5">
          Suitable slot will no be alloted without selecting a minimum of 3
          cities. Please contact Admission support to add more cities.
        </p>
      )}
    </>
  );
};

export default ShowApplicationCities;
