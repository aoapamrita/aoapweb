"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PayProcessingForm from "./agentpayprocessingform";
import { createEntranceTransaction } from "@/app/data/admin/transactions";
import DataLoader from "@/app/components/DataLoader";

const EntranceCheckout = ({ product, application, discount }) => {
  const [txnDetails, setTxnDetails] = useState(null);
  const [creatingTxn, setCreatingTxn] = useState(false);
  const router = useRouter();

  const finalAmount = parseFloat(product.amount) - parseFloat(discount);

  async function createTransaction() {
    setCreatingTxn(true);
    const input = {
      candidateId: application.candidateId,
      examapplicationId: application.id,
      description: product.name,
      amount: finalAmount,
    };

    const txn = await createEntranceTransaction(input);

    console.log("txn", txn);

    let params = {
      txnid: txn.txnid,
      amount: txn.amount,
      productinfo: txn.description,
      firstname: application.candidate.fullname,
      email: application.candidate.agent.email,
      phone: application.candidate.agent.phone,
      udf1: application.id,
    };
    console.log(params);

    setTxnDetails(params);
  }

  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Payment Information
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-500">
        Please verify the details before proceeding
      </p>
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
                      Item
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Amount (₹)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      <p>{product.name}</p>
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <p>₹ {product.amount}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      <p className="font-bold">Total</p>
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <p>₹ {product.amount}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-x-6">
        <button
          type="submit"
          disabled={creatingTxn}
          onClick={() => createTransaction()}
          className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
        >
          Pay {creatingTxn && <DataLoader size="sm" />}
        </button>
      </div>
      <div>{txnDetails && <PayProcessingForm txndetails={txnDetails} />}</div>
    </div>
  );
};

export default EntranceCheckout;
