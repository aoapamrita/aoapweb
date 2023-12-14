import DataLoader from "@/app/components/DataLoader";
import {
  getApplicationByExam,
  getApplicationByExamCandidate,
} from "@/app/data/applicationclient";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import ApplicationStats from "./ApplicationStats";
import EntranceApply from "./entranceapply";

const ActiveApplicationSummary = ({ entrance, candidate }) => {
  const { data: application, isLoading } = useQuery({
    queryKey: ["application", entrance.Exam[0].id, candidate.id],
    queryFn: () =>
      getApplicationByExamCandidate({
        examid: entrance.Exam[0].id,
        candidateid: candidate.id,
      }),
  });

  //   let application = null;
  //   let isLoading = false;
  return (
    <>
      {isLoading ? (
        <div className="py-6 flex justify-center">
          <DataLoader />
        </div>
      ) : application ? (
        <ApplicationStats application={application} candidate={candidate} />
      ) : (
        <EntranceApply entrance={entrance} candidate={candidate} />
      )}
    </>
  );
};

export default ActiveApplicationSummary;
