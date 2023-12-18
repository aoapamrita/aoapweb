import { verifyCandidateSync } from "@/app/data/reports/vendor";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserRow = ({ registration, rowId, examId }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const queryClient = useQueryClient();
  const verifyUser = async () => {
    setIsVerifying(true);
    const res = await verifyCandidateSync(registration.registrationNo);
    console.log(res);
    queryClient.invalidateQueries(["admin", "reports", "registered", examId]);
    setIsVerifying(false);
  };

  return (
    <tr>
      <td
        className={classNames(
          rowId === 0 ? "" : "border-t border-transparent",
          "relative py-4 pl-4 pr-3 text-sm sm:pl-6"
        )}
      >
        <div className="font-medium text-gray-900">
          <Link
            href={`/admin/candidates/${registration.examapplication.candidate.id}`}
            className="font-semibold underline decoration-pink-600"
          >
            {registration.examapplication.candidate.fullname}
          </Link>
        </div>
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
        {registration.examapplication.candidate.phone}
      </td>
      <td
        className={classNames(
          rowId === 0 ? "" : "border-t border-gray-200",
          "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
        )}
      >
        {registration.registrationNo}
      </td>
      <td
        className={classNames(
          rowId === 0 ? "" : "border-t border-gray-200",
          "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
        )}
      >
        {registration.centersyncstatus ? "In Sync" : "Out of sync"}
      </td>
      <td
        className={classNames(
          rowId === 0 ? "" : "border-t border-gray-200",
          "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
        )}
      >
        {registration.centersynccomment}
      </td>
      <td
        className={classNames(
          rowId === 0 ? "" : "border-t border-transparent",
          "relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
        )}
      >
        <button
          type="button"
          disabled={isVerifying}
          onClick={() => verifyUser()}
          className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
        >
          {isVerifying ? " Verify..." : "Verify"}
          <span className="sr-only">
            , {registration.examapplication.candidate.name}
          </span>
        </button>
        {rowId !== 0 ? (
          <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" />
        ) : null}
      </td>
    </tr>
  );
};

export default UserRow;
