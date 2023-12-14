import apiclient from "../utilities/createclient";

export default async function verifyEmailOtp(input) {
  try {
    const { data } = await apiclient.post("/api/email/verify", input);
    if (data.isValid) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
