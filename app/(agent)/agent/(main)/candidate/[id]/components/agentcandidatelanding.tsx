import { getCandidateById } from "@/app/data/agent/candidateserver";
import React from "react";

const AgentCandidateLanding = async ({ agent, candidateId }) => {
  const candidate = await getCandidateById(candidateId);
  console.log(candidate);

  return <div>AgentCandidateLanding</div>;
};

export default AgentCandidateLanding;
