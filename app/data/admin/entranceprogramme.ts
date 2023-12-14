import apiclient from "@/app/utilities/createclient";

export const addProgrammeToEntrance = async (input) => {
  try {
    const { data } = await apiclient.post(
      `/api/master/entrance/programme`,
      input
    );
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const removeProgrammeFromEntrance = async ({
  entranceId,
  programmeId,
}) => {
  try {
    const { data } = await apiclient.delete(
      `/api/master/entrance/${entranceId}/programme/${programmeId}`
    );
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
