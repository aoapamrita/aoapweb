import Link from "next/link";
import React from "react";

const CandidateList = ({ results }) => {
  console.log("candidate results", results);

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
                Phone
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Email
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Profile Completed
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
            {results.map((candidate) => (
              <tr key={candidate.id}>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {candidate.fullname ? candidate.fullname : "Nil"}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {candidate.phone
                    ? `${candidate.phonecode} ${candidate.phone}`
                    : "Nil"}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {candidate.email ? candidate.email : "Nil"}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {candidate.Onboarding && candidate.Onboarding.status
                    ? "Completed"
                    : "Pending"}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <Link
                    href={`/counsellor/candidate/${candidate.id}`}
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

export default CandidateList;
