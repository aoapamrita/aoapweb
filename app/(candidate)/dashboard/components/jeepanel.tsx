"use client";
import DataLoader from "@/app/components/DataLoader";
import { getActiveJee } from "@/app/data/admin/jee";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import JeeApplicationWrapper from "./jeeapplicationwrapper";

const JeePanel = () => {
  const { data: jee, isLoading } = useQuery({
    queryKey: ["openjee"],
    queryFn: () => getActiveJee(),
  });
  // check if there is active jee then show Jee status panel
  console.log(jee);

  return (
    <div>
      {isLoading ? (
        <div className="py-6 flex justify-center">
          <DataLoader />
        </div>
      ) : (
        jee && <JeeApplicationWrapper jee={jee} />
      )}
    </div>
  );
};

export default JeePanel;
