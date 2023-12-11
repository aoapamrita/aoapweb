"use client";
import { UsersIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import DataLoader from "@/app/components/DataLoader";
import { getStatsByAgent } from "@/app/data/agent/candidate";
import { useState } from "react";
import { getAgents } from "@/app/data/agent/agent";
import { Spinner } from "flowbite-react";

export default function Stats() {
  const [agentId, setAgentId] = useState("all");

  const { data: agentstats, isLoading: agentStatsLoading } = useQuery({
    queryKey: ["agent", agentId, "stats"],
    queryFn: () => getStatsByAgent(agentId),
  });

  const { data: agents, isLoading: agentsLoading } = useQuery({
    queryKey: ["agents"],
    queryFn: () => getAgents(),
  });

  return (
    <div>
      <h3 className="text-base font-semibold leading-6 text-gray-900 mb-5">
        Dashboard
      </h3>

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-2">
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
            <div className="">
              <select
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
      <div className="h-4"></div>
      {agentStatsLoading ? (
        <DataLoader />
      ) : (
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
            <dt>
              <div className="absolute rounded-md bg-pink-500 p-3">
                <UsersIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                Candidates
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {agentstats.candidates}
              </p>
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a
                    href={`/admin/agents/candidates/${agentId}`}
                    className="font-medium text-pink-600 hover:text-pink-500"
                  >
                    View all<span className="sr-only"> Candidates stats</span>
                  </a>
                </div>
              </div>
            </dd>
          </div>
          <div className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
            <dt>
              <div className="absolute rounded-md bg-pink-500 p-3">
                <UsersIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                Applications
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <div>
                <p className="text-base text-gray-900">
                  <span className="font-semibold">Pending :</span>{" "}
                  {agentstats.applications.applied -
                    agentstats.applications.registered}
                </p>
                <p className="text-base text-gray-900">
                  <span className="font-semibold">Registered :</span>{" "}
                  {agentstats.applications.registered}
                </p>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a
                    href={`/admin/agents/applications/${agentId}`}
                    className="font-medium text-pink-600 hover:text-pink-500"
                  >
                    View all<span className="sr-only"> Application stats</span>
                  </a>
                </div>
              </div>
            </dd>
          </div>
        </dl>
      )}
    </div>
  );
}
