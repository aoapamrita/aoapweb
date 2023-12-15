import React, { useState } from "react";
import CldPicture from "./cldpicture";
import ValuePhotoEdit from "./valuephotoedit";

const ValuePhotoDisplay = ({ candidateId, value, refetchData }) => {
  const [editMode, setEditMode] = useState(false);

  async function closeEdit() {
    refetchData();
    setEditMode(false);
  }

  console.log("photovalue", value);

  return (
    <>
      {editMode ? (
        <ValuePhotoEdit candidateId={candidateId} closeEdit={closeEdit} />
      ) : (
        <div>
          <CldPicture
            width="150"
            height="250"
            src={value ? value : ""}
            sizes="100vw"
            alt="Description of my image"
            className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
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

export default ValuePhotoDisplay;
