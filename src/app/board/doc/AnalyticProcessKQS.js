"use client";

import React from "react";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import StepperProcess from "@/app/board/doc/components/StepperProcess";

export default function DataAnalyticsProcess() {
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery();

  return (
    <div className={"py-10 px-7"}>
      <p
        className={
          "text-primary-color font-semibold text-xl dark:text-third-color"
        }
      >
        Data Analytic Process
      </p>
      <StepperProcess />
    </div>
  );
}
