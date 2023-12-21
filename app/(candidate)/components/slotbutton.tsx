import DataLoader from "@/app/components/DataLoader";
import { getUtcTime } from "@/app/utilities/dateutils";
import React, { useState } from "react";
import SlotProcessingForm from "./slotprocessingform";

const SlotButton = ({ registrationno }) => {
  const [txnDetails, setTxnDetails] = useState(null);
  const [creatingTxn, setCreatingTxn] = useState(false);

  async function createTransaction() {
    setCreatingTxn(true);

    let params = {
      registrationno,
      exammode: "SCHEDULE",
      action: "SchedulePage",
      utcdatetime: getUtcTime(),
    };

    console.log(params);

    setTxnDetails(params);
  }

  return (
    <div>
      <button
        type="submit"
        disabled={creatingTxn}
        onClick={() => createTransaction()}
        className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
      >
        Book Slot {creatingTxn && <DataLoader size="sm" />}
      </button>
      <div>{txnDetails && <SlotProcessingForm txndetails={txnDetails} />}</div>
    </div>
  );
};

export default SlotButton;
