import React from "react";
import ActiveApplicationsPanel from "../applications/components/activeapplications";
import DashProfile from "../applications/components/dashprofile";
import JeePanel from "./components/jeepanel";

const Page = () => {
  return (
    <>
      <DashProfile />
      <div className="h-4"></div>
      <ActiveApplicationsPanel />
      <div className="h-4"></div>
      <JeePanel />
    </>
  );
};

export default Page;
