import DataLoader from "@/app/components/DataLoader";
import { getTransactionsByApplication } from "@/app/data/admin/transactions";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import EntrancePaymentsHistory from "./entrancepaymentshistory";

const EntranceTotalPayments = ({ application }) => {
  const { data: transactions, isLoading: txnsLoading } = useQuery({
    queryKey: ["transactions", application.id],
    queryFn: () => getTransactionsByApplication(application.id),
  });

  return (
    <div className="px-4 sm:px-0">
      {txnsLoading ? (
        <DataLoader />
      ) : (
        <div>
          <EntrancePaymentsHistory transactions={transactions} />
        </div>
      )}
    </div>
  );
};

export default EntranceTotalPayments;
