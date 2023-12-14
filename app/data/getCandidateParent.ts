import apiclient from "../utilities/createclient";

export default async function getCandidateParent() {
  try {
    const { data } = await apiclient.get("/api/candidate/parent");
    return data;
  } catch (error) {
    return null;
  }
}
