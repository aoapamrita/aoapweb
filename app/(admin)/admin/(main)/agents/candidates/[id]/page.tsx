import React from "react";
import ListCandidates from "../components/listcandidates";

const Page = ({ params }) => {
  const { id } = params;
  return <ListCandidates agent={id} />;
};

export default Page;
