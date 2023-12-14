import { cookies } from "next/headers";
import apiclient from "../utilities/createclient";

export async function getProductByCode(code) {
  console.log("code", code);

  try {
    const { data } = await apiclient.get(`/api/master/product/code/${code}`, {
      headers: { Cookie: cookies().toString() },
    });
    return data;
  } catch (error) {
    return null;
  }
}
