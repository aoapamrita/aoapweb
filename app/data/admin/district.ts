import apiclient from "@/app/utilities/createclient";

export const addDistrict = async (input) => {
  try {
    const { data } = await apiclient.post(`/api/master/district`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const updateDistrict = async ({ id, input }) => {
  try {
    const { data } = await apiclient.put(`/api/master/district/${id}`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const removeDistrict = async (id) => {
  try {
    const { data } = await apiclient.delete(`/api/master/district/${id}`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
