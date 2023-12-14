import { cookies } from "next/headers";
import apiclient from "../utilities/createclient";

export async function getApplicationByExam({ examid }) {
  try {
    const { data } = await apiclient.get(`/api/application/exam/${examid}`, {
      headers: { Cookie: cookies().toString() },
    });
    return data;
  } catch (error) {
    return null;
  }
}

export async function getApplicationByCandidateId() {
  try {
    const { data } = await apiclient.get(
      `/api/application/candidate/latest/aeee`,
      {
        headers: { Cookie: cookies().toString() },
      }
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function getApplicationById({ applicationid }) {
  try {
    const { data } = await apiclient.get(`/api/application/${applicationid}`, {
      headers: { Cookie: cookies().toString() },
    });
    return data;
  } catch (error) {
    return null;
  }
}

export async function createApplication({ examId }) {
  try {
    const { data } = await apiclient.post(
      "/api/application",
      {
        examId,
      },
      {
        headers: { Cookie: cookies().toString() },
      }
    );
    return data;
  } catch (error) {
    return null;
  }
}
