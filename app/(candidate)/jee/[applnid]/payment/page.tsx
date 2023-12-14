import React from "react";
import { getProductByCode } from "@/app/data/getProductByCode";
import { getJeeApplicationById } from "@/app/data/jeeserver";
import { redirect } from "next/navigation";
import BreadCrumbs from "../components/breadcrumbs";
import JeeCheckout from "../components/jeecheckout";

const Page = async ({ params }) => {
  const { applnid } = params;
  //   get application id
  let application = await getJeeApplicationById(applnid);

  if (!application) {
    redirect("/dashboard");
  }
  // get product by code
  const product = await getProductByCode("jeebtech");
  console.log("product", product);
  console.log("application", application);

  // create the form to submit to payment gateway
  //   console.log("product", product);
  //   console.log(application);

  return (
    <div>
      <BreadCrumbs application={application} />
      <div className="mt-10 mx-auto max-w-md sm:max-w-4xl">
        <JeeCheckout product={product} application={application} />
      </div>
    </div>
  );
};

export default Page;
