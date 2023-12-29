"use client";
import React, { useState } from "react";
import PersonalInfo from "./personal-info";
import ParentsInfo from "./parents-info";
import AcademicInfo from "./academic-info";
import StepsNav from "./stepsnav";

const OnboardingWrapper = ({ loadingStep, user, candidate }) => {
  const [currentStep, setCurrentStep] = useState(loadingStep);

  function showNext() {
    setCurrentStep((state) => state + 1);
  }
  return (
    <section className="flex max-w-2xl mx-auto flex-col my-10 sm:mt-28">
      <StepsNav currentStep={currentStep} />
      <div className="h-5 sm:h-10"></div>
      <div className="px-4 sm:px-0">
        {currentStep === 1 && (
          <div>
            <PersonalInfo
              showNext={showNext}
              user={user}
              candidate={candidate}
            />
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <ParentsInfo showNext={showNext} candidate={candidate} />
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <AcademicInfo candidate={candidate} />
          </div>
        )}
      </div>
    </section>
  );
};

export default OnboardingWrapper;
