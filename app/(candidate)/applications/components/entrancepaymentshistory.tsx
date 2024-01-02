import React from "react";
import TransactionBadge from "./transactionbadge";
import dayjs from "dayjs";
import "../../../style/receiptstyle.css";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";


const EntrancePaymentsHistory = ({ transactions }) => {
  console.log(transactions);

  const downloadPDF = () => {
    const element = document.getElementById('fee-receipt');
    // element.style.display = 'block';
    import('html2pdf.js').then(({ default: html2pdf }) => {
      html2pdf(element, {
        margin: 1,
        filename: 'FEE-RECEIPT.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }).then(() => {
        // element.style.display = 'none';
      });
    });
  };

  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Transactions History
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-500">
        {transactions.length > 0
          ? "Transaction details of all transactions processed/initiated."
          : "No transactions processed/initiated."}
      </p>
      {transactions.length > 0 ? (
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Payment Info
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Amount (₹) & Txn Reference
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          <p>{transaction.description}</p>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <p>₹ {transaction.amount}</p>
                          <p>{transaction.reference}</p>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <TransactionBadge status={transaction.status} />
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {dayjs(transaction.updatedAt).format(
                            "DD/MM/YYYY hh:mm:ss"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="fee-receipt a4-div" id="fee-receipt">

        <div className="head-section">
          <div className="logo">
            <img 
                  src="/images/pdf-logo.png"
                  width="200"
                  height="100"
                  alt="Amrita Vishwa Vidyapeetham"
                /> 
          </div>
          <div className="font-bold">
            <p>Directorate of Admissions, AMRITA VISHWA VIDYAPEETHAM,</p>
            <p>AMRITA NAGAR (PO), ETTIMADAI, COIMBATORE-641112 Tamilnadu</p>
          </div>
        </div>

        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg ml-3">APPLICATION FEE RECEIPT</h3>
          <div className="receipt-date">
            <p><span className="date-span">Receipt Date</span>: 21/12/2023 </p>
            <p><span className="date-span">Receipt No</span>: 123456</p>
          </div>
        </div>
        
        <div className="receipt-details">
            <h3 className="font-bold mt-10 pt-5 ml-3"> Recipient Details</h3>
              <div className="receipt-address">
                <p><span className="add-span">Registration Number</span>:10000</p>
                <p>SOORYA DAS</p>
                <p>SOORYA VILLA</p>
                <p>LAKKIDI KOOTTUPATHA, OTTAPPALAM, PALAKKAD, KERALA</p>
                <p><span className="add-span">Email</span>:soory@gmail.com</p>
                <p><span className="add-span">Phone</span>:9999999999</p>
              </div>
        </div>

        <div className="py-6">
          <table className="tnx-table">
            <thead className="table-head">
              <tr className="table-row">
                <th className="head-data">Payment Method</th>
                <th className="head-data">TXN Number</th>
                <th className="head-data">Amount</th>
                <th className="head-data">Transaction Date</th>
              </tr>
            </thead>
            <tbody className="table-body">
              <tr className="table-row">
                <td className="table-data"> Online </td>
                <td className="table-data"> AEEE-1F64-CLQW-1704182437915 </td>
                <td className="table-data tb"> INR 1400.00</td>
                <td className="table-data"> 14/02/2023 </td>
              </tr>
            </tbody>
          </table>
          <p className="font-bold text-right px-3 py-4">AMOUNT IN WORDS : RUPEES ONE THOUSAND FOUR HUNDRED ONLY</p>

          <p className="font-bold text-right px-3 py-4">Directorate of Admissions</p>
        </div>

      </div>

      <button
                      type="button"
                      className="flex gap-1 items-center rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      onClick={downloadPDF}
                    >
                      <ArrowDownOnSquareIcon className="h-6 w-6"  />
                      Download FEE RECEIPT
                    </button>


    </div>
  );
};

export default EntrancePaymentsHistory;
