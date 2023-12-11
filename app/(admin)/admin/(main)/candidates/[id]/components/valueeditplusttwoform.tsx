import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  updateCandidateById,
  updateCandidatePlustwoById,
} from "@/app/data/admin/candidate";
import { useQuery } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import getStates from "@/app/data/getStates";
import clsx from "clsx";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

const AcademicInfoSchema = yup.object().shape({
  stateId: yup.string().test({
    test: (value) => value !== "0",
    message: "Please select State",
  }),
  otherState: yup.string().when("stateId", {
    is: "9999999999",
    then: (schema) => schema.required("State Name is required"),
    otherwise: (schema) => schema,
  }),
});

const ValueEditPlusTwoForm = ({ candidateId, value, setEditMode }) => {
  const [stateId, setStateId] = useState(
    value.stateId ? value.stateId : value.otherState != "" ? "9999999999" : null
  );

  const { data: states, isLoading } = useQuery({
    queryKey: ["states"],
    queryFn: () => getStates(),
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
      console.log("form data", data);

      console.log(
        "validation result",
        await yupResolver(AcademicInfoSchema)(data, context, options)
      );
      return yupResolver(AcademicInfoSchema)(data, context, options);
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    const res = await updateCandidatePlustwoById(candidateId, data);
    setEditMode();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
    >
      <div
        className={clsx(
          stateId === "9999999999" ? "sm:col-span-3" : "sm:col-span-full"
        )}
      >
        <label
          htmlFor="fullname"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Select State
        </label>
        <div className="relative mt-2">
          {isLoading ? (
            <select className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 sm:text-sm sm:leading-6">
              <option value="0">--Select--</option>
            </select>
          ) : (
            <Controller
              defaultValue={stateId}
              name="stateId"
              control={control}
              render={({ field }) => (
                <select
                  defaultValue={stateId}
                  onChange={(e) => {
                    setStateId(e.target.value);
                    field.onChange(e.target.value);
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
                  {states && <option value="9999999999">Other</option>}
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
        className={clsx(stateId === "9999999999" ? "sm:col-span-3" : "hidden")}
      >
        <label
          htmlFor="fullname"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          State Name
        </label>
        <div className="relative mt-2">
          <input
            defaultValue={value.otherState}
            type="text"
            id="otherState"
            {...register("otherState")}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
          />
          {errors["otherState"] && (
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

      <div className="sm:col-span-full flex gap-4 justify-end">
        <button
          type="button"
          onClick={() => setEditMode()}
          className="rounded-md bg-white font-medium text-pink-600 hover:text-pink-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-white font-medium text-pink-600 hover:text-pink-500"
        >
          {isSubmitting ? "Processing..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ValueEditPlusTwoForm;
