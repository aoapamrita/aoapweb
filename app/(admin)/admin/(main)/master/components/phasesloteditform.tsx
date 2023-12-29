import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { updateExam } from "@/app/data/admin/exam";

const Schema = yup.object().shape({});

const PhaseSlotEditForm = ({ exam, completeEdit }) => {
  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: async (data, context, options) => {
      console.log(
        "validation result",
        await yupResolver(Schema)(data, context, options)
      );
      return yupResolver(Schema)(data, context, options);
    },
  });
  const onSubmit = async (data) => {
    clearErrors();
    console.log(data);

    const res = await updateExam({ id: exam.id, input: data });

    if (res.errors) {
      res.errors.forEach((error) => {
        setError(error.field, {
          type: "custom",
          message: error.message,
        });
      });
    } else {
      completeEdit();
    }
  };
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select
        defaultValue={exam.slotstatus}
        {...register("slotstatus", { setValueAs: (value) => value === "true" })}
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-pink-600 text-sm sm:leading-6"
      >
        <option value="false">Closed</option>
        <option value="true">Open</option>
      </select>
      <div className="h-2"></div>
      <span className="ml-4 flex-shrink-0 flex gap-3 justify-end ">
        <button
          type="button"
          onClick={() => completeEdit()}
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
      </span>
    </form>
  );
};

export default PhaseSlotEditForm;
