"use client";
import { getAllTransaction } from "@/app/data/admin/transactions";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const PaymentReport = () => {
    const { data: reports } = useQuery({
      queryKey: ["reports"],
      queryFn: getAllTransaction,
    });
    
    console.log("test", reports)
    return (
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {reports && reports.length > 0 ? (
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
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Application No.
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
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
                  {reports.map((report, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {report.candidate && report.candidate?.fullname}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {report.examapplication && report.examapplication.reference}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                      {report.examapplication &&
                        report.examapplication.Registration.length > 0 &&
                        report.examapplication.Registration[0].registrationNo}                      
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                        {report.examapplication && report.examapplication.EntrancePayments?.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No Data available</div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default PaymentReport;
  