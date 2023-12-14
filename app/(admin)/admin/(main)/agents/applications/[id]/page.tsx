import React from "react";
import ListApplications from "../../candidates/components/listapplications";

const Page = ({ params }) => {
  const { id } = params;
  return <ListApplications agent={id} />;
};

export default Page;
