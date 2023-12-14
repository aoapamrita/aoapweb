import apiclient from "../utilities/createclient";

export default async function updateOnboarding(input) {
  const { data } = await apiclient.put("/api/candidate/onboarding", input);
  return data;
}
