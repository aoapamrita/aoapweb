"use client";
import { ArrowPathIcon} from "@heroicons/react/24/outline";
import React, {useState } from "react";
import invokebulkAPI from "@/app/data/updateleadbulkapi";
import DataLoader from "@/app/components/DataLoader";
import BulkAPIConfirmation from "./bulkAPIConfirmation";
const SyncMain = () => {
    const [isSyncStarted, setIsSyncStarted] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
  
    const startSync = async () => {
      setIsSyncStarted(true);
      const status = "bulkupload";
      const res = await invokebulkAPI(status);

      {res ? setIsSyncStarted(false):setIsSyncStarted(true); setShowConfirmation(true);}
      //console.log(res);
    };
    return (
      <>
        <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            LSQ Bulk API
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Sync Candidate Data With LSQ
          </p>
        </div>
        <button
          type="button"
          disabled={isSyncStarted}
          onClick={() => startSync()}
          className="flex items-center gap-2 rounded-md bg-pink-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
        >
          

{isSyncStarted ? <> <DataLoader/>  Sync in Progress. Please Wait... </>: 
                <>
                  {" "}
                  <ArrowPathIcon className="h-6 w-6" />
                  Start LSQ Sync
                </>
              }

          {/*<ArrowPathIcon className="h-6 w-6 text-white" aria-hidden="true" />
          {isSyncStarted ? "Sync in Progress" : " Start Sync"} */}
        </button>
      </div>
      </div>
      <BulkAPIConfirmation
        open={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
         
        }}
        onCancel={() => {
          setShowConfirmation(false);
        }}

      />
  </>
    );
  };

export default SyncMain;
