import React, { useEffect, useRef, useState } from "react";
import crypto from "crypto";

const SlotProcessingForm = ({ txndetails }) => {
  const formRef = useRef(null);

  const token = process.env.NEXT_PUBLIC_CBT_SSO_TOKEN;
  const hash = generateHash(txndetails, token);
  const gatewayUrl = process.env.NEXT_PUBLIC_CBT_SSO_URL;

  function generateHash(input, token) {
    let hashString =
      input["registrationno"] +
      "|" +
      token +
      "|" +
      input["utcdatetime"] +
      "|" +
      input["action"];

    console.log("hashstring", hashString);
    // Generate the hash
    const hash = sha256(hashString);

    return hash;
  }

  function sha256(str) {
    return crypto.createHash("sha256").update(str).digest("hex");
  }

  useEffect(() => {
    if (formRef.current) {
      console.log(txndetails);

      formRef.current.submit();
    }
  }, [txndetails]);
  return (
    <form ref={formRef} action={gatewayUrl} method="post" name="autoForm">
      <input
        type="hidden"
        name="APPLICATIONNUMBER"
        value={txndetails.registrationno}
      />
      <input type="hidden" name="EXAMMODE" value={txndetails.exammode} />
      <input type="hidden" name="ACTION" value={txndetails.action} />
      <input type="hidden" name="UTCDATETIME" value={txndetails.utcdatetime} />
      <input type="hidden" name="AUTH_HASH" value={hash} />
    </form>
  );
};

export default SlotProcessingForm;
