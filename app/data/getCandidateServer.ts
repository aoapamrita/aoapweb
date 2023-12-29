import { cookies } from "next/headers";
import apiclient from "../utilities/createclient";

export default async function getCandidateServer() {
  try {
    const { data } = await apiclient.get("/api/candidate", {
      headers: { Cookie: cookies().toString() },
    });
    return data;
  } catch (error) {
    return null;
  }
}
