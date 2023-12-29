"use client";
import React from "react";
import { Controller } from "react-hook-form";
import Datepicker from "react-tailwindcss-datepicker";

const DatepickerComponent = ({ control, transform, name, defaultValue }) => {
  return (
    <Controller
      defaultValue={defaultValue}
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Datepicker
          primaryColor={"pink"}
          asSingle
          useRange={false}
          value={transform.input(value)}
          onChange={(e) => onChange(transform.output(e))}
          displayFormat={"DD/MM/YYYY"}
          inputClassName="relative transition-all duration-300 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
        />
      )}
    />
  );
};

export default DatepickerComponent;
