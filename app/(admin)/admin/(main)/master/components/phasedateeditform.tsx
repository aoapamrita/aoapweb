import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { updateExam } from "@/app/data/admin/exam";
import DatepickerComponent from "./DatepickerComponent";

const Schema = yup.object().shape({});

const PhaseDateEditForm = ({ exam, completeEdit }) => {
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
      <DatepickerComponent
        control={control}
        name="phaseenddate"
        defaultValue={exam.phaseenddate}
        transform={{
          input: (dateValue) => ({
            startDate: dateValue,
            endDate: dateValue,
          }),
          output: (dateRange) => dateRange.startDate,
        }}
      />
      {errors["phaseenddate"] && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errors["phaseenddate"].message}
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

export default PhaseDateEditForm;
