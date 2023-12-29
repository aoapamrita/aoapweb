import dayjs from "dayjs";
import React from "react";

const PhaseDateEdit = ({ exam }) => {
  return (
    <>
      <span className="flex-grow">
        {exam.phaseenddate
          ? dayjs(exam.phaseenddate).format("DD/MM/YYYY")
          : "Not Set"}
      </span>
      <span className="ml-4 flex-shrink-0 space-x-2">
        <button
          type="button"
          className="rounded-md bg-white font-medium text-pink-600 hover:text-pink-500"
        >
          Update
        </button>
      </span>
    </>
  );
};

export default PhaseDateEdit;
