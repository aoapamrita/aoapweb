import apiclient from "../utilities/createclient";

export const createJeeApplication = async (input) => {
  try {
    const { data } = await apiclient.post(
      `/api/candidate/jee/application`,
      input
    );
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const updateJeeApplication = async ({ id, input }) => {
  try {
    const { data } = await apiclient.put(
      `/api/candidate/jee/application/${id}`,
      input
    );
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const getJeeApplicationByJeeId = async (id) => {
  try {
    const { data } = await apiclient.get(`/api/candidate/jee/${id}`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const getAllJee = async () => {
  try {
    const { data } = await apiclient.get(`/api/admin/jee/`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const getActiveJee = async () => {
  try {
    const { data } = await apiclient.get(`/api/admin/jee/active`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const createJee = async (input) => {
  try {
    const { data } = await apiclient.post(`/api/admin/jee/`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
