import {
  getApplicationJeeStatus,
  getCityByApplication,
  getProgrammesByApplication,
} from "@/app/data/applicationclient";
import { updateApplication } from "@/app/data/updateApplication";
import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
} from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import ApplicationConfirmation from "./applicationconfirmation";
import { useState } from "react";
import DataLoader from "@/app/components/DataLoader";
import invokeAPI from "@/app/data/updateleadapi";
import getCandidate from "@/app/data/getCandidate";

export default function AeeeSubmit({ previousStep, step, application }) {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: applicationCities, isLoading: applicationCitiesLoading } =
    useQuery({
      queryKey: ["applicationcities", application.id],
      queryFn: () => getCityByApplication(application.id),
    });

  const { data: jeestatus, isLoading: jeeStatusLoading } = useQuery({
    queryKey: ["application", application.id, "jee"],
    queryFn: () => getApplicationJeeStatus(application.id),
  });

  async function submitApplication() {
    setShowConfirmation(true);
  }

  const { data: candidate, isLoading: candidateLoading } = useQuery({
    queryKey: ["candidate"],
    queryFn: () => getCandidate(),
  });

  async function handleApplicationAccept() {
    setShowConfirmation(false);
    setIsSubmitting(true);
    const res = await updateApplication({
      applicationId: application.id,
      input: { status: "APPLIED" },
    });

     //create  lead  API
     const candid = candidate.id;
     const uname = candidate.fullname;
     let uphone = candidate.phone;
     let email = candidate.email;
     let source = candidate.infosource.name;
 
     
     const section = "Application Initiated";
     const paystatus = "Unpaid";
  await invokeAPI({email: email,name: uname, phone: uphone, section: section, paystatus: paystatus,source: source,candid: candid});
 
 
 //create new lead  API

    router.refresh();
  }

  return (
    <>
      <div className="mt-10 mx-auto max-w-md sm:max-w-4xl">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Preview your application
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Please check carefully.
          </p>
        </div>
        <div className="mt-6 border-t border-gray-200">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Entrance Exam
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {application.exam.entrance.code.toUpperCase()}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                City
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {applicationCitiesLoading ? (
                  <DataLoader size="lg" />
                ) : applicationCities.length < 1 ? (
                  <p>No cities selected</p>
                ) : (
                  <ul
                    role="list"
                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
                  >
                    {applicationCities.map((city, idx) => (
                      <li
                        key={city.id}
                        className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                      >
                        <div className="flex w-0 flex-1 items-center">
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate">
                              {idx + 1}. {city.examcity.city.name}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Do you want to consider based on the JEE CRL Rank?
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {jeeStatusLoading ? (
                  <DataLoader size="lg" />
                ) : jeestatus.jee ? (
                  "Yes"
                ) : (
                  "No"
                )}
              </dd>
            </div>
          </dl>
        </div>
        <div className="mt-10 py-5 border-t border-gray-200 flex items-center justify-center gap-x-6">
          <button
            type="button"
            onClick={previousStep}
            className="inline-flex items-center gap-x-2 rounded-md bg-pink-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
          >
            <ArrowSmallLeftIcon
              className="-ml-0.5 h-5 w-5"
              aria-hidden="true"
            />
            Previous
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={submitApplication}
            className="inline-flex items-center gap-x-2 rounded-md bg-pink-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
          >
            {isSubmitting ? "Processing...." : "Submit"}
          </button>
        </div>
      </div>
      <ApplicationConfirmation
        open={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          setIsSubmitting(false);
        }}
        onCancel={() => {
          setIsSubmitting(false);
          setShowConfirmation(false);
        }}
        onAccept={handleApplicationAccept}
      />
    </>
  );
}
