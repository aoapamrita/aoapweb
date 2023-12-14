"use client";
import React, { useState } from "react";
import ApplySteps from "./applysteps";
import AeeeSubmit from "./exam-submit";
import CityJee from "./exam-cityjee";

const AeeeWrapper = ({ application }) => {
  const [step, setStep] = useState(1);

  function nextStep() {
    setStep((state) => state + 1);
  }

  function previousStep() {
    setStep((state) => state - 1);
  }

  return (
    <div className="bg-white py-5 px-2 rounded shadow-sm border border-gray-100">
      <ApplySteps stepId={step} />
      <div className="h-6"></div>
      <section>
        {step === 1 && (
          <CityJee
            previousStep={previousStep}
            nextStep={nextStep}
            step={step}
            application={application}
          />
        )}
        {step === 2 && (
          <AeeeSubmit
            previousStep={previousStep}
            step={step}
            application={application}
          />
        )}
      </section>
    </div>
  );
};

export default AeeeWrapper;
