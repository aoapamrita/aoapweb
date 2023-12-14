import apiclient from "../utilities/createclient";

export default async function getDistrictByState(stateId) {
  try {
    const { data } = await apiclient.get(`/api/master/district/${stateId}`);
    return data;
  } catch (error) {
    return null;
  }
}
