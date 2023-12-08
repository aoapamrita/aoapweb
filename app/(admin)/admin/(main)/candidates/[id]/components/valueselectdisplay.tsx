import React, { useState } from "react";
import ValueEditSelectForm from "./valueeditselectform";

const ValueSelectDisplay = ({
  candidateId,
  field,
  value,
  schema,
  refetchData,
  queryKey,
  queryFn,
}) => {
  const [editMode, setEditMode] = useState(false);

  async function completeEdit() {
    refetchData();
    setEditMode(false);
  }

  return (
    <>
      {editMode ? (
        <ValueEditSelectForm
          candidateId={candidateId}
          field={field}
          value={value}
          schema={schema}
          setEditMode={completeEdit}
          queryKey={queryKey}
          queryFn={queryFn}
        />
      ) : (
        <>
          <span className="flex-grow text-gray-700">{value.name}</span>

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

export default ValueSelectDisplay;
