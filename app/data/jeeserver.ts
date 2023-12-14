import { cookies } from "next/headers";
import apiclient from "../utilities/createclient";

export async function getJeeApplicationById(id) {
  try {
    const { data } = await apiclient.get(
      `/api/candidate/jee/application/${id}`,
      {
        headers: { Cookie: cookies().toString() },
      }
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function getJeeApplicationByCandidateId() {
  try {
    const { data } = await apiclient.get(`/api/jee/application/candidate`, {
      headers: { Cookie: cookies().toString() },
    });
    return data;
  } catch (error) {
    return null;
  }
}
