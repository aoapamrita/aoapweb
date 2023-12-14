import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery } from "@tanstack/react-query";
import getStates from "@/app/data/getStates";
import getDistrictByState from "@/app/data/getDistrictByState";
import getCityByDistrict from "@/app/data/getCityByDistrict";
import { Spinner } from "flowbite-react";
import clsx from "clsx";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { updateCandidateById } from "@/app/data/admin/candidate";

const AddressSchema = yup.object().shape({
  stateId: yup.string().test({
    test: (value) => value !== "0",
    message: "Please select State",
  }),
  districtId: yup.string().test({
    test: (value) => value !== "0",
    message: "Please select District",
  }),
  cityId: yup.string().test({
    test: (value) => value !== "0",
    message: "Please select City",
  }),
  otherCity: yup.string().when("cityId", {
    is: "9999999999",
    then: (schema) => schema.required("City Name is required"),
    otherwise: (schema) => schema,
  }),
});

const EditContactAddress = ({ completeEdit, candidate }) => {
  const [lstateId, setStateId] = useState(candidate.stateId);
  const [ldistrictId, setDistrictId] = useState(candidate.districtId);
  const [lcityId, setCityId] = useState(
    candidate.cityId
      ? candidate.cityId
      : candidate.otherCity != ""
      ? "9999999999"
      : null
  );

  console.log("cityid", lcityId);

  const { data: states, isLoading: statesLoading } = useQuery({
    queryKey: ["states"],
    queryFn: () => getStates(),
  });

  const { data: districts, isFetching: districtsFetching } = useQuery({
    queryKey: ["district", lstateId],
    queryFn: () => getDistrictByState(lstateId),
    enabled: !!lstateId,
    staleTime: 1000 * 60 * 10,
  });

  const { data: cities, isFetching: citiesFetching } = useQuery({
    queryKey: ["city", ldistrictId],
    queryFn: () => getCityByDistrict(ldistrictId),
    enabled: !!ldistrictId,
    staleTime: 1000 * 60 * 10,
  });

  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: async (data, context, options) => {
      // you can debug your validation schema here
      console.log("formData", data);
      console.log(
        "validation result",
        await yupResolver(AddressSchema)(data, context, options)
      );
      return yupResolver(AddressSchema)(data, context, options);
    },
  });

  const onSubmit = async (data) => {
    console.log("submit data", data);
    let fulldata = {
      ...data,
      stateId: parseInt(data.stateId),
      districtId: parseInt(data.districtId),
      cityId: parseInt(data.cityId),
    };

    const res = await updateCandidateById(candidate.id, fulldata);
    completeEdit();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="col-span-full">
          <label
            htmlFor="city"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            State
            {statesLoading ? (
              <Spinner
                aria-label="Pink spinner example"
                color="pink"
                size="sm"
              />
            ) : null}
          </label>
          <p className="text-sm leading-6 text-gray-600 italic">
            which you belong to
          </p>
          <div className="mt-2">
            {statesLoading ? (
              <select className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 text-sm sm:leading-6">
                <option value="0">--Select--</option>
              </select>
            ) : (
              <Controller
                defaultValue={lstateId}
                name="stateId"
                control={control}
                render={({ field }) => (
                  <select
                    defaultValue={lstateId}
                    onChange={(e) => {
                      setStateId(e.target.value);
                      setDistrictId(null);
                      setCityId(null);
                      setValue("districtId", "0");
                      setValue("cityId", "0");
                      setValue("otherCity", "");
                      field.onChange(parseInt(e.target.value));
                    }}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 text-sm sm:leading-6"
                  >
                    <option value="0">--Select--</option>
                    {states &&
                      states.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                )}
              />
            )}
          </div>
          {errors["stateId"] && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {errors["stateId"].message}
            </p>
          )}
        </div>

        <div
          className={clsx(
            lcityId === "9999999999" ? "sm:col-span-2" : "sm:col-span-3",
            "sm:col-start-1"
          )}
        >
          <label
            htmlFor="region"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            District
            {districtsFetching ? (
              <Spinner
                aria-label="Pink spinner example"
                color="pink"
                size="sm"
              />
            ) : null}
          </label>
          <div className="mt-2">
            {districtsFetching ? (
              <select className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 text-sm sm:leading-6">
                <option value="0">--Select--</option>
              </select>
            ) : (
              <Controller
                defaultValue={ldistrictId}
                name="districtId"
                control={control}
                render={({ field }) => (
                  <select
                    defaultValue={ldistrictId}
                    onChange={(e) => {
                      setDistrictId(e.target.value);
                      setCityId(null);
                      setValue("cityId", "0");
                      setValue("otherCity", "");
                      field.onChange(parseInt(e.target.value));
                    }}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 text-sm sm:leading-6"
                  >
                    <option value="0">--Select--</option>
                    {districts &&
                      districts.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                )}
              />
            )}
          </div>
          {errors["districtId"] && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {errors["districtId"].message}
            </p>
          )}
        </div>

        <div
          className={clsx(
            lcityId === "9999999999" ? "sm:col-span-2" : "sm:col-span-3"
          )}
        >
          <label
            htmlFor="postal-code"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            City
            {citiesFetching ? (
              <Spinner
                aria-label="Pink spinner example"
                color="pink"
                size="sm"
              />
            ) : null}
          </label>
          <div className="mt-2">
            {citiesFetching ? (
              <select className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 text-sm sm:leading-6">
                <option value="0">--Select--</option>
              </select>
            ) : (
              <Controller
                defaultValue={lcityId}
                name="cityId"
                control={control}
                render={({ field }) => (
                  <select
                    defaultValue={lcityId}
                    onChange={(e) => {
                      setCityId(e.target.value);
                      setValue("otherCity", "");
                      field.onChange(parseInt(e.target.value));
                    }}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 text-sm sm:leading-6"
                  >
                    <option value="0">--Select--</option>
                    {cities &&
                      cities.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    {cities && <option value="9999999999">Other</option>}
                  </select>
                )}
              />
            )}
          </div>
          {errors["cityId"] && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {errors["cityId"].message}
            </p>
          )}
        </div>

        <div
          className={clsx(
            lcityId === "9999999999" ? "sm:col-span-2" : "hidden"
          )}
        >
          <label
            htmlFor="fullname"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            City Name
          </label>
          <div className="relative mt-2">
            <input
              defaultValue={candidate.otherCity}
              type="text"
              {...register("otherCity")}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 text-sm sm:leading-6"
            />

            {errors["otherCity"] && (
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
          {errors["otherCity"] && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {errors["otherCity"].message}
            </p>
          )}
        </div>

        <div className="col-span-full">
          <label
            htmlFor="street-address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Address Line 1
          </label>
          <div className="mt-2">
            <input
              defaultValue={candidate.address1}
              type="text"
              {...register("address1")}
              id="street-address"
              autoComplete="street-address"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="street-address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Address Line 2
          </label>
          <div className="mt-2">
            <input
              defaultValue={candidate.address2}
              type="text"
              {...register("address2")}
              id="street-address"
              autoComplete="street-address"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      <div className="h-4"></div>
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={() => completeEdit()}
          className="text-sm rounded-md bg-white font-medium text-pink-600 hover:text-pink-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-sm rounded-md bg-white font-medium text-pink-600 hover:text-pink-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditContactAddress;
