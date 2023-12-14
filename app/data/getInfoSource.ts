import apiclient from "../utilities/createclient";

export default async function getInfoSource() {
  try {
    const { data } = await apiclient.get("/api/master/infosource");
    return data;
  } catch (error) {
    return null;
  }
}
