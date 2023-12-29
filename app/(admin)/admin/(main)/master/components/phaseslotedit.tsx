import React, { useState } from "react";
import PhaseSlotEditForm from "./phasesloteditform";

const PhaseSlotEdit = ({ exam, refetchData }) => {
  const [editMode, setEditMode] = useState(false);

  async function completeEdit() {
    refetchData();
    setEditMode(false);
  }

  return (
    <>
      {editMode ? (
        <PhaseSlotEditForm exam={exam} completeEdit={completeEdit} />
      ) : (
        <>
          <span className="flex-grow">
            {exam.slotstatus ? "Open" : "Closed"}
          </span>
          <span className="ml-4 flex-shrink-0">
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

export default PhaseSlotEdit;
