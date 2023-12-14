import apiclient from "@/app/utilities/createclient";

export const createAgentCandidate = async (input) => {
  try {
    const { data } = await apiclient.post("/api/candidate", input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const createAgentCandidateParent = async (input) => {
  try {
    const { data } = await apiclient.post("/api/candidate/parent/agent", input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const createAgentCandidatePlustwo = async (input) => {
  try {
    const { data } = await apiclient.post(
      "/api/candidate/plustwo/agent",
      input
    );
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const updateAgentOnboarding = async (input) => {
  try {
    const { data } = await apiclient.put(
      "/api/candidate/onboarding/agent",
      input
    );
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const getCandidateById = async (id) => {
  try {
    const { data } = await apiclient.get(`/api/candidate/${id}`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const getCandidateParentById = async (id) => {
  try {
    const { data } = await apiclient.get(`/api/candidate/parent/${id}`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const getCandidatePlustwoById = async (id) => {
  try {
    const { data } = await apiclient.get(`/api/candidate/plustwo/${id}`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const getCandidatesByAgent = async (id, input) => {
  try {
    const { data } = await apiclient.post(`/api/agent/${id}/candidates`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const getAllCandidatesByAgent = async () => {
  try {
    const { data } = await apiclient.get(`/api/agent/all/candidates`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const getStatsByAgent = async (id) => {
  try {
    const { data } = await apiclient.get(`/api/agent/${id}/stats`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const getApplicationsByAgent = async (id, input) => {
  try {
    const { data } = await apiclient.post(
      `/api/agent/${id}/applications`,
      input
    );
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const getAllApplicationsByAgent = async () => {
  try {
    const { data } = await apiclient.get(`/api/agent/all/applications`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
