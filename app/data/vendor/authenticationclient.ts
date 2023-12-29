import apiclient from "@/app/utilities/createclient";

export default async function signIn(input) {
  try {
    const { data } = await apiclient.post("/api/admin/vendor/signin", input);
    return data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
}
