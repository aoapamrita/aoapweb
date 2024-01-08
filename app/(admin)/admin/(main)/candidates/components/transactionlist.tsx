import React from "react";

const TransactionList = ({ results }) => {

    console.log(results)
  return (
    <>
      {results && results.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Application No.
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Registration No.
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Transactions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {results.map((transaction) => (
              <tr key={transaction.id}>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {transaction.candidate && transaction.candidate.fullname}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {transaction.examapplication.reference}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {transaction.examapplication.Registration[0].registrationNo}   
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {transaction.examapplication.EntrancePayments.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Results Found</p>
      )}
    </>
  );
};

export default TransactionList;
