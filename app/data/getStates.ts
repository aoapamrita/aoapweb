import apiclient from "../utilities/createclient";

export default async function getStates() {
  try {
    const { data } = await apiclient.get("/api/master/states");
    return data;
  } catch (error) {
    return null;
  }
}
