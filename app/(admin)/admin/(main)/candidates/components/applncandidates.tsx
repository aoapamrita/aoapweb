import Link from "next/link";
import React from "react";
import AeeeList from "./aeeelist";
import JeeList from "./jeelist";

const ApplnCandidates = ({ exam, results }) => {
  console.log("Exam", exam);

  return (
    <>
      {exam === "aeee" ? (
        <AeeeList results={results} />
      ) : exam === "jee" ? (
        <JeeList results={results} />
      ) : null}
    </>
  );
};

export default ApplnCandidates;
