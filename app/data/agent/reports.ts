import apiclient from "@/app/utilities/createclient";

export const getCandidatesByUtmSource = async (source, input) => {
  try {
    const { data } = await apiclient.post(
      `/api/agent/reports/utm/${source}`,
      input
    );
    return data;
  } catch (error) {
    return null;
  }
};

export const downloadCandidatesByUtmSource = async (source, input) => {
  try {
    const { data } = await apiclient.post(
      `/api/agent/reports/download/utm/${source}`,
      input,
      {
        responseType: "blob",
      }
    );
    return data;
  } catch (error) {
    return null;
  }
};

export const getUtmCandidatesByEntrance = async (source, input) => {
  try {
    const { data } = await apiclient.post(
      `/api/agent/reports/exam/${source}`,
      input
    );
    return data;
  } catch (error) {
    return null;
  }
};

export const downloadUtmCandidatesByEntrance = async (source, input) => {
  try {
    const { data } = await apiclient.post(
      `/api/agent/reports/download/exam/${source}`,
      input,
      {
        responseType: "blob",
      }
    );
    return data;
  } catch (error) {
    return null;
  }
};
