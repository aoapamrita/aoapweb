import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import createCandidate from "@/app/data/updateCandidate";
import { updateCandidateById } from "@/app/data/admin/candidate";

const ValueEditForm = ({ candidateId, field, value, schema, setEditMode }) => {
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
        await yupResolver(schema)(data, context, options)
      );
      return yupResolver(schema)(data, context, options);
    },
  });

  const onSubmit = async (data) => {
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
      <input
        defaultValue={value}
        type="text"
        id={`${field}`}
        {...register(`${field}`)}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 text-sm sm:leading-6"
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

export default ValueEditForm;
