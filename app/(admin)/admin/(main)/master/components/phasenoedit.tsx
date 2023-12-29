import React, { useState } from "react";
import PhaseNoeditForm from "./phasenoeditform";

const PhaseNoEdit = ({ exam, refetchData }) => {
  const [editMode, setEditMode] = useState(false);

  async function completeEdit() {
    refetchData();
    setEditMode(false);
  }

  return (
    <>
      {editMode ? (
        <PhaseNoeditForm exam={exam} completeEdit={completeEdit} />
      ) : (
        <>
          <span className="flex-grow">{exam.phaseno}</span>
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

export default PhaseNoEdit;
