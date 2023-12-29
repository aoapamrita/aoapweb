import { cookies } from "next/headers";
import apiclient from "@/app/utilities/createclient";

export default async function getVendorUser() {
  try {
    const { data } = await apiclient.post(
      "/api/admin/vendor/currentuser",
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
