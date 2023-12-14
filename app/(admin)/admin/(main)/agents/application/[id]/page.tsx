import { getApplicationById } from "@/app/data/application";
import { redirect } from "next/navigation";
import React from "react";
import AeeeRegistration from "../components/aeeeregistration";

const Page = async ({ params }) => {
  let application = await getApplicationById({ applicationid: params.id });

  if (!application) {
    redirect("/admin/agents/applications");
  }
  console.log(application);

  return <AeeeRegistration application={application} />;
};

export default Page;
