import React from "react";
import UserRow from "./userrow";
const candidates = [
  {
    id: 1,
    name: "Prathip",
    regno: "1000001",
    status: true,
  },
  {
    id: 1,
    name: "Veena",
    regno: "1000002",
    status: false,
  },
];

const ListUsers = ({ examId }) => {
  return (
    <div>
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              Name
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >
              Reg No.
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >
              Status
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Verify</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, rowIdx) => (
            <UserRow candidate={candidate} rowId={rowIdx} examId={examId} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUsers;
