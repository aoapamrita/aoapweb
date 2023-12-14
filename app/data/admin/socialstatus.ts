import apiclient from "@/app/utilities/createclient";

export const addSocialStatus = async (input) => {
  try {
    const { data } = await apiclient.post(`/api/master/socialstatus`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const updateSocialStatus = async ({ id, input }) => {
  try {
    const { data } = await apiclient.put(
      `/api/master/socialstatus/${id}`,
      input
    );
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const removeSocialStatus = async (id) => {
  try {
    const { data } = await apiclient.delete(`/api/master/socialstatus/${id}`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
