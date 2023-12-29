"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import createCandidatePlustwo from "@/app/data/createCandidatePlustwo";
import updateOnboarding from "@/app/data/updateOnboarding";
import { useQuery } from "@tanstack/react-query";
import getStates from "@/app/data/getStates";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Spinner } from "flowbite-react";
import sendWelcome from "@/app/data/admin/sendwelcome";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import getCandidate from "@/app/data/getCandidate";
import invokeAPI from "@/app/data/updateleadapi";

const AcademicInfoSchema = yup.object().shape({
  stateId: yup
    .number()
    .test({
      test: (value) => value !== 0,
      message: "Please select State",
    })
    .required("Please select state"),
  otherState: yup.string().when("stateId", {
    is: 9999999999,
    then: (schema) => schema.required("State Name is required"),
    otherwise: (schema) => schema,
  }),
});

const AcademicInfo = ({ candidate }) => {
  const router = useRouter();
  const [stateId, setStateId] = useState(candidate.PlusTwoInfo?.stateId);

  const { data: states, isLoading: statesLoading } = useQuery({
    queryKey: ["states"],
    queryFn: () => getStates(),
  });

  const { data: candidate, isLoading: candidateLoading } = useQuery({
    queryKey: ["candidate"],
    queryFn: () => getCandidate(),
  });

  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: async (data, context, options) => {
      // you can debug your validation schema here
      console.log("formData", data);
      console.log(
        "validation result",
        await yupResolver(AcademicInfoSchema)(data, context, options)
      );
      return yupResolver(AcademicInfoSchema)(data, context, options);
    },
  });

  const onSubmit = async (data) => {
    console.log("plus two data", data);
    const res = await createCandidatePlustwo(data);

    const onboarding = await updateOnboarding({
      data: { status: true },
    });

    console.log(candidate.id);

    const candid = candidate.id;
    const uname = candidate.fullname;
    let uphone = candidate.phone;
    let email = candidate.email;
    const source = candidate.infosource.name;
    const section = "Personal Details";
    const paystatus = "Unpaid";
 await invokeAPI({email: email,name: uname, phone: uphone, section: section, paystatus: paystatus,source :source,candid: candid});


    const mail = await sendWelcome();
    console.log(mail);

    router.replace("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Academic Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            <em>
              <b>*</b> Note to indicate that the responsibility of entering the
              correct data lies with the candidate and university will not be
              responsible for not getting communication if wrong data is entered
            </em>
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div
              className={clsx(
                stateId === 9999999999 ? "sm:col-span-3" : "sm:col-span-full"
              )}
            >
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Choose the state where you completed +2{" "}
                {statesLoading ? (
                  <Spinner
                    aria-label="Pink spinner example"
                    color="pink"
                    size="sm"
                  />
                ) : null}
              </label>
              <div className="relative mt-2">
                {statesLoading ? (
                  <select className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6">
                    <option value="0">--Select--</option>
                  </select>
                ) : (
                  <Controller
                    name="stateId"
                    defaultValue={stateId}
                    control={control}
                    render={({ field }) => (
                      <select
                        defaultValue={stateId}
                        disabled={candidate.PlusTwoInfo?.stateId ? true : false}
                        onChange={(e) => {
                          setStateId(parseInt(e.target.value));
                          field.onChange(parseInt(e.target.value));
                        }}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6"
                      >
                        <option value="0">--Select--</option>
                        {states.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                        <option value="9999999999">Other</option>
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
                stateId === 9999999999 ? "sm:col-span-3" : "hidden"
              )}
            >
              <label
                htmlFor="fullname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State Name
              </label>
              <div className="relative mt-2">
                <input
                  type="text"
                  id="otherState"
                  {...register("otherState")}
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
              {errors["otherState"] && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors["otherState"].message}
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
          {isSubmitting ? "Processing" : "Next"}
        </button>
      </div>
    </form>
  );
};

export default AcademicInfo;
