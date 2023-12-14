import apiclient from "../utilities/createclient";

export default async function signIn(input) {
  try {
    const { data } = await apiclient.post("/api/candidate/signin", input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
}
