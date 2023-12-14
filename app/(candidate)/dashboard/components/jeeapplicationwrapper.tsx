import DataLoader from "@/app/components/DataLoader";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import JeeApplyCard from "./jeeapplycard";
import JeeApplication from "./jeeapplication";
import { getJeeApplicationByJeeId } from "@/app/data/jee";

const JeeApplicationWrapper = ({ jee }) => {
  const { data: jeeapplication, isLoading } = useQuery({
    queryKey: ["candidiate", "jee", jee.id],
    queryFn: () => getJeeApplicationByJeeId(jee.id),
  });

  console.log("jee application", jeeapplication);

  return (
    <div>
      {isLoading ? (
        <div className="py-6 flex justify-center">
          <DataLoader />
        </div>
      ) : jeeapplication ? (
        <JeeApplication jeeapplication={jeeapplication} />
      ) : (
        <JeeApplyCard jee={jee} />
      )}
    </div>
  );
};

export default JeeApplicationWrapper;
