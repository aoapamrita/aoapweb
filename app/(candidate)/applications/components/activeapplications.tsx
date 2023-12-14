"use client";
import DataLoader from "@/app/components/DataLoader";
import { getOpenExams } from "@/app/data/entranceclient";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ActiveApplicationSummary from "./activeapplnsummary";

export default function ActiveApplicationsPanel() {
  const { data: entrances, isLoading } = useQuery({
    queryKey: ["openexams"],
    queryFn: () => getOpenExams(),
  });

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="py-6 flex justify-center">
          <DataLoader />
        </div>
      ) : (
        entrances &&
        entrances.map((entrance) => (
          <ActiveApplicationSummary key={entrance.id} entrance={entrance} />
        ))
      )}
    </div>
  );
}
