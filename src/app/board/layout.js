"use client";
import React, { useState } from "react";
import Navbar from "@/app/board/components/BoardNavbar";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import authenticated from "@assets/images/authentication.png";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { useSidebar } from "@/context/BoardSideBarContext";

export default function BoardRootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const { data: user, isLoading } = useGetUserQuery();
  const noMargin = pathname.includes("dashboard/", "analysis/");

  const { isSidebarHidden } = useSidebar();

  if (isLoading) {
    return <Loading />;
  } else if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-28">
        <Image
          src={authenticated}
          alt={"authorize"}
          className={"lg:w-1/4 md:w-2/3 w-full"}
        />
        <p
          className={
            "lg:text-2xl md:text-xl text-lg text-primary-color font-bold text-center"
          }
        >
          This page has been not authenticated
        </p>
        <Button
          onClick={() => router.push("/")}
          className={"mt-10 bg-primary-color text-background-color"}
        >
          <svg
            width="25"
            height="26"
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.155 13.2996L16.2245 18.4558C16.3223 18.5519 16.4003 18.6669 16.454 18.794C16.5076 18.921 16.5359 19.0577 16.5371 19.196C16.5383 19.3344 16.5123 19.4715 16.4608 19.5995C16.4094 19.7276 16.3333 19.8439 16.2371 19.9417C16.141 20.0395 16.0266 20.1168 15.9008 20.1692C15.7749 20.2216 15.6401 20.2479 15.5041 20.2467C15.3681 20.2455 15.2337 20.2168 15.1088 20.1622C14.9838 20.1076 14.8708 20.0282 14.7763 19.9288L8.98283 14.036C8.79083 13.8407 8.68298 13.5758 8.68298 13.2996C8.68298 13.0234 8.79083 12.7585 8.98283 12.5631L14.7763 6.67043C14.8708 6.57094 14.9838 6.49158 15.1088 6.43699C15.2337 6.38239 15.3681 6.35366 15.5041 6.35246C15.6401 6.35125 15.7749 6.37761 15.9008 6.42999C16.0266 6.48236 16.141 6.55971 16.2371 6.65751C16.3333 6.75532 16.4094 6.87162 16.4608 6.99964C16.5123 7.12766 16.5383 7.26482 16.5371 7.40314C16.5359 7.54145 16.5076 7.67813 16.454 7.80522C16.4003 7.93231 16.3223 8.04725 16.2245 8.14334L11.155 13.2996Z"
              fill="white"
            />
          </svg>
          Back to homepage
        </Button>
      </div>
    );
  } else if (user) {
    return (
      <section>
        {noMargin  ? "" : <Navbar />}
        <div
          id={"board"}
          className={`${
            noMargin
              ? `${isSidebarHidden ? "pl-0" : "lg:pl-[255px]"} pt-[64px]`
              : "lg:pl-[270px] py-[70px]"
          }  bg-background-color min-h-screen`}
        >
          {children}
        </div>
      </section>
    );
  }
}
