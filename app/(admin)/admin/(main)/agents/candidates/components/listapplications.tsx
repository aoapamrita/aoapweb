"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  getAllApplicationsByAgent,
  getApplicationsByAgent,
} from "@/app/data/agent/candidate";
import DataLoader from "@/app/components/DataLoader";
import Link from "next/link";
import dayjs from "dayjs";
import { getAgents } from "@/app/data/agent/agent";
import { Spinner } from "flowbite-react";

const ListApplications = ({ agent = "all" }) => {
  const [agentId, setAgentId] = useState(agent);
  const { data: agents, isLoading: agentsLoading } = useQuery({
    queryKey: ["agents"],
    queryFn: () => getAgents(),
  });

  const { data: applications, isLoading } = useQuery({
    queryKey: ["agent", agentId, "applications"],
    queryFn: () => {
      if (agentId != "all") {
        return getApplicationsByAgent(agentId, {
          searchBy: null,
          searchTerm: null,
        });
      }
      return getAllApplicationsByAgent();
    },
  });

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Applications
          </h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Select Agent{" "}
                {agentsLoading ? (
                  <Spinner
                    aria-label="Pink spinner example"
                    color="pink"
                    size="sm"
                  />
                ) : null}
              </label>
              <div className="relative mt-2">
                <select
                  value={agentId}
                  onChange={(e) => {
                    setAgentId(e.target.value);
                  }}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
                >
                  <option value="all">--All--</option>
                  {agents &&
                    agents.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-6"></div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <h3 className="font-semibold flex justify-between items-baseline">
              Applications Count : {applications && applications.length}
            </h3>
            <div className="h-4"></div>
            {isLoading ? (
              <DataLoader size="lg" />
            ) : applications && applications.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Appln No.
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Reg No.
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
                      Applied On
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Registered On
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {applications.map((application) => (
                    <tr key={application.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Link
                          href={`/admin/agents/application/${application.id}`}
                          className="font-semibold underline decoration-pink-600"
                        >
                          {application.reference}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {application.Registration[0]
                          ? application.Registration[0].registrationNo
                          : "nil"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {application.candidate.fullname ? (
                          <Link
                            href={`/admin/agents/candidate/${application.candidate.id}`}
                            className="font-semibold underline decoration-pink-600"
                          >
                            {application.candidate.fullname}
                          </Link>
                        ) : (
                          "nil"
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {application.candidate.email
                          ? application.candidate.email
                          : "nil"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {application.candidate.phone
                          ? application.candidate.phone
                          : "nil"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {dayjs(application.createdAt).format("DD/MM/YYYY")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {application.Registration[0]
                          ? dayjs(application.Registration[0].createdAt).format(
                              "DD/MM/YYYY"
                            )
                          : "nil"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No Data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListApplications;
