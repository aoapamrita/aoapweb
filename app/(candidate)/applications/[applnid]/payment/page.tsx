import BreadCrumbs from "@/app/(candidate)/components/breadcrumbs";
import { getProductByCode } from "@/app/data/getProductByCode";
import { redirect } from "next/navigation";
import React from "react";
import EntranceCheckout from "../../components/entrancecheckout";
import { getApplicationById } from "@/app/data/application";
import { getJeeApplicationByCandidateId } from "@/app/data/jeeserver";

const Page = async ({ params }) => {
  let discount = 0;
  let application = await getApplicationById({ applicationid: params.applnid });

  if (!application) {
    redirect("/applications");
  }

  let jeeApplication = await getJeeApplicationByCandidateId();

  console.log("jee application", jeeApplication);

  if (jeeApplication) {
    if (jeeApplication.status === "REGISTERED") {
      const jeeproduct = await getProductByCode("jeebtech");
      discount = parseFloat(jeeproduct.amount);
    }
  }

  const product = await getProductByCode("aeeeentrance");

  return (
    <div>
      <BreadCrumbs application={application} />
      <div className="mt-10 mx-auto max-w-md sm:max-w-4xl">
        {product ? (
          <EntranceCheckout
            product={product}
            application={application}
            discount={discount}
          />
        ) : (
          <p>Product is not defined</p>
        )}
      </div>
    </div>
  );
};

export default Page;
