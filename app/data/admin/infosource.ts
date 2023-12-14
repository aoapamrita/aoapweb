import apiclient from "@/app/utilities/createclient";

export const addInfoSource = async (input) => {
  try {
    const { data } = await apiclient.post(`/api/master/infosource`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const updateInfoSource = async ({ id, input }) => {
  try {
    const { data } = await apiclient.put(`/api/master/infosource/${id}`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const removeInfoSource = async (id) => {
  try {
    const { data } = await apiclient.delete(`/api/master/infosource/${id}`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
