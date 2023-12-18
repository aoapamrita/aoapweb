import { getApplicationById } from "@/app/data/application";
import { redirect } from "next/navigation";
import React from "react";
import AeeeWrapper from "../components/AeeeWrapper";
import AeeeRegistration from "../components/aeeeregistration";
import BreadCrumbs from "../../components/breadcrumbs";

const Page = async ({ params }) => {
  let application = await getApplicationById({ applicationid: params.applnid });

  console.log("page application", application);

  if (!application) {
    redirect("/applications");
  }

  if (application.status === "PENDING") {
    return (
      <>
        <BreadCrumbs application={application} />
        <div className="h-5"></div>
        <AeeeWrapper application={application} />
      </>
    );
  } else if (application.status === "APPLIED") {
    return (
      <>
        <BreadCrumbs application={application} />
        <div className="h-5"></div>
        <AeeeRegistration application={application} />
      </>
    );
  } else if (
    application.status === "REGISTERED" ||
    application.status === "SLOT" ||
    application.status === "ADMIT" ||
    application.status === "RANK"
  ) {
    <p>Registered for</p>;
  }

  return <p>Application details not found</p>;
};

export default Page;
