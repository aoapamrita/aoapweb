"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ExclamationTriangleIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { PiSignatureBold } from "react-icons/pi";
import DatepickerComponent from "./DatepickerComponent";
import { useForm, Controller } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import updateOnboarding from "@/app/data/updateOnboarding";
import { useQuery } from "@tanstack/react-query";
import getGender from "@/app/data/getGender";
import getSocialStatus from "@/app/data/getSocialStatus";
import { Spinner } from "flowbite-react";
import getInfoSource from "@/app/data/getInfoSource";
import getStates from "@/app/data/getStates";
import getDistrictByState from "@/app/data/getDistrictByState";
import getCityByDistrict from "@/app/data/getCityByDistrict";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import OtpTimer from "@/app/(landing)/components/otptimer";
import sendEmailOtp from "@/app/data/emailotp";
import verifyEmailOtp from "@/app/data/verifyEmailOtp";
import { isValidEmail } from "@/app/utilities/checkemail";
import DataLoader from "@/app/components/DataLoader";
import sendPhoneOtp from "@/app/data/phoneotp";
import verifyPhoneOtp from "@/app/data/verifyPhoneOtp";
import isValidPhone from "@/app/utilities/checkphone";
import { clsx } from "clsx";
import {
  createAgentCandidate,
  updateAgentOnboarding,
} from "@/app/data/agent/candidate";
import { useRouter } from "next/navigation";
import { UserContext } from "../../components/UserProvider";

const PersonalInfoSchema = yup.object().shape({
  fullname: yup.string().required("Name Required"),
  dob: yup.string().required("DOB is required"),
  genderId: yup.number().positive("Gender is required"),
  socialstatusId: yup.number().positive("Social Status is required"),
  infosourceId: yup.number().positive("Please select"),
  aadhaarnumber: yup
    .string()
    .matches(/^\d{12}$/, "Aadhar number must be exactly 12 digits")
    .required("Aadhar number is required"),
  phone: yup.string().required("Phone is required"),
  email: yup.string().required("Email is required").email("Enter Valid Email"),
  stateId: yup.number().required("Please select State"),
  districtId: yup.number().required("Please select District"),
  cityId: yup.number().required("Please select City"),
  otherCity: yup.string().when("cityId", {
    is: 9999999999,
    then: (schema) => schema.required("City Name is required"),
    otherwise: (schema) => schema,
  }),
  photoid: yup.string().required("Upload Photo"),
  signid: yup.string().required("Upload Signature"),
});

interface CloudinaryResult {
  public_id: string;
}

