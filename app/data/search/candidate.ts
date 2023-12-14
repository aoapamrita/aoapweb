import apiclient from "@/app/utilities/createclient";

export async function searchCandidate(input) {
  try {
    const { data } = await apiclient.post(`/api/search/candidate`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
}
