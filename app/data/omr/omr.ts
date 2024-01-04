import apiclient from "@/app/utilities/createclient";

export async function completeOMRRegistration(input) {
  try {
    const { data } = await apiclient.post(
      `/api/omr/completeregisration`,
      input
    );
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
}
