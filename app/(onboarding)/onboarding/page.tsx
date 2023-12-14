import getUser from "@/app/data/getuser";
import OnboardingWrapper from "./components/onboarding-wrapper";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const Page = async () => {
  const user = await getUser();
  console.log(user);

  if (!user) {
    redirect("/");
  }

  if (user.onboardingstatus) {
    redirect("/dashboard");
  }

  const loadingStep = user.onboarding;

  return <OnboardingWrapper loadingStep={loadingStep} user={user} />;
};

export default Page;
