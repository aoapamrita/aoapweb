import getUser from "@/app/data/getuser";
import OnboardingWrapper from "./components/onboarding-wrapper";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import getCandidateServer from "@/app/data/getCandidateServer";

const Page = async () => {
  const user = await getUser();
  const candidate = await getCandidateServer();
  console.log(candidate);

  if (!user) {
    redirect("/");
  }

  if (user.onboardingstatus) {
    redirect("/dashboard");
  }

  const loadingStep = user.onboarding;

  return (
    <OnboardingWrapper
      loadingStep={loadingStep}
      user={user}
      candidate={candidate}
    />
  );
};

export default Page;
