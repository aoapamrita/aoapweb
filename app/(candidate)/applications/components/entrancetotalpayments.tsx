import DataLoader from "@/app/components/DataLoader";
import { getTransactionsByApplication } from "@/app/data/admin/transactions";
import { registerForExam } from "@/app/data/regsiterforexam";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import ShowCompleteReg from "./showcompletereg";
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
