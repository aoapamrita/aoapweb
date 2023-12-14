import apiclient from "@/app/utilities/createclient";

export const getCourses = async () => {
  try {
    const { data } = await apiclient.get("/api/master/course");
    return data;
  } catch (error) {
    return null;
  }
};

export const addCourse = async (input) => {
  try {
    const { data } = await apiclient.post(`/api/master/course`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const updateCourse = async ({ id, input }) => {
  try {
    const { data } = await apiclient.put(`/api/master/course/${id}`, input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const removeCourse = async (id) => {
  try {
    const { data } = await apiclient.delete(`/api/master/course/${id}`);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
