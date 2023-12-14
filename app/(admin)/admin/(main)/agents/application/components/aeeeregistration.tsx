"use client";
import {
  addCityToApplication,
  getApplicationJeeStatus,
  getCityByApplication,
  getProgrammesByApplication,
  removeCityFromApplication,
  updateApplicationJeeStatus,
} from "@/app/data/applicationclient";

import { useQuery } from "@tanstack/react-query";

import DataLoader from "@/app/components/DataLoader";
import EntranceTotalPayments from "./entrancetotalpayments";
import ApplicationCitiesView from "./applicationcitiesview";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function AeeeRegistration({ application }) {
  const router = useRouter();

  const { data: applicationCities, isLoading: applicationCitiesLoading } =
    useQuery({
      queryKey: ["applncities", application.id],
      queryFn: () => getCityByApplication(application.id),
    });

  const { data: jeestatus, isLoading: jeeStatusLoading } = useQuery({
    queryKey: ["application", application.id, "jee"],
    queryFn: () => getApplicationJeeStatus(application.id),
  });

  const handleGoBack = () => {
    router.back();
  };

  const registration = application.Registration[0];

  return (
    <>
      <div className="mt-10 mx-auto max-w-md sm:max-w-4xl bg-white rounded-lg py-10 px-8">
        <div>
          <button
            onClick={handleGoBack}
            className="font-semibold text-pink-600 flex gap-3"
          >
            <ArrowLeftIcon className="w-6 h-6" />
            Back
          </button>
        </div>
        <div className="h-6"></div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            {registration
              ? `Registration No : ${registration.registrationNo}`
              : "Registration Pending"}
          </h3>
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
                City Preferences
                <p className="text-xs italic">
                  Cities chosen to attend the{" "}
                  <strong>Computer Based Test</strong>
                </p>
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {applicationCitiesLoading ? (
                  <DataLoader size="lg" />
                ) : (
                  <ApplicationCitiesView
                    applicationCities={applicationCities}
                  />
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
                ) : (
                  <p>{jeestatus.jee ? "Yes" : "No"}</p>
                )}
              </dd>
            </div>
          </dl>
        </div>
        <EntranceTotalPayments application={application} />
      </div>
    </>
  );
}
