"use client";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cx } from "@/app/utilities/classnames";
import { isValidEmail } from "@/app/utilities/checkemail";
import OtpTimer from "./otptimer";
import signIn from "@/app/data/signin";
import sendEmailOtp from "@/app/data/emailotp";
import isValidPhone from "@/app/utilities/checkphone";
import sendPhoneOtp from "@/app/data/phoneotp";
import invokeAPI from "@/app/data/updateleadapi";

const SignIn = () => {
  const [signInMode, setSignInMode] = useState(false);
  const [isEmail, setIsEmail] = useState(true);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(-1);
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [fetchingOtp, setFetchingOtp] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [isSigninIn, setIsSigninIn] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const otpRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    if (!signInMode) {
      await checkAndSend();
    } else {
      const singleotp = otp.join("");
      let isValidLogin = true;
      if (isEmail) {
        if (!isValidEmail(username)) {
          isValidLogin = false;
          setErrors((state) => [...state, "Invalid Email"]);
        }
      } else {
        if (!isValidPhone(username)) {
          isValidLogin = false;
          setErrors((state) => [...state, "Invalid Phone"]);
        }
      }
      if (singleotp.length < 6) {
        isValidLogin = false;
        setErrors((state) => [...state, "Invalid OTP"]);
      }
      if (isValidLogin) {
        setIsSigninIn(true);
        try {
          const utm = {
            utm_source: searchParams.get("utm_source"),
            utm_medium: searchParams.get("utm_medium"),
            utm_campaign: searchParams.get("utm_campaign"),
          };
          console.log(utm);

          let loginData = {
            username,
            otp: singleotp,
            utm: null,
          };

          if (utm.utm_source || utm.utm_medium || utm.utm_campaign) {
            loginData = {
              ...loginData, // Keep the existing properties in loginData
              utm,
            };
          }

          const data = await signIn(loginData);

          if (data.errors) {
            throw new Error(data.errors[0].message);
          } else {
            const { onboarding } = data;
            if (onboarding.status) {
              router.replace("/dashboard");
            } else {

              console.log(onboarding.candidateId);

              const uname = '';
              let uphone = "";
              let email = "";
              const section = "Registration";
              const source = "";
              const paystatus = "";
              const candid = onboarding.candidateId
              
              if (!isValidPhone(username)) {
                      uphone = "";
                     }else{
                      uphone = username;
                     }
              
                     if (!isValidEmail(username)) {
                      email = "";
                     }else{
                      email = username;
                     }
                   
                    await invokeAPI({email: email,name: uname, phone: uphone, section: section, paystatus: paystatus, source: source, candid: candid});


              router.replace("/onboarding");
            }
          }
        } catch (error) {
          setIsSigninIn(false);
          setErrors((state) => [...state, error.message]);
        }
      }
    }
  };

  async function checkAndSend() {
    if (isEmail) {
      if (isValidEmail(username)) {
        await sendOtp(username, true);
      } else {
        setErrors((state) => [...state, "Invalid Email"]);
      }
    } else {
      if (isValidPhone(username)) {
        await sendOtp(username, false);
      } else {
        setErrors((state) => [...state, "Invalid Phone"]);
      }
    }
  }

  async function sendOtp(input, isEmail) {
    setFetchingOtp(true);
    let status = false;
    if (isEmail) {
      status = await sendEmailOtp({ email: input });
    } else {
      status = await sendPhoneOtp({ phone: input });
    }
    setFetchingOtp(false);
    if (status) {
      setOtpTimer();
      enableSignInMode();
    }
  }

  function setOtpTimer() {
    setShowResend(false);
    setShowTimer(true);
    setTimeout(() => {
      setShowResend(true);
      setShowTimer(false);
    }, 60000);
  }

  async function enableSignInMode() {
    setSignInMode(true);
    setOtp(new Array(6).fill(""));
    setActiveOtpIndex(0);
  }

  function handleOtpInputChange(e, index) {
    setErrors([]);
    const value = e.target.value;
    let newOtp = [...otp];
    newOtp[index] = value;

    if (!value) {
      setActiveOtpIndex(index - 1);
    } else {
      setActiveOtpIndex(index + 1);
    }
    setOtp(newOtp);
  }

  function checkInputType(e) {
    setErrors([]);
    const value = e.target.value;
    const numericRegex = /^[0-9]*$/;
    if (!numericRegex.test(value) || value === "") {
      setIsEmail(true);
    } else {
      setIsEmail(false);
    }
    setUsername(value);
  }

  function handleOtpKeyDown(e, index) {}

  useEffect(() => {
    otpRef.current?.focus();
  }, [activeOtpIndex]);
  return (
    <div className="flex flex-1 flex-col justify-center px-6 lg:px-8">
      <div className="border-b border-gray-200 rounded-lg shadow bg-white px-4 py-5 sm:px-6 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-3">
          <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up / Sign In
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {errors.map((error, i) => (
            <p key={i} className="mt-2 text-sm text-red-600">
              {error}
            </p>
          ))}
          <div className="relative">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email / Phone
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              {!isEmail && (
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <label htmlFor="phonecode" className="sr-only">
                    Country
                  </label>
                  <select
                    id="phonecode"
                    name="phonecode"
                    className="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  >
                    <option value="+91">+91</option>
                  </select>
                </div>
              )}
              <input
                type="text"
                id="username"
                name="username"
                className={cx(
                  "block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                  isEmail ? "" : "pl-20"
                )}
                onChange={checkInputType}
                placeholder="Enter Email or Phone"
              />
            </div>
          </div>
          {signInMode && (
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                OTP
              </label>
              <div className="mt-2 flex justify-evenly gap-2">
                {otp.map((_, index) => {
                  return (
                    <input
                      key={index}
                      ref={activeOtpIndex === index ? otpRef : null}
                      type="text"
                      onChange={(e) => handleOtpInputChange(e, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      value={otp[index]}
                      maxLength={1}
                      className="text-center no-spinner block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    />
                  );
                })}
              </div>
              <div className="text-sm mt-2 text-right">
                {showTimer && <OtpTimer />}
                {showResend && (
                  <Link
                    href="#"
                    onClick={() => checkAndSend()}
                    className="font-semibold text-pink-600 hover:text-pink-500"
                  >
                    Resend OTP
                  </Link>
                )}
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={fetchingOtp || isSigninIn}
              className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              {fetchingOtp
                ? "Fetching OTP..."
                : signInMode
                ? isSigninIn
                  ? "Processing..."
                  : "Sign Up / Sign In"
                : "Get OTP"}
            </button>
          </div>
        </form>
        <div className="mt-5 text-center">
          <Link
            href="#admissioninstructions"
            className="font-semibold text-pink-600"
          >
            Click for instructions <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
