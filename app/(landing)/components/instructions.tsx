import React from "react";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const Instructions = () => {
  return (
    <div className="bg-white px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <h1
          id="admissioninstructions"
          className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl"
        >
          Guidelines to complete the Amrita Entrance Examination registration.
        </h1>
        <p className="mt-6 text-lg sm:text-xl leading-8 font-bold">
          There are no agents or agencies entrusted by the Directorate of
          Admissions to offer any admissions on behalf of the university.
        </p>
        <p className="mt-6 sm:text-lg leading-8">
          Directorate of Admissions & Academic Outreach at Amrita Vishwa
          Vidyapeetham conducts entrance examinations every year for admission
          to all the undergraduate & integrated programmes. Prospective
          candidates are hereby informed that this is the only portal to
          register for the entrance examinations for admission to various
          undergraduate and integrated programmes.
        </p>
        <div className="mt-10 max-w-2xl space-y-5">
          <p>
            Steps to complete your Registration for Amrita Entrance
            Examinations:
          </p>
          <div>
            <p className="font-bold">Step 1 :</p>
            <ul role="list" className="mt-6 max-w-xl space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <p>
                  <span className="w-8 h-8 rounded-full border border-pink-700 text-pink-700 flex items-center justify-center">
                    1
                  </span>
                </p>
                <span>
                  Enter your Email ID OR Mobile Number to receive OTP to Sign Up
                  / Sign In. Note that, this Email ID OR Mobile Number will be
                  used as the primary channel for all the communications on
                  admissions.
                </span>
              </li>
              <li className="flex gap-x-3">
                <p>
                  <span className="w-8 h-8 rounded-full border border-pink-700 text-pink-700 flex items-center justify-center">
                    2
                  </span>
                </p>
                <span>
                  Fill the basic details like full name as per the records, date
                  of birth, social status, contact details, Aadhaar number, etc.
                  after successful sign-in.
                </span>
              </li>
              <li className="flex gap-x-3">
                <p>
                  <span className="w-8 h-8 rounded-full border border-pink-700 text-pink-700 flex items-center justify-center">
                    3
                  </span>
                </p>
                <span>Complete your address.</span>
              </li>
              <li className="flex gap-x-3">
                <p>
                  <span className="w-8 h-8 rounded-full border border-pink-700 text-pink-700 flex items-center justify-center">
                    4
                  </span>
                </p>
                <span>
                  Upload your latest photograph. The application may get
                  rejected even after paying the registration fee if the
                  photograph is found to be unclear. Signature in digital format
                  also needs to be uploaded.
                </span>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-bold">Step 2 :</p>
            <ul role="list" className="mt-6 max-w-xl space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <p>
                  <span className="w-8 h-8 rounded-full border border-pink-700 text-pink-700 flex items-center justify-center">
                    1
                  </span>
                </p>
                <span>
                  Enter the name, Email ID & Mobile number of the
                  parent/guardian to proceed.
                </span>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-bold">Step 3 :</p>
            <ul role="list" className="mt-6 max-w-xl space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <p>
                  <span className="w-8 h-8 rounded-full border border-pink-700 text-pink-700 flex items-center justify-center">
                    1
                  </span>
                </p>
                <span>Select the state from where you studied +2</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="mt-8 italic">
              Now you have completed your profile entry.
            </p>
            <p className="mt-8">
              Next is to choose the entrance examination you wish to register by
              clicking on the “Apply” button in the respective entrance
              examination.
            </p>
            <p className="mt-8">
              In Step 1, choose 3 cities to attend the entrance. Note that it is
              mandatory to choose 3 cities. Check the option if you wish to seek
              admission based on JEE Mains 2024 Percentile also for B.Tech
              programmes. This option can be exercised later too.
            </p>
            <p className="mt-8">
              Next is to complete your payment and you are done with the
              registration!
            </p>
            <p className="mt-8 italic">
              <span className="font-bold text-lg text-red-600">*</span> Once you
              receive the welcome email, mark it as “Not Spam” or “Important” so
              that the future email communication doesn’t go to the Spam folder.
            </p>
            <p className="font-bold pt-6 text-sm text-gray-800">
              Call our Admission Support Officers if you have any queries:
              044-462 76066
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
