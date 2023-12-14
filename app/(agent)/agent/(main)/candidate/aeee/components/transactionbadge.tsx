import React from "react";

const TransactionBadge = ({ status }) => {
  if (status === "SUCCESS") {
    return (
      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
        Success
      </span>
    );
  }
  if (status === "FAILED") {
    return (
      <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
        Failed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-600/20">
      Incomplete
    </span>
  );
};

export default TransactionBadge;
