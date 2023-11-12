'use client'
import React from "react";
import Image from "next/image";
import quickSight from "@assets/logos/logo-square.png";
import istad_logo from "@assets/logos/istad_logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname()
  const data_link = [
    {
      name: "Feature",
      url: "/",
    },
    {
      name: "Tutorials",
      url: "/",
    },
    {
      name: "About us",
      url: "/",
    },
    {
      name: "Contact Us",
      url: "/",
    },
  ];
  const guide = [
    {
      name: "Sign Up",
      url: "/",
    },
    {
      name: "FAQs",
      url: "/",
    },
    {
      name: "Login",
      url: "/auth/login",
    },
  ];

  const validNavPath = ["/auth/login", "/auth/confirmation",  "/auth/signup", "/handle_error", "/testing"];

  if (validNavPath.includes(pathname)) return null;

  return (
    <div
      className={
        "bg-background-color w-full lg:flex md:flex-wrap block justify-between items-start px-16 pt-10"
      }
    >
      <div className={"flex flex-col gap-5"}>
        <div className={"flex gap-5"}>
          <Image
            src={quickSight}
            alt={"quickSight_logo"}
            className={"w-[73px] border-2 border-primary-color rounded-full"}
          />
          <Image
            src={istad_logo}
            alt={"quickSight_logo"}
            className={"w-[73px]"}
          />
        </div>
        <div>
          <a
            className={"text-xl font-semibold lowercase"}
            href={"mailto:kquicksight@gmail.com"}
          >
            kquicksight@gmail.com
          </a>
          <p className={"text-description-color font-normal"}>
            You can contact us by this email to get more information from us.{" "}
          </p>
        </div>
      </div>
      <div className={"flex flex-col gap-2"}>
        {data_link.map((e, index) => (
          <Link
            href={e.url}
            key={index}
            className={`font-[400] text-lg text-text-color hover:text-gray-500 transition-all`}
          >
            {e.name}
          </Link>
        ))}
      </div>
      <div className={"flex flex-col gap-2"}>
        {guide.map((e, index) => (
          <Link
            href={e.url}
            key={index}
            className={`font-[400] text-lg text-text-color hover:text-gray-500 transition-all`}
          >
            {e.name}
          </Link>
        ))}
      </div>
      <div className={"lg:w-1/4 md:w-2/3 "}>
        <span className={"font-[600] text-text-color text-[28px]"}>
          Unlocking Insights, Empowering Decisions with{" "}
          <span className={"text-secondary-color font-bold"}>K-QuickSight</span>
        </span>
      </div>
      <div className={"h-0.5 mt-10 w-full bg-description-color"}></div>
      <div
        className={
          "lg:flex md:flex block justify-between items-center w-full py-5"
        }
      >
        <a href={"/"} className={"hover:text-primary-color"}>
          K-QuickSight@ 2023. All rights reserved.
        </a>
        <div className={"flex gap-5"}>
          <a href={"/"} className={"hover:underline"}>
            Privacy
          </a>
          <a href={"/"} className={"hover:underline"}>
            Term and Service
          </a>
        </div>
      </div>
    </div>
  );
}
