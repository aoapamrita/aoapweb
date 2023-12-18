"use client";
import { verifyAllCandidates } from "@/app/data/reports/vendor";
import { ArrowPathIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SyncUsers = ({ examId }) => {
  const [isSyncStarted, setIsSyncStarted] = useState(false);

  const startSync = async () => {
    setIsSyncStarted(true);
    const res = await verifyAllCandidates(examId);
    console.log(res);
  };
  return (
    <>
      <button
        type="button"
        disabled={isSyncStarted}
        onClick={() => startSync()}
        className="flex items-center gap-2 rounded-md bg-pink-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
      >
        <ArrowPathIcon className="h-6 w-6 text-white" aria-hidden="true" />
        {isSyncStarted ? "Sync in Progress" : " Start Sync"}
      </button>
    </>
  );
};

export default SyncUsers;
