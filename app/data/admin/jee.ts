import apiclient from "@/app/utilities/createclient";

export const getActiveJee = async () => {
  try {
    const { data } = await apiclient.get(`/api/admin/jee/active`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
