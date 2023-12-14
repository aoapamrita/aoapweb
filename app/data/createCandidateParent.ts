import apiclient from "../utilities/createclient";

export default async function createCandidateParent(input) {
  const { data } = await apiclient.post("/api/candidate/parent", input);
  return data;
}
