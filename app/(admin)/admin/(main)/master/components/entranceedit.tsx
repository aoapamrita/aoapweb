import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEntrance } from "@/app/data/entranceclient";
import DataLoader from "@/app/components/DataLoader";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const EntranceSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(1, "Minimum 8 characters"),
  code: yup
    .string()
    .required("Code is required")
    .min(4, "Minimum 4 characters"),
  description: yup.string().required("Description is required"),
});

const EntranceEdit = ({ item, editCompleted }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: async (data, context, options) => {
      // you can debug your validation schema here
      console.log("formData", data);
      console.log(
        "validation result",
        await yupResolver(EntranceSchema)(data, context, options)
      );
      return yupResolver(EntranceSchema)(data, context, options);
    },
  });

  const { mutate: editMutate, isLoading: editMutationLoading } = useMutation({
    mutationFn: (data) => updateEntrance(data),
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries(["entrance"]);
      editCompleted();
    },
  });

  async function onSumbit(data) {
    await editMutate({ id: item.id, input: data });
  }
  return (
    <div>
      <form
        action=""
        className="flex gap-4 flex-col"
        onSubmit={handleSubmit(onSumbit)}
      >
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="fullname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="relative mt-2">
              <input
                type="text"
                defaultValue={item.name}
                {...register("name")}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
              {errors["name"] && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ExclamationCircleIcon
                    className="h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
            {errors["name"] && (
              <p className="mt-2 text-sm text-red-600" id="email-error">
                {errors["name"].message}
              </p>
            )}
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="code"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Code
            </label>
            <div className="relative mt-2">
              <input
                type="text"
                defaultValue={item.code}
                {...register("code")}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
              {errors["code"] && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ExclamationCircleIcon
                    className="h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
            {errors["code"] && (
              <p className="mt-2 text-sm text-red-600" id="email-error">
                {errors["code"].message}
              </p>
            )}
          </div>
          <div className="sm:col-span-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                defaultValue={item.description}
                rows={4}
                {...register("description")}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors["description"] && (
              <p className="mt-2 text-sm text-red-600" id="email-error">
                {errors["description"].message}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => editCompleted()}
            disabled={editMutationLoading}
            className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={editMutationLoading}
            className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
          >
            {editMutationLoading ? <DataLoader size="sm" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EntranceEdit;
