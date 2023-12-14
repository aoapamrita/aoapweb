import apiclient from "@/app/utilities/createclient";

export const createCounsellor = async (input) => {
  try {
    const { data } = await apiclient.post(
      `/api/admin/counsellor/create`,
      input
    );
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const listCounsellors = async () => {
  try {
    const { data } = await apiclient.get(`/api/admin/counsellor/list`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const removeCounsellor = async (id) => {
  try {
    const { data } = await apiclient.delete(`/api/admin/counsellor/${id}`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const updateCounsellor = async ({ id, input }) => {
  try {
    const { data } = await apiclient.put(`/api/admin/counsellor/${id}`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const forgotCounsellorPassword = async (username) => {
  try {
    const { data } = await apiclient.post(`/api/counsellor/forgotpassword`, {
      username,
    });
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
