import apiclient from "@/app/utilities/createclient";

export async function getFullAeeeDetailsByCandidateId(id) {
  try {
    const { data } = await apiclient.get(`/api/reports/candidate/aeee/${id}`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
}

export async function getFullJeeDetailsByCandidateId(id) {
  try {
    const { data } = await apiclient.get(`/api/reports/candidate/jee/${id}`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
}

export async function getAllCandidatesInfo() {
  try {
    const { data } = await apiclient.get(`/api/candidates`, {
      responseType: "blob",
    });

    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
}
