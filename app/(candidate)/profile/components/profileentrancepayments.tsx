"use client";
import DataLoader from "@/app/components/DataLoader";
import { getTransactionsByCandidate } from "@/app/data/admin/transactions";
import { useQuery } from "@tanstack/react-query";

import React from "react";
import ProfileEntPaymentsLog from "./profileentpaymentslog";

const ProfileEntrancePayments = () => {
  const { data: transactions, isLoading: txnsLoading } = useQuery({
    queryKey: ["transactions", "entrance"],
    queryFn: () => getTransactionsByCandidate(),
  });

  return (
    <div className="px-4 sm:px-0">
      {txnsLoading ? (
        <DataLoader />
      ) : (
        <div>
          <ProfileEntPaymentsLog transactions={transactions} />
        </div>
      )}
    </div>
  );
};

export default ProfileEntrancePayments;
