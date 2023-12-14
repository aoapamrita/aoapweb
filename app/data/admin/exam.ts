import apiclient from "@/app/utilities/createclient";

export const createExam = async (input) => {
  try {
    const { data } = await apiclient.post(`/api/exam`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const updateExam = async ({ id, input }) => {
  try {
    const { data } = await apiclient.put(`/api/exam/${id}`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
