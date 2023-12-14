"use client";
import DataLoader from "@/app/components/DataLoader";
import { Spinner } from "flowbite-react";
import React from "react";
Spinner;
const loading = () => {
  return (
    <div className="text-center">
      <DataLoader size="xl" />
    </div>
  );
};

export default loading;
