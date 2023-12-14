import { cookies } from "next/headers";
import apiclient from "@/app/utilities/createclient";

export const getCandidateById = async (id) => {
  try {
    const { data } = await apiclient.get(`/api/candidate/${id}`, {
      headers: { Cookie: cookies().toString() },
    });
    return data;
  } catch (error) {
    return null;
  }
};
