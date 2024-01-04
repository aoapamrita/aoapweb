import { registerForExam } from "@/app/data/regsiterforexam";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ProceedPayment from "./proceedpayment";

const GetRegistrationNo = ({ application }) => {
  const [errors, setErrors] = useState([]);
  const router = useRouter();
  async function register() {
    setErrors([]);
    const res = await registerForExam({
      examId: application.examId,
      examapplicationId: application.id,
    });

    if (res.errors) {
      setErrors(res.errors);
    } else {
      router.refresh();
    }
  }
  const isPaymentError = errors.find(
    (error) => error.message === "Payment Pending"
  );

  return (
    <div className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
      {errors.length > 0 && (
        <ul className="text-red-500 my-4">
          {errors.map((error, idx) => (
            <li key={idx}>{error.message}</li>
          ))}
        </ul>
      )}
      {isPaymentError ? (
        <ProceedPayment application={application} />
      ) : (
        <button
          type="button"
          onClick={() => register()}
          className="inline-flex items-center gap-x-2 rounded-md bg-pink-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
        >
          Get Registration No
          <ArrowSmallRightIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default GetRegistrationNo;
