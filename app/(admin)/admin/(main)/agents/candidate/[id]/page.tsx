import React from "react";
import PersonalInfo from "../components/personalinfo";
import ContactAddress from "../components/contactaddress";
import ParentInfo from "../components/parentinfo";
import PlusTwo from "../components/plustwo";

const Page = ({ params }) => {
  const candidateID = params.id;

  return (
    <div className="space-y-10">
      <PersonalInfo candidateId={candidateID} />
      <ContactAddress candidateId={candidateID} />
      <ParentInfo candidateId={candidateID} />
      <PlusTwo candidateId={candidateID} />
    </div>
  );
};

export default Page;
