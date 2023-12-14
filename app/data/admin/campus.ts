import apiclient from "../../utilities/createclient";

export async function getCampus() {
  try {
    const { data } = await apiclient.get("/api/master/campus/");
    return data;
  } catch (error) {
    return null;
  }
}

export const addCampus = async (input) => {
  try {
    const { data } = await apiclient.post(`/api/master/campus`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const updateCampus = async ({ id, input }) => {
  try {
    const { data } = await apiclient.put(`/api/master/campus/${id}`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const removeCampus = async (id) => {
  try {
    const { data } = await apiclient.delete(`/api/master/campus/${id}`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
