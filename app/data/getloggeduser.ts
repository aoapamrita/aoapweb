import { cookies } from "next/headers";
import apiclient from "../utilities/createclient";

export async function getLoggedUser() {
  try {
    const { data } = await apiclient.get(`/api/loggeduser`, {
      headers: { Cookie: cookies().toString() },
    });
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
}
