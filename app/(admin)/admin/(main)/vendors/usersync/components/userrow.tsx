import React from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserRow = ({ candidate, rowId, examId }) => {

const verifyUser = async(req, res)=>{
    
}
  return (
    <tr key={candidate.id}>
      <td
        className={classNames(
          rowId === 0 ? "" : "border-t border-transparent",
          "relative py-4 pl-4 pr-3 text-sm sm:pl-6"
        )}
      >
        <div className="font-medium text-gray-900">{candidate.name}</div>
        {rowId !== 0 ? (
          <div className="absolute -top-px left-6 right-0 h-px bg-gray-200" />
        ) : null}
      </td>
      <td
        className={classNames(
          rowId === 0 ? "" : "border-t border-gray-200",
          "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
        )}
      >
        {candidate.regno}
      </td>
      <td
        className={classNames(
          rowId === 0 ? "" : "border-t border-gray-200",
          "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
        )}
      >
        {candidate.status ? "In Sync" : "Out of sync"}
      </td>
      <td
        className={classNames(
          rowId === 0 ? "" : "border-t border-transparent",
          "relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
        )}
      >
        <button
          type="button"
          onClick={()=>verifyUser()}
          className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
        >
          Verify<span className="sr-only">, {candidate.name}</span>
        </button>
        {rowId !== 0 ? (
          <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" />
        ) : null}
      </td>
    </tr>
  );
};

export default UserRow;
