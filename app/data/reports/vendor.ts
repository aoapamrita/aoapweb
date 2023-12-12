import apiclient from "@/app/utilities/createclient";

export async function getExamCityStateReport(id) {
  try {
    const { data } = await apiclient.get(
      `/api/admin/reports/examcity/states/${id}`,
      {
        responseType: "blob",
      }
    );

    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
}

export async function getExamCityCityReport(id) {
  try {
    const { data } = await apiclient.get(
      `/api/admin/reports/examcity/city/${id}`,
      {
        responseType: "blob",
      }
    );

    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
}
