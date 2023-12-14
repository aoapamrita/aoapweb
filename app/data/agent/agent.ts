import apiclient from "@/app/utilities/createclient";

export const getAgents = async () => {
  try {
    const { data } = await apiclient.get(`/api/admin/agent/list`);
    return data;
  } catch (error) {
    return null;
  }
};

export const addAgent = async (input) => {
  try {
    const { data } = await apiclient.post(`/api/admin/agent/create`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const updateAgent = async ({ id, input }) => {
  try {
    const { data } = await apiclient.put(`/api/admin/agent/${id}`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const removeAgent = async (id) => {
  try {
    const { data } = await apiclient.delete(`/api/admin/agent/${id}`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const forgotAgentPassword = async (username) => {
  try {
    const { data } = await apiclient.post(`/api/agent/forgotpassword`, {
      username,
    });
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
