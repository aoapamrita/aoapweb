import React from "react";
import { getCandidateById } from "@/app/data/agent/candidateserver";
import AgentCandidateWrapper from "./components/agentcandidatewrapper";

const Page = async ({ params }) => {
  const candidate = await getCandidateById(params.id);
  console.log(candidate);

  return (
    <div>
      <AgentCandidateWrapper candidate={candidate} />
    </div>
  );
};

export default Page;
