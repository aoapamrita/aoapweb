import { redirect } from "next/navigation";
import getUser from "../data/getuser";
import SignIn from "./components/signin";
import Image from "next/image";
import AdmissionSteps from "./components/admissionsteps";
import Instructions from "./components/instructions";
import Footer from "./components/footer";
import { headers } from "next/headers";
import addReferer from "../data/addReferer";

export default async function Page() {
  const headersList = headers();
  const user = await getUser();

  const referer = headersList.get("referer");
  const base = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

  if (referer && !referer.startsWith(base)) {
    const refResult = await addReferer({ url: referer });
  }

  if (user) {
    if (user.onboardingstatus) {
      redirect("/dashboard");
    } else {
      redirect("/onboarding");
    }
  }

  return (
    <div>
      <section>
        <header className="flex bg-pink-800">
          <div className="mx-auto">
            <div className="relative top-3 z-10 shadow-lg">
              <Image
                src="/images/Amritalogo.png"
                width={300}
                height={10}
                alt=""
                className="rounded-lg w-52 sm:w-72"
              />
            </div>
          </div>
        </header>

        <div className="relative isolate py-3">
          <Image
            src="/images/aee-hero-bg1.jpg"
            width={0}
            height={0}
            sizes="100vw"
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 h-full w-full bg-black opacity-75"></div>
          <div className="max-w-6xl mx-auto mt-10 px-6 flex flex-col gap-10">
            <div className="max-w-xl mx-auto px-6 flex flex-col">
              <Image
                src="/images/amrita-footer.png"
                width={1000}
                height={168}
                alt=""
              />
            </div>
            <div className="space-y-5">
              <h1 className="text-2xl text-center font-bold tracking-tight text-white sm:text-4xl">
                Directorate of Admissions & Academic Outreach
              </h1>
              <h2 className="text-lg text-center font-bold tracking-tight text-white sm:text-2xl">
                Amrita Online Admissions Portal
              </h2>
              <p className="text-white text-center text-md sm:text-lg">
                A unified online platform for streamlined registration for the
                Amrita Entrance Examinations, facilitating admission to a
                comprehensive range of undergraduate and integrated programs
                offered by Amrita Vishwa Vidyapeetham.
              </p>
            </div>
            <div>
              <SignIn />
            </div>
            <div className="my-10">
              <AdmissionSteps />
            </div>
          </div>
        </div>
      </section>
      <section>
        <Instructions />
      </section>
      <Footer />
    </div>
  );
}
