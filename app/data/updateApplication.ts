import apiclient from "../utilities/createclient";

export async function updateApplication({ applicationId, input }) {
  try {
    const { data } = await apiclient.put(
      `/api/application/${applicationId}`,
      input
    );
    return data;
  } catch (error) {
    return null;
  }
}