const PersonalInfo = () => {
  const [lstateId, setStateId] = useState(null);
  const [ldistrictId, setDistrictId] = useState(null);
  const [lcityId, setCityId] = useState(null);

  const [lphotoid, setPhotoId] = useState("");
  const [lsignid, setSignId] = useState("");

  const router = useRouter();
  const { id: agentId } = useContext(UserContext);

  console.log("agent user", agentId);

  const { data: gender, isLoading: genderLoading } = useQuery({
    queryKey: ["gender"],
    queryFn: () => getGender(),
  });

  const { data: socialStatus, isLoading: socialStatusLoading } = useQuery({
    queryKey: ["socialstatus"],
    queryFn: () => getSocialStatus(),
  });

  const { data: infoSource, isLoading: infoSourceLoading } = useQuery({
    queryKey: ["infosource"],
    queryFn: () => getInfoSource(),
  });

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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: async (data, context, options) => {
      // you can debug your validation schema here
      console.log("formData", data);
      const fulldata = { ...data, photoid: lphotoid, signid: lsignid };
      console.log(
        "validation result",
        await yupResolver(PersonalInfoSchema)(fulldata, context, options)
      );
      return yupResolver(PersonalInfoSchema)(fulldata, context, options);
    },
  });

  const onSubmit = async (data) => {
    const submitData = { ...data, agentId };

    const res = await createAgentCandidate(submitData);

    if (!res.errors) {
      const onboarding = await updateAgentOnboarding({
        data: { current: 2, candidateId: res.id },
      });
      router.push(`/agent/candidate/${res.id}`);
    } else {
      res.errors.forEach((error) => {
        setError(error.field, {
          type: "custom",
          message: error.message,
        });
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          {errors["server"] && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {errors["server"].message}
            </p>
          )}

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="fullname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name (As in 10th class certificate)
              </label>
              <div className="relative mt-2">
                <input
                  type="text"
                  id="fullname"
                  {...register("fullname")}
                  autoComplete="fullname"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                />
                {errors["fullname"] && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {errors["fullname"] && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors["fullname"].message}
                </p>
              )}
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="dob"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                DOB
              </label>
              <div className="relative mt-2">
                <DatepickerComponent
                  control={control}
                  name="dob"
                  defaultValue=""
                  transform={{
                    input: (dateValue) => ({
                      startDate: dateValue,
                      endDate: dateValue,
                    }),
                    output: (dateRange) => dateRange.startDate,
                  }}
                />
                {errors["dob"] && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {errors["dob"] && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors["dob"].message}
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Gender{" "}
                {genderLoading ? (
                  <Spinner
                    aria-label="Pink spinner example"
                    color="pink"
                    size="sm"
                  />
                ) : null}
              </label>
              <div className="relative mt-2">
                <select
                  {...register("genderId", { valueAsNumber: true })}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
                >
                  <option value="0">--Select--</option>
                  {gender &&
                    gender.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              {errors["genderId"] && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors["genderId"].message}
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Social Status{" "}
                {socialStatusLoading ? (
                  <Spinner
                    aria-label="Pink spinner example"
                    color="pink"
                    size="sm"
                  />
                ) : null}
              </label>
              <div className="mt-2">
                <select
                  id="socialstatusId"
                  {...register("socialstatusId", { valueAsNumber: true })}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
                  defaultValue="0"
                >
                  <option value="0">--Select--</option>
                  {socialStatus &&
                    socialStatus.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              {errors["socialstatusId"] && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors["socialstatusId"].message}
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="flex gap-2">
                <div className="relative mt-2 flex-1">
                  <input
                    type="text"
                    {...register("email")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                  />

                  {errors["email"] && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                      <ExclamationCircleIcon
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
              </div>
              {errors["email"] && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors["email"].message}
                </p>
              )}
            </div>

            <div className="relative sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone
              </label>
              <div className="flex gap-2">
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <label htmlFor="country" className="sr-only">
                      Country
                    </label>
                    <select
                      id="phonecode"
                      {...register("phonecode")}
                      className="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm"
                    >
                      <option value="+91">+91</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    {...register("phone")}
                    className="block pl-20 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                  />
                  {errors["phone"] && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ExclamationCircleIcon
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
              </div>

              {errors["phone"] && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors["phone"].message}
                </p>
              )}
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                How did you come to know about Amrita?
                {infoSourceLoading ? (
                  <Spinner
                    aria-label="Pink spinner example"
                    color="pink"
                    size="sm"
                  />
                ) : null}
              </label>
              <div className="mt-2">
                <select
                  id="infosourceId"
                  {...register("infosourceId", { valueAsNumber: true })}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
                  defaultValue="0"
                >
                  <option value="0">--Select--</option>
                  {infoSource &&
                    infoSource.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              {errors["infosourceId"] && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors["infosourceId"].message}
                </p>
              )}
            </div>

            <div className="col-span-full">
              <label
                htmlFor="aadhaarnumber"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Aadhaar Number
              </label>
              <div className="relative mt-2">
                <input
                  type="text"
                  {...register("aadhaarnumber")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                />
                {errors["aadhaarnumber"] && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {errors["aadhaarnumber"] && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors["aadhaarnumber"].message}
                </p>
              )}
            </div>

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
                <Controller
                  name="stateId"
                  control={control}
                  render={({ field }) => (
                    <select
                      onChange={(e) => {
                        setStateId(parseInt(e.target.value));
                        setDistrictId(null);
                        field.onChange(parseInt(e.target.value));
                      }}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
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
              </div>
              {errors["stateId"] && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors["stateId"].message}
                </p>
              )}
            </div>

            <div
              className={clsx(
                lcityId === 9999999999 ? "sm:col-span-2" : "sm:col-span-3",
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
                <Controller
                  name="districtId"
                  control={control}
                  render={({ field }) => (
                    <select
                      onChange={(e) => {
                        setDistrictId(parseInt(e.target.value));
                        field.onChange(parseInt(e.target.value));
                      }}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
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
              </div>
              {errors["districtId"] && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors["districtId"].message}
                </p>
              )}
            </div>

            <div
              className={clsx(
                lcityId === 9999999999 ? "sm:col-span-2" : "sm:col-span-3"
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
                <Controller
                  name="cityId"
                  control={control}
                  render={({ field }) => (
                    <select
                      onChange={(e) => {
                        setCityId(parseInt(e.target.value));
                        field.onChange(parseInt(e.target.value));
                      }}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
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
              </div>
              {errors["cityId"] && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors["cityId"].message}
                </p>
              )}
            </div>

            <div
              className={clsx(
                lcityId === 9999999999 ? "sm:col-span-2" : "hidden"
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
                  type="text"
                  id="otherCity"
                  {...register("otherCity")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
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
                  type="text"
                  {...register("address1")}
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
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
                  type="text"
                  {...register("address2")}
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo
              </label>
              <div className="mt-4 flex flex-col items-start gap-3">
                {lphotoid ? (
                  <CldImage
                    src={lphotoid}
                    width={150}
                    height={250}
                    alt="Profile Picture"
                    sizes="100vw"
                    className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                  />
                ) : (
                  <UserCircleIcon
                    className="h-24 w-24 text-gray-300"
                    aria-hidden="true"
                  />
                )}
                <CldUploadWidget
                  uploadPreset="cedievmy"
                  options={{
                    sources: ["local"],
                    multiple: false,
                    maxFiles: 5,
                  }}
                  onUpload={(result, widget) => {
                    if (result.event !== "success") return;
                    const info = result.info as CloudinaryResult;
                    setPhotoId(info.public_id);
                    clearErrors("photoid");
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      className="rounded-md border border-pink-600 px-3 py-2 text-sm font-semibold text-pink-600 shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                      onClick={() => open()}
                    >
                      Upload
                    </button>
                  )}
                </CldUploadWidget>
              </div>
              {errors["photoid"] && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors["photoid"].message}
                </p>
              )}
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Signature
              </label>
              <div className="mt-4 flex flex-col items-start gap-3">
                {lsignid ? (
                  <CldImage
                    src={lsignid}
                    width={300}
                    height={100}
                    sizes="100vh"
                    alt="A coffee image"
                    className="border border-gray-100 h-24 w-48 flex-none rounded-lg bg-white-800 object-contain"
                  />
                ) : (
                  <PiSignatureBold
                    className="h-24 w-24 text-gray-300"
                    aria-hidden="true"
                  />
                )}
                <CldUploadWidget
                  uploadPreset="cedievmy"
                  options={{
                    sources: ["local"],
                    multiple: false,
                    maxFiles: 5,
                  }}
                  onUpload={(result, widget) => {
                    if (result.event !== "success") return;
                    const info = result.info as CloudinaryResult;
                    setSignId(info.public_id);
                    clearErrors("signid");
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      className="rounded-md border border-pink-600 px-3 py-2 text-sm font-semibold text-pink-600 shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                      onClick={() => open()}
                    >
                      Upload
                    </button>
                  )}
                </CldUploadWidget>
              </div>
              {errors["signid"] && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors["signid"].message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
        >
          {isSubmitting ? "Processing..." : "Next"}
        </button>
      </div>
    </form>
  );
};

export default PersonalInfo;
