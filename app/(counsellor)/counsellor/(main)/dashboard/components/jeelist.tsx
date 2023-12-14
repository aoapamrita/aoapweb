import Link from "next/link";
import React from "react";

const JeeList = ({ results }) => {
  console.log("jee results", results);

  return (
    <>
      {results && results.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Application No.
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Registration No.
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Transactions
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {results.map((application) => (
              <tr key={application.id}>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {application.candidate.fullname
                    ? application.candidate.fullname
                    : "Nil"}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {application.reference}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {application.status === "REGISTERED"
                    ? "Registered"
                    : "Not Registered"}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {application.JEEPayments.length}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <Link
                    href={`/counsellor/candidate/${application.candidate.id}`}
                    className="font-semibold text-pink-600"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Results Found</p>
      )}
    </>
  );
};

export default JeeList;
