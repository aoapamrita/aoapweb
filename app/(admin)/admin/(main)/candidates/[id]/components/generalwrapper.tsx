"use client";
import AeeeInfo from "./aeeeinfo";
import ContactAddress from "./contactaddress";
import JeeInfo from "./jeeinfo";
import ParentInfo from "./parentinfo";
import PersonalInfo from "./personalinfo";
import PlusTwo from "./plustwo";

const GeneralWrapper = ({ candidateId }) => {
  return (
    <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
      {/* <PersonalInfo candidateId={candidateId} /> */}
      <ContactAddress candidateId={candidateId} />
      <ParentInfo candidateId={candidateId} />
      <PlusTwo candidateId={candidateId} />
      <AeeeInfo candidateId={candidateId} />
      <JeeInfo candidateId={candidateId} />
    </div>
  );
};

export default GeneralWrapper;
