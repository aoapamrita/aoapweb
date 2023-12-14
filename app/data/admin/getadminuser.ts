import { cookies } from "next/headers";
import apiclient from "@/app/utilities/createclient";

export default async function getAdminUser() {
  try {
    const { data } = await apiclient.post(
      "/api/admin/currentuser",
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
