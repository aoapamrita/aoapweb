"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import DataLoader from "@/app/components/DataLoader";
import { useRouter } from "next/navigation";
import { forgotCounsellorPassword } from "@/app/data/counsellor/counsellor";

const ForgotSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .email("Enter Valid Email"),
});

export default function ForgotPassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: async (data, context, options) => {
      // you can debug your validation schema here
      console.log("formData", data);
      console.log(
        "validation result",
        await yupResolver(ForgotSchema)(data, context, options)
      );
      return yupResolver(ForgotSchema)(data, context, options);
    },
  });

  const onSubmit = async (data) => {
    console.log("processing data", data);
    const result = await forgotCounsellorPassword(data.username);
    console.log("processed data", result);
    router.push("/counsellor/forgotpassword/send");
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            AOAP Counsellor Forgot Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                username
              </label>
              <div className="mt-2">
                <input
                  {...register("username")}
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors["username"] && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors["username"].message}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
              >
                {isSubmitting ? <DataLoader size="sm" /> : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
