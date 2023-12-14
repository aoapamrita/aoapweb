import apiclient from "../utilities/createclient";

export async function getOpenExams() {
  try {
    const { data } = await apiclient.get("/api/exam/open");
    return data;
  } catch (error) {
    return null;
  }
}

export async function getEntrances() {
  try {
    const { data } = await apiclient.get("/api/entrance");
    return data;
  } catch (error) {
    return null;
  }
}

export const addEntrance = async (input) => {
  try {
    const { data } = await apiclient.post(`/api/entrance`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const removeEntrance = async (id) => {
  try {
    const { data } = await apiclient.delete(`/api/entrance/${id}`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const updateEntrance = async ({ id, input }) => {
  try {
    const { data } = await apiclient.put(`/api/entrance/${id}`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export async function getExamsByEntrance(entranceId) {
  try {
    const { data } = await apiclient.get(`/api/exam/${entranceId}`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
}

export async function getExamByEntrance(entranceId) {
  try {
    const { data } = await apiclient.get(`/api/entrance/${entranceId}/exam`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
}
