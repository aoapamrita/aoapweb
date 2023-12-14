import apiclient from "../utilities/createclient";

export default async function sendPhoneOtp(input) {
  try {
    const { data } = await apiclient.post("/api/phone/otp", input);
    if (data.created) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
