"use client";
import PersonalInfo from "./personalinfo";
import ContactAddress from "./contactaddress";
import ParentInfo from "./parentinfo";

const GeneralWrapper = () => {
  return (
    <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
      <PersonalInfo />
      <ContactAddress />
      <ParentInfo />
    </div>
  );
};

export default GeneralWrapper;
