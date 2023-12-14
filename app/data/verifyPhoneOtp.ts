import apiclient from "../utilities/createclient";

export default async function verifyPhoneOtp(input) {
  try {
    const { data } = await apiclient.post("/api/phone/verify", input);
    if (data.isValid) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
