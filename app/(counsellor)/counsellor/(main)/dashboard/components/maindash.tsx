"use client";
import { searchCandidate } from "@/app/data/search/candidate";
import React, { useState } from "react";
import CandidateList from "./candidatelist";

import { searchRegistration } from "@/app/data/search/application";
import AeeeList from "./aeeelist";

const searchOptions = {
  name: "Name",
  regno: "Registration No.",
};
const MainDash = () => {
  const [searchBy, setSearchBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  let searchTitle = searchOptions[searchBy];
  let searchArea = searchBy === "name" ? "candidate" : "application";

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (searchTerm != "") {
      setIsSearching(true);
      setSearchResults(null);
      if (searchArea === "candidate") {
        let input = {};
        input[searchBy] = searchTerm;
        const results = await searchCandidate(input);
        setSearchResults(results);
      }
      if (searchArea === "application") {
        let input = {};
        input[searchBy] = searchTerm;
        const results = await searchRegistration(input);
        setSearchResults(results);
      }
      setIsSearching(false);
    } else {
      setError("Search Term Missing");
    }
  }
  console.log(searchResults);

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Search Details
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
                  value={searchBy}
                  onChange={(e) => {
                    setSearchBy(e.target.value);
                    setSearchTerm("");
                    setSearchResults(null);
                  }}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
                >
                  {Object.keys(searchOptions).map((key) => (
                    <option key={key} value={key}>
                      {searchOptions[key]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="fullname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {searchTitle}
              </label>
              <div className="relative mt-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-6">
              <div className="sm:col-span-6 flex justify-between">
                <p className="text-red-500 text-sm">{error ? error : ""}</p>
                <button
                  type="submit"
                  disabled={isSearching}
                  className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                >
                  {isSearching ? "Searching..." : "Search"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="h-6"></div>
      <div className="px-4 sm:px-6 lg:px-8">
        {searchResults ? (
          searchArea === "candidate" ? (
            <CandidateList results={searchResults} />
          ) : searchArea === "application" ? (
            <AeeeList results={searchResults} />
          ) : null
        ) : null}
      </div>
    </div>
  );
};

export default MainDash;
