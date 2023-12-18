"use client";
import {
  addCityToApplication,
  getApplicationJeeStatus,
  getCityByApplication,
  getProgrammesByApplication,
  removeCityFromApplication,
  updateApplicationJeeStatus,
} from "@/app/data/applicationclient";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import CompleteRegistration from "./completeregistration";
import EntranceTotalPayments from "./entrancetotalpayments";
import DataLoader from "@/app/components/DataLoader";
import ApplicationCities from "./applicationcity";
import ToggleSwitch from "./toggleswitch";
import { useState } from "react";
import dayjs from "dayjs";

export default function AeeeRegistration({ application }) {
  const queryClient = useQueryClient();

  const { data: applicationCities, isLoading: applicationCitiesLoading } =
    useQuery({
      queryKey: ["applncities", application.id],
      queryFn: () => getCityByApplication(application.id),
    });

  const { data: jeestatus, isLoading: jeeStatusLoading } = useQuery({
    queryKey: ["application", application.id, "jee"],
    queryFn: () => getApplicationJeeStatus(application.id),
  });

  const jeeStatusMutation = useMutation({
    mutationFn: (status) => {
      return updateApplicationJeeStatus(application.id, status);
    },
    onMutate: async (variables) => {
      const queryKey = ["application", application.id, "jee"];
      const previousData = queryClient.getQueryData(queryKey);

      const updatedData = { ...previousData, jee: variables };

      queryClient.setQueryData(queryKey, updatedData);

      const rollback = () => {
        queryClient.setQueryData(queryKey, previousData);
      };
      return { rollback };
    },
    onError: (error, variables, context) => {
      context.rollback();
    },
    onSuccess: (data, variables, context) => {
      context.rollback();
      queryClient.setQueryData(["application", application.id, "jee"], data);
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries(["application", application.id, "jee"]);
    },
  });

  function changeJeeStatus(status) {
    jeeStatusMutation.mutate(status);
  }

  const { mutate: cityremovemutate, isLoading: cityremoveloading } =
    useMutation({
      mutationFn: (city) => {
        return removeCityFromApplication(application.id, city.examcityId);
      },
      onMutate: async (applicationcity) => {
        const queryKey = ["applncities", application.id];
        const previousData = queryClient.getQueryData(queryKey);

        const updatedData = previousData.filter(
          (item) => item.id != applicationcity.id
        );

        queryClient.setQueryData(queryKey, updatedData);

        const rollback = () => {
          queryClient.setQueryData(queryKey, previousData);
        };
        return { rollback };
      },
      onError: (error, variables, context) => {
        context.rollback();
      },
      onSuccess(data, variables, context) {
        const { message } = data;
        if (message != "success") {
          context.rollback();
        }
      },
      onSettled: (data, error, variables, context) => {
        queryClient.invalidateQueries(["applncities", application.id]);
      },
    });

  function removeCity(city) {
    cityremovemutate(city);
  }

  const { mutate: cityaddmutate, isLoading: cityaddloading } = useMutation({
    mutationFn: (id) => {
      return addCityToApplication(application.id, id);
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries(["applncities", application.id]);
    },
  });

  function addCity(id) {
    cityaddmutate(id);
  }

  const registration = application.Registration[0];

  console.log("registration details", registration);

  return (
    <>
      <div className="mt-10 mx-auto max-w-md sm:max-w-4xl bg-white rounded-lg py-10 px-8">
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
                  Choose 3 cities to attend the{" "}
                  <strong>Computer Based Test</strong>
                </p>
                {applicationCities && applicationCities.length != 3 && (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    It is mandatory to select 3 cities
                  </p>
                )}
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {applicationCitiesLoading ? (
                  <DataLoader size="lg" />
                ) : (
                  <ApplicationCities
                    applicationCities={applicationCities}
                    removeCity={removeCity}
                    application={application}
                    addCity={addCity}
                    cityaddloading={cityaddloading}
                    cityremoveloading={cityremoveloading}
                  />
                )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Do you want to consider based on the JEE CRL Rank?
                <p className="text-xs italic">
                  <span className="text-red-700">*</span> JEE details and
                  Percentile shall be entered after the publication of JEE Mains
                  2024 results. The fields will be enabled only after the JEE
                  Mains 2024 results. Candidates who have not submitted the
                  requisite details will not be considered for admission based
                  on JEE CRL Percentile
                </p>
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {jeeStatusLoading ? (
                  <DataLoader size="lg" />
                ) : (
                  <ToggleSwitch
                    initialValue={jeestatus.jee}
                    changeStatus={changeJeeStatus}
                  />
                )}
              </dd>
            </div>
            {registration.Slot ? (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Slot details
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <p>Registration No : {registration.Slot.registrationNo}</p>
                  <p>Exam Mode : {registration.Slot.examMode}</p>
                  <p>
                    Exam Date:{" "}
                    {dayjs(registration.Slot.examDate).format("DD/MM/YYYY")}
                  </p>
                  <p>Exam Time: {registration.Slot.examTime}</p>
                  <p>Selected City: {registration.Slot.selectedCityCode}</p>
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
        {registration ? (
          <EntranceTotalPayments application={application} />
        ) : (
          <CompleteRegistration application={application} />
        )}
      </div>
    </>
  );
}
