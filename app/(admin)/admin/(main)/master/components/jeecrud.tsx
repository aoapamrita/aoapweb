"use client";
import DataLoader from "@/app/components/DataLoader";
import { getActiveJee } from "@/app/data/jee";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import JeeCreate from "./jeecreate";
import v from "voca";

const JeeCrud = () => {
  const { data: item, isLoading: itemLoading } = useQuery({
    queryKey: ["jee", "active"],
    queryFn: () => getActiveJee(),
  });

  return (
    <div>
      {itemLoading ? (
        <DataLoader />
      ) : item ? (
        <div className="bg-white border shadow sm:rounded-lg max-w-2xl">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              JEE
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {item.description}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {v.capitalize(item.status.toLowerCase())}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <JeeCreate />
      )}
    </div>
  );
};

export default JeeCrud;
