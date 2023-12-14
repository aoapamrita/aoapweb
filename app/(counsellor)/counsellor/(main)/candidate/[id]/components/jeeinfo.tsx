import DataLoader from "@/app/components/DataLoader";
import { getFullJeeDetailsByCandidateId } from "@/app/data/reports/candidate";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React from "react";

const JeeInfo = ({ candidateId }) => {
  const { data: application, isLoading } = useQuery({
    queryKey: ["candidate", "jee", candidateId],
    queryFn: () => getFullJeeDetailsByCandidateId(candidateId),
  });

  console.log("jee applicatino", application);

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          JEE Details
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          JEE Data and Transactions
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
                {application.status === "REGISTERED"
                  ? "Registered"
                  : "Not Registered"}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Transactions
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {application.JEEPayments.length > 0 ? (
                  <ul role="list" className="divide-y divide-gray-100">
                    {application.JEEPayments.map((transaction) => (
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

export default JeeInfo;
