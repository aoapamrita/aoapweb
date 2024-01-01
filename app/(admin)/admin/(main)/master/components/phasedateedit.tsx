import dayjs from "dayjs";
import React, { useState } from "react";
import PhaseDateEditForm from "./phasedateeditform";
import SyncConfirmation from "./syncconfirmation";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const PhaseDateEdit = ({ exam, refetchData }) => {
  const [editMode, setEditMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);

  async function completeEdit() {
    refetchData();
    setEditMode(false);
  }

  function confirmDate() {
    setShowConfirmation(true);
  }

  async function handleAccept(data) {
    setShowConfirmation(false);
    // start the process
    console.log("initiaing sync process");
  }
  return (
    <>
      {editMode ? (
        <PhaseDateEditForm exam={exam} completeEdit={completeEdit} />
      ) : (
        <>
          <span className="flex-grow">
            {exam.phaseenddate
              ? dayjs(exam.phaseenddate).format("DD/MM/YYYY")
              : "Not Set"}
          </span>
          <div className="ml-4 flex-shrink-0 flex gap-3">
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="rounded-md bg-white font-medium text-pink-600 hover:text-pink-500"
            >
              Update
            </button>
            {exam.phaseenddate && (
              <button
                type="button"
                onClick={() => confirmDate()}
                className="flex items-center gap-2 rounded-md bg-pink-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
              >
                <ArrowPathIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
                Start Sync
              </button>
            )}
          </div>
          <SyncConfirmation
            open={showConfirmation}
            onClose={() => {
              setShowConfirmation(false);
            }}
            onCancel={() => {
              setShowConfirmation(false);
            }}
            onAccept={handleAccept}
            data={confirmationData}
          />
        </>
      )}
    </>
  );
};

export default PhaseDateEdit;
