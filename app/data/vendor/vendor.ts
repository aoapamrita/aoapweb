import apiclient from "@/app/utilities/createclient";

export const createVendor = async (input) => {
  try {
    const { data } = await apiclient.post(`/api/admin/vendor/create`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const listVendors = async () => {
  try {
    const { data } = await apiclient.get(`/api/admin/vendor/list`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const removeVendor = async (id) => {
  try {
    const { data } = await apiclient.delete(`/api/admin/vendor/${id}`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
