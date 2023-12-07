import apiclient from "@/app/utilities/createclient";

export const updateCandidateById = async (id, input) => {
  try {
    const { data } = await apiclient.put(`/api/candidate/${id}`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
