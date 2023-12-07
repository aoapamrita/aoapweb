"use client";
import { CldImage } from "next-cloudinary";
import React from "react";

const CldPicture = (props) => {
  return <CldImage {...props} />;
};

export default CldPicture;
