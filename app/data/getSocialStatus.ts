import apiclient from "../utilities/createclient";

export default async function getSocialStatus() {
  try {
    const { data } = await apiclient.get("/api/master/socialstatus");
    return data;
  } catch (error) {
    return null;
  }
}
