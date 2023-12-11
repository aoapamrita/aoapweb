import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import createCandidate from "@/app/data/updateCandidate";
import { updateCandidateById } from "@/app/data/admin/candidate";
import { useQuery } from "@tanstack/react-query";
import getGender from "@/app/data/getGender";
import DataLoader from "@/app/components/DataLoader";
import DatepickerComponent from "./DatepickerComponent";

const ValueEditDateForm = ({
  candidateId,
  field,
  value,
  schema,
  setEditMode,
}) => {
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
        await yupResolver(schema)(data, context, options)
      );
      return yupResolver(schema)(data, context, options);
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    clearErrors();
    const res = await updateCandidateById(candidateId, data);
    if (res.errors) {
      res.errors.forEach((error) => {
        setError(error.field, {
          type: "custom",
          message: error.message,
        });
      });
    } else {
      setEditMode(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DatepickerComponent
        control={control}
        name={field}
        defaultValue={value}
        transform={{
          input: (dateValue) => ({
            startDate: dateValue,
            endDate: dateValue,
          }),
          output: (dateRange) => dateRange.startDate,
        }}
      />
      {errors[field] && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errors[field].message}
        </p>
      )}
      <div className="h-2"></div>
      <span className="ml-4 flex-shrink-0 flex gap-3 justify-end ">
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
      </span>
    </form>
  );
};

export default ValueEditDateForm;
