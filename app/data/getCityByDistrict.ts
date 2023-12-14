import apiclient from "../utilities/createclient";

export default async function getCityByDistrict(districtId) {
  try {
    const { data } = await apiclient.get(`/api/master/city/${districtId}`);
    return data;
  } catch (error) {
    return null;
  }
}
