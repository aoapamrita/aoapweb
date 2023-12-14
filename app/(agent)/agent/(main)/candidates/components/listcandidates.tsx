"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../components/UserProvider";
import {
  getAllCandidatesByAgent,
  getCandidatesByAgent,
} from "@/app/data/agent/candidate";
import DataLoader from "@/app/components/DataLoader";
import Link from "next/link";
import ShowEntrances from "./showentrances";
import v from "voca";

const ListCandidates = () => {
  const agent = useContext(UserContext);

  const [searchBy, setSearchBy] = useState(null);
  const [enableSearchTerm, setEnableSearchTerm] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);

    const searchByData = formData.get("searchBy");
    const searchTermData = formData.get("searchTerm");

    setSearchBy(formData.get("searchBy"));
    setSearchTerm(formData.get("searchTerm"));
  }

  const { data: candidates, isLoading } = useQuery({
    queryKey: ["agent", agent.id, "candidates", { searchBy, searchTerm }],
    queryFn: () => getCandidatesByAgent(agent.id, { searchBy, searchTerm }),
  });

  console.log(candidates);

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Search Candidates
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
          >
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Search By
              </label>
              <div className="relative mt-2">
                <select
                  name="searchBy"
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setSearchBy(null);
                      setSearchTerm(null);
                      setEnableSearchTerm(false);
                    } else {
                      setEnableSearchTerm(true);
                    }
                    setSearchTitle(e.target.value);
                  }}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
                >
                  <option value="">--Select--</option>
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
            {enableSearchTerm ? (
              <>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="searchTerm"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {v.capitalize(searchTitle)}
                  </label>
                  <div className="relative mt-2">
                    <input
                      name="searchTerm"
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-6 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                  >
                    Search
                  </button>
                </div>
              </>
            ) : null}
          </form>
        </div>
      </div>
      <div className="h-6"></div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <h3 className="font-semibold flex justify-between items-baseline">
              Candidates Count : {candidates && candidates.length}
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
                      Entrances
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
                    <tr key={candidate.id}>
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
                        <ShowEntrances
                          applications={candidate.ExamApplication}
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Link
                          href={`/agent/candidate/${candidate.id}`}
                          className="font-semibold text-pink-600"
                        >
                          {candidate.Onboarding.status
                            ? "Dashboard"
                            : "Complete Profile"}
                        </Link>
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

export default ListCandidates;
