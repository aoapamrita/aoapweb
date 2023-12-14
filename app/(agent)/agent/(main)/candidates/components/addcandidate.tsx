"use client";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";

const AddCandidate = () => {
  const router = useRouter();

  function addCandidate() {
    router.push("/agent/candidates/create");
  }

  return (
    <div className="flex justify-end">
      <button
        onClick={addCandidate}
        className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 flex items-center gap-2"
      >
        <UserPlusIcon className="h-6 w-6 text-white" aria-hidden="true" /> Add
        Candidate
      </button>
    </div>
  );
};

export default AddCandidate;
