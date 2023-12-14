"use client";
import React, { useEffect, useState } from "react";

const OtpTimer = () => {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(countdownInterval);
  }, [seconds]);

  return <p>Resend in : {seconds} seconds</p>;
};

export default OtpTimer;
