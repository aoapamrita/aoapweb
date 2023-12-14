import apiclient from "../utilities/createclient";

export default async function createCandidate(input) {
  console.log("callapi", input);
  try {
    const { data } = await apiclient.put("/api/candidate", input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
}
