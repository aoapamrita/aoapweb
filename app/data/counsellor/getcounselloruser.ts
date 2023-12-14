import { cookies } from "next/headers";
import apiclient from "@/app/utilities/createclient";

export default async function getCounsellorUser() {
  try {
    const { data } = await apiclient.post(
      "/api/admin/counsellor/currentuser",
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
