import { cookies } from "next/headers";
import apiclient from "../utilities/createclient";

export async function getOpenExams() {
  try {
    const { data } = await apiclient.get("/api/exam/open", {
      headers: { Cookie: cookies().toString() },
    });
    return data;
  } catch (error) {
    return null;
  }
}

export async function checkExamValid({ examid, code }) {
  try {
    const { data } = await apiclient.post(
      `/api/exam/check/${examid}`,
      { code },
      {
        headers: { Cookie: cookies().toString() },
      }
    );
    return data;
  } catch (error) {
    return null;
  }
}
