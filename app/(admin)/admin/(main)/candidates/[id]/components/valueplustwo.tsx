import React, { useState } from "react";
import ValueEditPlusTwoForm from "./valueeditplusttwoform";

const ValuePlusTwo = ({ candidateId, value, refetchData }) => {
  const [editMode, setEditMode] = useState(false);

  const completeEdit = async () => {
    refetchData();
    setEditMode(false);
  };
  return (
    <>
      {editMode ? (
        <ValueEditPlusTwoForm
          candidateId={candidateId}
          setEditMode={completeEdit}
          value={value}
        />
      ) : (
        <>
          <span className="flex-grow text-gray-700">
            {value.state ? value.state.name : value.otherState}
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

export default ValuePlusTwo;
