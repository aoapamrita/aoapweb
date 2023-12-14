"use client";
import DataLoader from "@/app/components/DataLoader";
import { getEntrances } from "@/app/data/entranceclient";
import { useQueries, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ExamUpdate from "./examupdate";
import { ExamStatus } from "@/app/data/admin/examenums";

const Exam = () => {
  const [entrance, setEntrance] = useState(null);

  const { data: entrances, isLoading: entrancesLoading } = useQuery({
    queryKey: ["entrances"],
    queryFn: () => getEntrances(),
  });

  function handleChange(e) {
    const selectEntrance = entrances.find((item) => item.id === e.target.value);
    setEntrance(selectEntrance);
  }
  console.log(ExamStatus);

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-2xl">
      <div>
        <div>
          <p className="block text-sm font-bold leading-6 text-gray-900">
            Select an Entrance
          </p>
          {entrancesLoading ? (
            <DataLoader size="md" />
          ) : (
            <select
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
            >
              <option value="">--Select--</option>
              {entrances.map((entrance) => (
                <option key={entrance.id} value={entrance.id}>
                  {entrance.code.toUpperCase()}
                </option>
              ))}
            </select>
          )}
        </div>
        {entrance && (
          <div className="py-5">
            <ExamUpdate entrance={entrance} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Exam;
