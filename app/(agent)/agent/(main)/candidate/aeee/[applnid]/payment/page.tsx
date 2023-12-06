import { getApplicationById } from "@/app/data/application";
import { getProductByCode } from "@/app/data/getProductByCode";
import { getLoggedUser } from "@/app/data/getloggeduser";
import { redirect } from "next/navigation";
import React from "react";
import BreadCrumbs from "../../../components/breadcrumbs";
import EntranceCheckout from "../../components/entrancecheckout";

const Page = async ({ params }) => {
  let discount = 0;
  let application = await getApplicationById({ applicationid: params.applnid });

  if (!application) {
    redirect("/agent/candidates");
  }

  let agent = await getLoggedUser();

  if (agent) {
    discount = parseFloat(agent.amount);
  }
  console.log(application);

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
