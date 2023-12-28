"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import signIn from "@/app/data/vendor/authenticationclient";
import { useState } from "react";
import DataLoader from "@/app/components/DataLoader";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

const LoginSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Minimum 8 characters"),
});

export default function SignIn() {
  const [loginError, setLoginError] = useState("");
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
        await yupResolver(LoginSchema)(data, context, options)
      );
      return yupResolver(LoginSchema)(data, context, options);
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    setLoginError("");
    const result = await signIn(data);
    if (result.errors) {
      setLoginError("Login Failed");
    } else {
      router.push("/vendor/dashboard");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            AOAP Vendor Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {loginError != "" && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {loginError}
            </p>
          )}
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
                  {...register("email")}
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors["email"] && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors["email"].message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    href="/vendor/forgotpassword"
                    className="font-semibold text-pink-600 hover:text-pink-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  {...register("password")}
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors["password"] && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors["password"].message}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
              >
                {isSubmitting ? <DataLoader size="sm" /> : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
