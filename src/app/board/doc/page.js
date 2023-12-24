"use client";

import React from "react";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { Button, Input } from "@nextui-org/react";
import { mockData } from "@/app/board/mockData/mockData";
import Link from "next/link";
import Image from "next/image";
import { IoSearchSharp } from "react-icons/io5";
import StepperProcess from "@/app/board/doc/components/StepperProcess";

export default function UserBoard() {
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery();

  return (
    <div className={"py-10 px-7"}>
      <p className={"text-primary-color font-semibold text-xl dark:text-third-color"}>
        Documentary of processing data analysis
      </p>
      <StepperProcess />
    </div>
  );
}
