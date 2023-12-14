import { cookies } from "next/headers";
import apiclient from "../utilities/createclient";

export default async function getCandidatePlustwo() {
  try {
    const { data } = await apiclient.get("/api/candidate/plustwo");
    return data;
  } catch (error) {
    return null;
  }
}
