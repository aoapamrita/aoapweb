import apiclient from "@/app/utilities/createclient";

export const addState = async (input) => {
  try {
    const { data } = await apiclient.post(`/api/master/states`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const updateState = async ({ id, input }) => {
  try {
    const { data } = await apiclient.put(`/api/master/states/${id}`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const removeState = async (id) => {
  try {
    const { data } = await apiclient.delete(`/api/master/states/${id}`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
