import apiclient from "../utilities/createclient";

export default async function createCandidatePlustwo(input) {
  const { data } = await apiclient.post("/api/candidate/plustwo", input);
  return data;
}
