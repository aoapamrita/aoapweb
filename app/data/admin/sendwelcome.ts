import apiclient from "@/app/utilities/createclient";

export default async function sendWelcome() {
  try {
    const { data } = await apiclient.get("/api/email/welcome");
    return data;
  } catch (error) {
    return null;
  }
}
