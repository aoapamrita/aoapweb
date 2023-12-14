import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  PaperClipIcon,
} from "@heroicons/react/20/solid";
import ToggleSwitch from "./toggleswitch";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCityToApplication,
  getApplicationJeeStatus,
  getCityByApplication,
  getExamCities,
  removeCityFromApplication,
  updateApplicationJeeStatus,
} from "@/app/data/applicationclient";
import ApplicationCities from "./applicationcity";
import DataLoader from "@/app/components/DataLoader";

export default function CityJee({ previousStep, nextStep, step, application }) {
  const queryClient = useQueryClient();
  const [error, setError] = useState("");

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

  async function moveNext() {
    if (applicationCities.length === 3) {
      nextStep();
    } else {
      setError("It is mandatory to select 3 cities");
    }
  }
  async function movePrevious() {
    previousStep();
  }

  return (
    <div className="mt-10 mx-auto max-w-md sm:max-w-4xl">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Choose three cities where you wish to attend the AEEE 2024 in CBT mode
        </h3>

        {error && (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {error}
          </p>
        )}
      </div>
      <div className="mt-6 border-t border-gray-200">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900"></dt>
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
                requisite details will not be considered for admission based on
                JEE CRL Percentile
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
        </dl>
        <div className="mt-10 py-5 border-t border-gray-200 flex items-center justify-center gap-x-6">
          <button
            type="button"
            onClick={moveNext}
            className="inline-flex items-center gap-x-2 rounded-md bg-pink-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
          >
            Next
            <ArrowSmallRightIcon
              className="-mr-0.5 h-5 w-5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
