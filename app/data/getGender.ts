import apiclient from "../utilities/createclient";

export default async function getGender() {
  try {
    const { data } = await apiclient.get("/api/master/gender");
    return data;
  } catch (error) {
    return null;
  }
}
