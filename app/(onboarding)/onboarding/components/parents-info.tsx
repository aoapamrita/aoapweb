"use client";
import OtpTimer from "@/app/(landing)/components/otptimer";
import DataLoader from "@/app/components/DataLoader";
import createCandidateParent from "@/app/data/createCandidateParent";
import sendEmailOtp from "@/app/data/emailotp";
import sendPhoneOtp from "@/app/data/phoneotp";
import updateOnboarding from "@/app/data/updateOnboarding";
import verifyEmailOtp from "@/app/data/verifyEmailOtp";
import verifyPhoneOtp from "@/app/data/verifyPhoneOtp";
import { isValidEmail } from "@/app/utilities/checkemail";
import isValidPhone from "@/app/utilities/checkphone";
import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/20/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spinner } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const ParentInfoSchmema = yup.object().shape({
  fullname: yup.string().required("Name Required"),
  phone: yup.string().required("Phone is required"),
  email: yup.string().required("Email is required").email("Enter Valid Email"),
});

const ParentsInfo = ({ showNext }) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: async (data, context, options) => {
      // you can debug your validation schema here
      return yupResolver(ParentInfoSchmema)(data, context, options);
    },
  });

  const onSubmit = async (data) => {
    let isEmailValid = true;
    let isPhoneValid = true;
    clearErrors();
    if (!isValidEmail(data.email)) {
      isEmailValid = false;
      setError("email", {
        type: "custom",
        message: "Email is not valid",
      });
    }
    if (!isValidPhone(data.phone)) {
      isPhoneValid = false;
      setError("phone", {
        type: "custom",
        message: "Phone is not valid",
      });
    }
    if (isEmailValid && isPhoneValid) {
      const res = await createCandidateParent(data);
      if (!res.errors) {
        const onboarding = await updateOnboarding({
          data: { current: 3 },
        });
        showNext();
      } else {
        res.errors.forEach((error) => {
          setError(error.field, {
            type: "custom",
            message: error.message,
          });
        });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Contact details of Parent / Guardian
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Enter details of your parent or guardian.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-full">
              <label
                htmlFor="fullname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name of Parent / Guardian
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
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
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
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
        >
          {isSubmitting ? "Processing..." : "Next"}
        </button>
      </div>
    </form>
  );
};

export default ParentsInfo;
