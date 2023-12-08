import React, { useState } from "react";
import ValueEditDateForm from "./valueeditdateform";
import dayjs from "dayjs";

const ValueDateDisplay = ({
  candidateId,
  field,
  value,
  schema,
  refetchData,
}) => {
  const [editMode, setEditMode] = useState(false);

  async function completeEdit() {
    refetchData();
    setEditMode(false);
  }

  return (
    <>
      {editMode ? (
        <ValueEditDateForm
          candidateId={candidateId}
          field={field}
          value={value}
          schema={schema}
          setEditMode={completeEdit}
        />
      ) : (
        <>
          <span className="flex-grow text-gray-700">
            {dayjs(value).format("DD/MM/YYYY")}
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

export default ValueDateDisplay;
