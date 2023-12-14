import React from "react";
import JeeTransactions from "./jeetransactions";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import {
  getApplicationByCandidateId,
  getApplicationByExam,
} from "@/app/data/application";
import JeeProceedPayment from "./jeeproceedpayment";
import JeeCompleteReg from "./jeecompletereg";

const JeeApplnDetails = async ({ application }) => {
  console.log("application detail jee", application);
  let aeeeAppln = await getApplicationByCandidateId();

  console.log("aeeAppln", aeeeAppln);

  return (
    <div className="mt-10 mx-auto max-w-md sm:max-w-4xl bg-white rounded-lg py-10 px-8">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          {application.status === "PENDING"
            ? "Registration Pending"
            : "Registration Completed"}
        </h3>
      </div>

      {application.status === "PENDING" ? (
        aeeeAppln && aeeeAppln.Registration.length > 0 ? (
          <JeeCompleteReg application={application} />
        ) : (
          <JeeProceedPayment application={application} />
        )
      ) : (
        <p className="text-sm my-3 flex items-center gap-3">
          <CheckCircleIcon className="h-6 w-6 text-green-500" />
          You have successfully registered to apply for B.Tech with JEE Mains
          Percentile
        </p>
      )}
      <div className="h-5"></div>
      <JeeTransactions application={application} />
    </div>
  );
};

export default JeeApplnDetails;
