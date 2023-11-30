"use client";

import React from "react";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { Button, Input } from "@nextui-org/react";
import { mockData } from "@/app/board/mockData/mockData";
import Link from "next/link";
import Image from "next/image";
import {IoSearchSharp} from "react-icons/io5";

export default function UserBoard() {
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery();

    return (
        <div className={'py-10 px-5'}>
            Doc
        </div>
  );
}
