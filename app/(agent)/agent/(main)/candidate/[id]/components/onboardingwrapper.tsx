import React from "react";
import AddParentsInfo from "./addparentsinfo";
import AddAcademicInfo from "./addacademicinfo";

const OnboardingWrapper = ({ candidate }) => {
  if (candidate.Onboarding.current === 2) {
    return <AddParentsInfo candidate={candidate} />;
  }
  if (candidate.Onboarding.current === 3) {
    return <AddAcademicInfo candidate={candidate} />;
  }
};

export default OnboardingWrapper;
