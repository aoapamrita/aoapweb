import React from "react";
import Success from "../components/success";
import Failure from "../components/failure";

const Page = ({ params }) => {
  switch (params.status) {
    case "success":
      return <Success />;
    case "failure":
      return <Failure />;
    default:
      return <div>Not Found</div>;
  }
};

export default Page;
