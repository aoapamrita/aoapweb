import { cookies } from "next/headers";
import apiclient from "../utilities/createclient";

export default async function getUser() {
  try {
    const { data } = await apiclient.post(
      "/api/candidate/currentuser",
      {},
      {
        headers: { Cookie: cookies().toString() },
      }
    );
    return data.currentUser;
  } catch (error) {
    return null;
  }
}
