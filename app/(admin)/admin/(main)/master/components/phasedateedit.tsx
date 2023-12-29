import dayjs from "dayjs";
import React, { useState } from "react";
import PhaseDateEditForm from "./phasedateeditform";

const PhaseDateEdit = ({ exam, refetchData }) => {
  const [editMode, setEditMode] = useState(false);

  async function completeEdit() {
    refetchData();
    setEditMode(false);
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
          <span className="ml-4 flex-shrink-0 space-x-2">
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="rounded-md bg-white font-medium text-pink-600 hover:text-pink-500"
            >
              Update
            </button>
          </span>
        </>
      )}
    </>
  );
};

export default PhaseDateEdit;
