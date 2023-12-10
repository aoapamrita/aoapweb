import { yupResolver } from "@hookform/resolvers/yup";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { updateCandidateById } from "@/app/data/admin/candidate";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { PiSignatureBold } from "react-icons/pi";

interface CloudinaryResult {
  public_id: string;
}

const schema = yup.object().shape({
  signid: yup.string().required("Upload Signature"),
});

const ValueSignEdit = ({ candidateId, closeEdit }) => {
  const [lsignid, setSignId] = useState("");

  const {
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: async (data, context, options) => {
      // you can debug your validation schema here
      console.log("formData", data);
      const fulldata = { ...data, signid: lsignid };
      console.log(
        "validation result",
        await yupResolver(schema)(fulldata, context, options)
      );
      return yupResolver(schema)(fulldata, context, options);
    },
  });

  const onSubmit = async (data) => {
    const res = await updateCandidateById(candidateId, data);
    closeEdit();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <div className="mt-4 flex flex-col items-start gap-3">
          {lsignid ? (
            <CldImage
              src={lsignid}
              width={300}
              height={100}
              sizes="100vh"
              alt="Signature"
              className="border border-gray-100 h-24 w-48 flex-none rounded-lg bg-white-800 object-contain"
            />
          ) : (
            <PiSignatureBold
              className="h-24 w-24 text-gray-300"
              aria-hidden="true"
            />
          )}
          <CldUploadWidget
            uploadPreset="cedievmy"
            options={{
              sources: ["local"],
              multiple: false,
              maxFiles: 5,
            }}
            onUpload={(result, widget) => {
              if (result.event !== "success") return;
              const info = result.info as CloudinaryResult;
              setSignId(info.public_id);
              clearErrors("signid");
            }}
          >
            {({ open }) => (
              <button
                type="button"
                className="rounded-md border border-pink-600 px-3 py-2 text-sm font-semibold text-pink-600 shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                onClick={() => open()}
              >
                Upload
              </button>
            )}
          </CldUploadWidget>
        </div>
        {errors["signid"] && (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {errors["signid"].message}
          </p>
        )}
      </div>

      <div className="flex gap-3 justify-start">
        <button
          type="button"
          onClick={() => closeEdit()}
          className="rounded-md bg-white font-medium text-pink-600 hover:text-pink-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-white font-medium text-pink-600 hover:text-pink-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ValueSignEdit;
