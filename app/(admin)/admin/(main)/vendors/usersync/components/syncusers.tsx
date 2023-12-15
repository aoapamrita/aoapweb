"use client";
import { ArrowPathIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { toast } from "react-toastify";

const SyncUsers = ({ examId }) => {
  const startSync = async () => {
    toast("Sync Started");
  };
  return (
    <>
      <button
        type="button"
        onClick={() => startSync()}
        className="flex items-center gap-2 rounded-md bg-pink-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
      >
        <ArrowPathIcon className="h-6 w-6 text-white" aria-hidden="true" />
        Start Sync
      </button>
    </>
  );
};

export default SyncUsers;
