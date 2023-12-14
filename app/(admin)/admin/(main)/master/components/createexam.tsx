import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createExam } from "@/app/data/admin/exam";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import DataLoader from "@/app/components/DataLoader";

const ExamSchema = yup.object().shape({
  description: yup.string().required("Description is required"),
});

const CreateExam = ({ entrance, completeCreate }) => {
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
        await yupResolver(ExamSchema)(data, context, options)
      );
      return yupResolver(ExamSchema)(data, context, options);
    },
  });

  const { mutate: addMutate, isLoading: addMutationLoading } = useMutation({
    mutationFn: (data) => createExam(data),
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries(["entrance"]);
      completeCreate();
    },
  });

  async function onSumbit(data) {
    await addMutate({ ...data, entranceId: entrance.id });
  }
  return (
    <div>
      <p className="block mt-5 mb-5 text-sm font-bold leading-6 text-gray-900">
        Create new Exam
      </p>
      <form
        action=""
        className="flex gap-4 flex-col"
        onSubmit={handleSubmit(onSumbit)}
      >
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="relative mt-2">
              <input
                type="text"
                {...register("description")}
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
            onClick={() => completeCreate(null)}
            disabled={addMutationLoading}
            className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={addMutationLoading}
            className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
          >
            {addMutationLoading ? <DataLoader size="sm" /> : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateExam;
