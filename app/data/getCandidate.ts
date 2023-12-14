// import { cookies } from "next/headers";
import apiclient from "../utilities/createclient";

// export default async function getCandidate() {
//   try {
//     const { data } = await apiclient.get("/api/candidate", {
//       headers: { Cookie: cookies().toString() },
//     });
//     return data;
//   } catch (error) {
//     return null;
//   }
// }

export default async function getCandidate() {
  try {
    const { data } = await apiclient.get("/api/candidate");
    return data;
  } catch (error) {
    return null;
  }
}
