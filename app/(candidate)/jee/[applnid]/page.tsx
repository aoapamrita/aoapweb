import { getJeeApplicationById } from "@/app/data/jeeserver";
import { redirect } from "next/navigation";
import React from "react";
import BreadCrumbs from "./components/breadcrumbs";
import JeeApplnDetails from "./components/jeeapplndetails";

const Page = async ({ params }) => {
  const { applnid } = params;

  let application = await getJeeApplicationById(applnid);

  if (!application) {
    redirect("/dashboard");
  }

  return (
    <>
      <BreadCrumbs application={application} />
      <div className="h-5"></div>
      <JeeApplnDetails application={application} />
    </>
  );
};

export default Page;
