import apiclient from "../utilities/createclient";

export const registerForExam = async (input) => {
  try {
    const { data } = await apiclient.post(`/api/exam/register`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
