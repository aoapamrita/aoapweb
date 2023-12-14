import apiclient from "@/app/utilities/createclient";

export const getCities = async () => {
  try {
    const { data } = await apiclient.get(`/api/master/city`);
    return data;
  } catch (error) {
    return null;
  }
};

export const getCityFromState = async (stateId) => {
  try {
    const { data } = await apiclient.get(`/api/master/city/state/${stateId}`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const addCity = async (input) => {
  try {
    const { data } = await apiclient.post(`/api/master/city`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const updateCity = async ({ id, input }) => {
  try {
    const { data } = await apiclient.put(`/api/master/city/${id}`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const removeCity = async (id) => {
  try {
    const { data } = await apiclient.delete(`/api/master/city/${id}`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
