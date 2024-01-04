import React from "react";
import UserRow from "./userrow";
import { useQuery } from "@tanstack/react-query";
import { getRegisteredUsersByExam } from "@/app/data/reports/candidate";
import DataLoader from "@/app/components/DataLoader";

const ListUsers = ({ examId }) => {
  const { data: registrations, isLoading } = useQuery({
    queryKey: ["admin", "reports", "registered", examId],
    queryFn: () => getRegisteredUsersByExam(examId),
  });

  return (
    <>
      <div>
        <div>
          {!registrations ? (
            <DataLoader />
          ) : (
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Reg No.
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Comment
                  </th>

                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Verify</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((registration, rowIdx) => (
                  <UserRow
                    key={registration.id}
                    registration={registration}
                    rowId={rowIdx}
                    examId={examId}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default ListUsers;
