import { cookies } from "next/headers";
import apiclient from "../utilities/createclient";

export default async function addReferer(input) {
  try {
    const result = await apiclient.post("/api/analytics/referer", input, {
      headers: { Cookie: cookies().toString() },
    });
    return result;
  } catch (error) {
    return null;
  }
}
