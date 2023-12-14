"use client";
import DataLoader from "@/app/components/DataLoader";
import { getAllJee } from "@/app/data/jee";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import dayjs from "dayjs";
import v from "voca";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const JeeList = () => {
  const { data: items, isLoading: itemsLoading } = useQuery({
    queryKey: ["jee"],
    queryFn: () => getAllJee(),
  });

  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        JEE List
      </h2>
      <div className="-mx-4 mt-4 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg max-w-2xl">
        {itemsLoading ? (
          <div>
            <div className="py-6 flex justify-center">
              <DataLoader />
            </div>
          </div>
        ) : !items || items.length < 1 ? (
          <p className="py-10 px-4 text-center">Add Items</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Created
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, itemIdx) => (
                <tr key={item.id}>
                  <td
                    className={classNames(
                      itemIdx === 0 ? "" : "border-t border-gray-200",
                      "px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
                    )}
                  >
                    {dayjs(item.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td
                    className={classNames(
                      itemIdx === 0 ? "" : "border-t border-gray-200",
                      "px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
                    )}
                  >
                    {item.description}
                  </td>
                  <td
                    className={classNames(
                      itemIdx === 0 ? "" : "border-t border-gray-200",
                      "px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
                    )}
                  >
                    {v.capitalize(item.status.toLowerCase())}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default JeeList;
