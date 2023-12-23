import Link from "next/link";
import React from "react";
import SlotButton from "../../components/slotbutton";
import { isBefore, isEqual, startOfDay } from "date-fns";

const stats = [
  {
    label: "Slot Pending (to start only before 1 week of the examination)",
    value: 12,
  },
  { label: "Admit Card Pending", value: 4 },
  { label: "Rank Not Published", value: 2 },
];

const StatsBar = ({ application }) => {
  const registration = application.Registration[0];
  const slot = registration?.Slot;
  const admit = registration?.AdmitCard;
  const rank = registration?.Rank;

  function checkIfEligible() {
    // Check if exam slot status is not set
    if (!application.exam.slotstatus) {
      return false;
    }

    console.log("registered date", registration?.createdAt);
    console.log("phase end date", application?.exam?.phaseenddate);

    // Ensure both registration createdAt and exam phaseenddate are set
    if (!registration?.createdAt || !application?.exam?.phaseenddate) {
      return false;
    }

    // Compare the start of the registration date with the start of the phase end date
    const startOfRegDate = startOfDay(registration.createdAt);
    const startOfEndDate = startOfDay(application.exam.phaseenddate);

    return (
      isBefore(startOfRegDate, startOfEndDate) ||
      isEqual(startOfRegDate, startOfEndDate)
    );
  }

  return (
    <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      <div className="px-6 py-5 text-center text-sm font-medium">
        {slot ? (
          <Link
            href={`/applications/${application.id}`}
            className="font-medium text-pink-600 hover:text-pink-500"
          >
            View Slot Details
          </Link>
        ) : checkIfEligible() ? (
          <SlotButton
            registrationno={application.Registration[0].registrationNo}
          />
        ) : (
          <p>Slot Pending (to start only before 1 week of the examination)</p>
        )}
      </div>
      <div className="px-6 py-5 text-center text-sm font-medium">
        {admit ? (
          <Link
            href={`/applications/${application.id}`}
            className="font-medium text-pink-600 hover:text-pink-500"
          >
            Download Admit Card
          </Link>
        ) : (
          <span className="text-gray-600">Admin Card Pending</span>
        )}
      </div>
      <div className="px-6 py-5 text-center text-sm font-medium">
        <span className="text-gray-600">Rank Not Published</span>
      </div>
    </div>
  );
};

export default StatsBar;
