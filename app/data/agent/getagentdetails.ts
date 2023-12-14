import apiclient from "@/app/utilities/createclient";

export const getAgentDetails = async () => {
  try {
    const { data } = await apiclient.get(`/api/admin/agent`);
    return data;
  } catch (error) {
    return null;
  }
};
