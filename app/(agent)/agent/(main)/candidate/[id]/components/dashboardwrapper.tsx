"use client";

import ActiveApplicationsPanel from "./activeapplications";
import DashProfile from "./dashprofile";

const DashBaordWrapper = ({ candidate, agent }) => {
  return (
    <div>
      <DashProfile candidate={candidate} />
      <div className="h-4"></div>
      <ActiveApplicationsPanel candidate={candidate} />
    </div>
  );
};

export default DashBaordWrapper;
