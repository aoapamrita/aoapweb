import apiclient from "../utilities/createclient";

export default async function sendEmailOtp(input) {
  try {
    const { data } = await apiclient.post("/api/email/otp", input);
    if (data.created) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
