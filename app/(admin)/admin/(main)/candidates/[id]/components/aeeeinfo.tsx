import DataLoader from "@/app/components/DataLoader";
import { getFullAeeeDetailsByCandidateId } from "@/app/data/reports/candidate";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React from "react";

const AeeeInfo = ({ candidateId }) => {
  const { data: application, isLoading } = useQuery({
    queryKey: ["candidate", "aeee", candidateId],
    queryFn: () => getFullAeeeDetailsByCandidateId(candidateId),
  });

  console.log("full data", application);

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          AEEE Details
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          AEEE Data and Transactions
        </p>
      </div>
      {isLoading ? (
        <DataLoader size="sm" />
      ) : application ? (
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Registration
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {application.Registration.length > 0
                  ? application.Registration[0].registrationNo
                  : "Not Registered"}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Exam Cities
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {application.ApplicationCities.length > 0 ? (
                  <ul
                    role="list"
                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
                  >
                    {application.ApplicationCities.map((city) => (
                      <li
                        key={city.id}
                        className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                      >
                        <div className="flex w-0 flex-1 items-center">
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">
                              {city.examcity.city.name}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No Cities Selected</p>
                )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                JEE
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {application.ApplicationJEE.jee ? "Yes" : "No"}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Transactions
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {application.EntrancePayments.length > 0 ? (
                  <ul role="list" className="divide-y divide-gray-100">
                    {application.EntrancePayments.map((transaction) => (
                      <li
                        key={transaction.id}
                        className="flex justify-between gap-x-6 py-5"
                      >
                        <div className="flex min-w-0 gap-x-4">
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              Amount : ₹ {transaction.amount}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              Ref : {transaction.reference}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              Txn Id : {transaction.txnid}
                            </p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            {dayjs(transaction.updatedAt).format(
                              "DD/MM/YYYY hh:mm:ss"
                            )}
                          </p>
                          {transaction.status === "SUCCESS" ? (
                            <div className="mt-1 flex items-center gap-x-1.5">
                              <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              </div>
                              <p className="text-xs leading-5 text-gray-500">
                                {transaction.status}
                              </p>
                            </div>
                          ) : (
                            <div className="mt-1 flex items-center gap-x-1.5">
                              <div className="flex-none rounded-full bg-red-500/20 p-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                              </div>
                              <p className="text-xs leading-5 text-gray-500">
                                {transaction.status}
                              </p>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No Transactions Found</p>
                )}
              </dd>
            </div>
          </dl>
        </div>
      ) : (
        <div className="my-3 space-y-5">
          <hr />
          <p className="text-sm">No data to display</p>
        </div>
      )}
    </div>
  );
};

export default AeeeInfo;
