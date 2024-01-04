import React from "react";
import TransactionBadge from "./transactionbadge";
import dayjs from "dayjs";
import getCandidate from "@/app/data/getCandidate";
import {  useQuery } from "@tanstack/react-query";
import numberToWords from 'number-to-words';
import "../../../style/receiptstyle.css";

const EntrancePaymentsHistory = ({ transactions }) => {

  const { data: candidate } = useQuery({
    queryKey: ["candidate"],
    queryFn: () => getCandidate(),
  });
  
  { /*FEE Receipt PDF download function */}
  const downloadPDF = () => {
    const element = document.getElementById('hidden-fee-receipt');
    element.style.display = 'block';
    import('html2pdf.js').then(({ default: html2pdf }) => {
      html2pdf(element, {
        margin: 1,
        filename: 'FEE-RECEIPT.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait'},
      }).then(() => {
        element.style.display = 'none';
      });
    });
  };

  {/* Amount to words */}
  let amountInWords = "N/A";  
    if (transactions && transactions.length > 0 && transactions[0].amount) {
      amountInWords = numberToWords.toWords(transactions[0].amount).toUpperCase();
    }

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
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"> 
                        Receipt
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
                        <td>
                          <button
                            onClick={downloadPDF}
                            className="text-sm font-medium text-pink-600 hover:text-pink-500"
                          >
                            Download 
                          </button>                  
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

      {/*FEE Receipt PDF design */}       
      <div className="hidden" id="hidden-fee-receipt">
      <div className="fee-receipt a4-paper" id="fee-receipt">
        <div className="head-section">
          <div className="logo">
            <img 
                  src="/images/pdf-logo.png"
                  width="200"
                  height="100"
                  alt="Amrita Vishwa Vidyapeetham"
            /> 
          </div>
          <div className="font-medium pb-2">
            <p>DIRECTORATE OF ADMISSIONS, AMRITA VISHWA VIDYAPEETHAM,</p>
            <p>AMRITA NAGAR (PO), ETTIMADAI, COIMBATORE-641112, TAMILNADU</p>
          </div>
        </div>

        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg ml-3">APPLICATION FEE RECEIPT</h3>
          <div className="receipt-date">
            <p>Receipt Date : {dayjs(transactions.updatedAt).format("DD/MM/YYYY")} </p>
          </div>
        </div>
        
        <div className="receipt-details">
            <h3 className="font-medium mt-10 pt-5 ml-3 w-72"> Recipient Details</h3>
              <div className="receipt-address">
                <p>Application Number : {transactions[0]?.examapplication?.reference}</p>
                <p>{candidate?.fullname}</p>
                <p>{candidate?.address1}</p>
                <p>{candidate?.address2}</p>
                <p><span className="sp-100">Email </span>: {candidate?.email}</p>
                <p><span className="sp-100">Phone </span>: {candidate?.phone}</p>
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
            {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="table-data">
                          <p>{transaction.type}</p>
                        </td>
                        <td className="table-data">
                          <p>{transaction.reference}</p>
                        </td>
                        <td className="table-data tb">
                          <p>{transaction.amount}/-</p>
                        </td>
                        <td className="table-data">
                          {dayjs(transaction.updatedAt).format(
                            "DD/MM/YYYY hh:mm:ss"
                          )}
                        </td>
                      </tr>
                    ))}
            </tbody>
          </table>

          <p className="font-medium text-right px-3 py-4">AMOUNT IN WORDS : RUPEES {amountInWords} ONLY</p>
          <p className="font-bold text-right px-3 py-4">Directorate of Admissions</p>
        </div>
      </div>
      </div>
    </div>
  );
  
};

export default EntrancePaymentsHistory;
