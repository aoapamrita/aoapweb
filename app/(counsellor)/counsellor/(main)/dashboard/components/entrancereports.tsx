import DataLoader from "@/app/components/DataLoader";
import {
  downloadUtmCandidatesByEntrance,
  getUtmCandidatesByEntrance,
} from "@/app/data/agent/reports";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import FileDownload from "js-file-download";
import Link from "next/link";
import React from "react";

const EntranceReports = ({ source, stateId, districtId, entranceId }) => {
  console.log("state", stateId);
  console.log("district", districtId);
  console.log("entranceId", entranceId);

  const { data: candidates, isLoading } = useQuery({
    queryKey: [
      "reports",
      "candidate",
      "exam",
      source,
      {
        stateId,
        districtId,
        entranceId,
      },
    ],
    queryFn: () =>
      getUtmCandidatesByEntrance(source, {
        stateId,
        districtId,
        entranceId,
      }),
  });

  const handleExcelDownload = async () => {
    try {
      const data = await downloadUtmCandidatesByEntrance(source, {
        stateId,
        districtId,
        entranceId,
      });

      const filename = `UTM-${source}-entrance-${Date.now()}.xlsx`;

      FileDownload(data, filename);
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }
  };

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <h3 className="font-semibold flex justify-between items-baseline">
            Count : {candidates && candidates.length}
            <button
              type="button"
              className="flex gap-1 items-center rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={handleExcelDownload}
            >
              <ArrowDownOnSquareIcon className="h-6 w-6" />
              Download Report
            </button>
          </h3>

          <div className="h-4"></div>
          {isLoading ? (
            <DataLoader size="lg" />
          ) : candidates && candidates.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Medium
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Campaign
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    State
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    District
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Applied
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Registered
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
                {candidates.map((candidate) => (
                  <tr key={candidate.candidate_id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {candidate.medium}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {candidate.campaign}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {candidate.fullname ? candidate.fullname : "nil"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {candidate.email ? candidate.email : "nil"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {candidate.phone ? candidate.phone : "nil"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {candidate.state_name ? candidate.state_name : "nil"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {candidate.district_name
                        ? candidate.district_name
                        : "nil"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {candidate.applied ? "Done" : "No"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {candidate.registered ? "Done" : "No"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Link
                        href={`/agent/candidate/${candidate.candidate_id}`}
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
            <p>No Data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntranceReports;
