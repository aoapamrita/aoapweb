import React from "react";
import GeneralWrapper from "./components/generalwrapper";

const Page = ({ params }) => {
  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-6 py-3 sm:py-6">
      <GeneralWrapper candidateId={params.id} />
    </div>
  );
};

export default Page;
