import apiclient from "../../utilities/createclient";

export async function getProgrammesByEntrance(entranceId, q, campusid) {
  try {
    const { data } = await apiclient.get(
      `api/master/entrance/${entranceId}/programme?campusid=${campusid}&q=${q}`
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function createProgramme(input) {
  try {
    const { data } = await apiclient.post(`api/master/programme/`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
}

export async function getProgrammes() {
  try {
    const { data } = await apiclient.get(`api/master/programme/`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
}

export const removeProgramme = async (id) => {
  try {
    const { data } = await apiclient.delete(`api/master/programme/${id}`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
