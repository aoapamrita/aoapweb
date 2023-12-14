import apiclient from "@/app/utilities/createclient";

export const getCounsellorDetails = async () => {
  try {
    const { data } = await apiclient.get(`/api/admin/counsellor`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
