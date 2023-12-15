import React, { useState } from "react";
import CldPicture from "./cldpicture";
import ValueSignEdit from "./valuesignedit";

const ValueSignDisplay = ({ candidateId, value, refetchData }) => {
  const [editMode, setEditMode] = useState(false);

  async function closeEdit() {
    refetchData();
    setEditMode(false);
  }
  console.log("sign value", value);
  return (
    <>
      {editMode ? (
        <ValueSignEdit candidateId={candidateId} closeEdit={closeEdit} />
      ) : (
        <div>
          <CldPicture
            width="500"
            height="100"
            src={value ? value : ""}
            sizes="100vw"
            alt="Description of my image"
            className="h-24 w-48 flex-none rounded-lg object-contain border border-gray-200"
          />
          <div className="h-4"></div>
          <div className="flex justify-start">
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="rounded-md bg-white font-medium text-pink-600 hover:text-pink-500"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ValueSignDisplay;
