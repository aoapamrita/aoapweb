import React, { useEffect, useRef, useState } from "react";
import crypto from "crypto";

const JeePayProcessingForm = ({ txndetails }) => {
  const formRef = useRef(null);
  console.log(txndetails);

  // production details
  //   const key = "ypfBaj";
  //   const salt = "aG3tGzBZ";
  //   const gatewayUrl = "https://secure.payu.in/_payment";

  const key = process.env.NEXT_PUBLIC_PAYU_KEY;
  const salt = process.env.NEXT_PUBLIC_PAYU_SALT;
  const gatewayUrl = process.env.NEXT_PUBLIC_PAYU_GATEWAYURL;

  // development details
  //   const key = "aJ1WVm";
  //   const salt = "hKmYSMBAzg5QOw64IV9MFtcu6BKaIyYA";
  //   const gatewayUrl = "https://test.payu.in/_payment";

  const hash = generateHash(txndetails, salt);
  const surl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jee/paymentsuccess`;
  const furl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jee/paymentfailure`;

  function generateHash(input, salt) {
    let hashString =
      key +
      "|" +
      input["txnid"] +
      "|" +
      input["amount"] +
      "|" +
      input["productinfo"] +
      "|" +
      input["firstname"] +
      "|" +
      input["email"] +
      "|" +
      input["udf1"] +
      "||||||||||" +
      salt;
    console.log("hashstring", hashString);
    // Generate the hash
    const hash = sha512(hashString);

    return hash;
  }

  function sha512(str) {
    return crypto.createHash("sha512").update(str).digest("hex");
  }

  useEffect(() => {
    console.log("submit form");
    if (formRef.current) {
      console.log(txndetails);

      formRef.current.submit();
    }
  }, [txndetails]);
  return (
    <form
      ref={formRef}
      action={gatewayUrl}
      method="post"
      className="flex flex-col"
    >
      <input type="hidden" name="key" value={key} />
      <input type="hidden" name="txnid" value={txndetails.txnid} />
      <input type="hidden" name="amount" value={txndetails.amount} />
      <input type="hidden" name="productinfo" value={txndetails.productinfo} />
      <input type="hidden" name="firstname" value={txndetails.firstname} />
      <input type="hidden" name="email" value={txndetails.email} />
      <input type="hidden" name="phone" value={txndetails.phone} />
      <input type="hidden" name="udf1" value={txndetails.udf1} />
      <input type="hidden" name="surl" value={surl} />
      <input type="hidden" name="furl" value={furl} />
      <input type="hidden" name="hash" value={hash} />
    </form>
  );
};

export default JeePayProcessingForm;
