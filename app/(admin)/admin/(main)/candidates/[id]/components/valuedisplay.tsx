import React, { useState } from "react";
import ValueEditForm from "./valueeditform";

const ValueDisplay = ({ candidateId, field, value, schema, refetchData }) => {
  const [editMode, setEditMode] = useState(false);

  async function completeEdit() {
    refetchData();
    setEditMode(false);
  }

  return (
    <>
      {editMode ? (
        <ValueEditForm
          candidateId={candidateId}
          field={field}
          value={value}
          schema={schema}
          setEditMode={completeEdit}
        />
      ) : (
        <>
          <span className="flex-grow text-gray-700">{value}</span>

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

export default ValueDisplay;
