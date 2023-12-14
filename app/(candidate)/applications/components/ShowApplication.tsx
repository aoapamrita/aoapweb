import React from "react";
import AeeeWrapper from "./AeeeWrapper";
import { redirect } from "next/navigation";
import {
  createApplication,
  getApplicationByExam,
} from "@/app/data/application";

const ShowApplication = async ({ examid }) => {
  let application = await getApplicationByExam({ examid: examid });
  if (!application) {
    application = await createApplication({ examId: examid });
  }

  redirect(`/applications/${application.id}`);
};

export default ShowApplication;
