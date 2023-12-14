import apiclient from "@/app/utilities/createclient";

export const searchApplication = async (input) => {
  try {
    const { data } = await apiclient.post(`/api/search/application`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const searchRegistration = async (input) => {
  try {
    const { data } = await apiclient.post(`/api/search/registration`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
