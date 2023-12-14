import React from "react";
import PersonalInfo from "./personal-info";
import StepsNav from "./stepsnav";

const CreateWrapper = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <StepsNav currentStep={1} />
      <PersonalInfo />
    </div>
  );
};

export default CreateWrapper;
