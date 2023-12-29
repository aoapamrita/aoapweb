import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { updateExam } from "@/app/data/admin/exam";

const Schema = yup.object().shape({
  phaseno: yup
    .number()
    .typeError("Enter 0 or greater")
    .min(0, "Enter 0 or greater")
    .required("Enter 0 or greater"),
});

const PhaseNoeditForm = ({ exam, completeEdit }) => {
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
      <input
        defaultValue={exam.phaseno}
        type="text"
        id="phaseno"
        {...register("phaseno", { valueAsNumber: true })}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 text-sm sm:leading-6"
      />
      {errors["phaseno"] && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errors["phaseno"].message}
        </p>
      )}
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

export default PhaseNoeditForm;
