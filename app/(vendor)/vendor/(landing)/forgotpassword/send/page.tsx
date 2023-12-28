import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            AOAP Agent Forgot Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-5">
          <p>
            New password is mailed to you. Please check your registered email.
          </p>
          <div className="text-sm">
            <Link
              href="/agent"
              className="font-semibold text-pink-600 hover:text-pink-500"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
