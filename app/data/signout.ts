import apiclient from "../utilities/createclient";

export default async function signOut() {
  try {
    await apiclient.post("/api/candidate/signout", {});
  } catch (error) {}
}
