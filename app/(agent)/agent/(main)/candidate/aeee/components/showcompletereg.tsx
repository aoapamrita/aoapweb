import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import GetRegistrationNo from "./getregistrationno";
import ProceedPayment from "./proceedpayment";

const ShowCompleteReg = ({ application, transactions }) => {
  console.log(transactions);

  const successTransaction = transactions.find(
    (item) => item.status === "SUCCESS"
  );

  return (
    <>
      {successTransaction ? (
        <GetRegistrationNo application={application} />
      ) : (
        <ProceedPayment application={application} />
      )}
    </>
  );
};

export default ShowCompleteReg;
