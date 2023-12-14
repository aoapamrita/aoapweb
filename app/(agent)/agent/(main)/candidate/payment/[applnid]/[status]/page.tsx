import React from "react";
import Success from "../components/success";
import Failure from "../components/failure";
import { getApplicationById } from "@/app/data/application";

const Page = async ({ params }) => {
  let application = await getApplicationById({ applicationid: params.applnid });

  switch (params.status) {
    case "success":
      return <Success application={application} />;
    case "failure":
      return <Failure application={application} />;
    default:
      return <div>Not Found</div>;
  }
};

export default Page;
