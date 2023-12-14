import apiclient from "@/app/utilities/createclient";

export const addGender = async (input) => {
  try {
    const { data } = await apiclient.post(`/api/master/gender`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const updateGender = async ({ id, input }) => {
  try {
    const { data } = await apiclient.put(`/api/master/gender/${id}`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const removeGender = async (id) => {
  try {
    const { data } = await apiclient.delete(`/api/master/gender/${id}`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
