"use client";
import React from "react";
import Image from "next/image";
import quickSight from "@assets/logos/logo-square.png";
import istad_logo from "@assets/logos/istad_logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMail } from "react-icons/io5";
import { FaHouse, FaPhone } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();
  const data_link = [
    {
      name: "Features",
      url: "/features",
    },
    {
      name: "Tutorials",
      url: "/tutorials",
    },
    {
      name: "About us",
      url: "/about-us",
    },
    {
      name: "Sample",
      url: "/sample",
    },
  ];
  const guide = [
    {
      name: "FAQs",
      url: "/faqs",
    },
    {
      name: "Contact Us",
      url: "/contact-us",
    },
    {
      name: "Sign Up",
      url: "/auth/signup",
    },

    {
      name: "Login",
      url: "/auth/login",
    },
  ];

  const contactInfo = [
    // {
    //   title:
    //     "No. 24, St. 562, Sangkat Boeung kak I, Khan Toul Kork, Phnom Penh, Cambodia",
    //   icon: <FaHouse className="text-third-color" />,
    //   link: "https://maps.app.goo.gl/kwzbq2ikNgExg3cY8",
    // },
    {
      title: "kquicksight@gmail.com",
      icon: <IoMail className="text-third-color" />,
      link: "mailto:kquicksight@gmail.com",
    },

    {
      title: "(+855) 95-990-910",
      icon: <FaPhone className="text-third-color" />,
      link: "tel:+85595990910",
    },
    {
      title: "Telegram",
      icon: <FaTelegramPlane className="text-third-color" />,
      link: "https://t.me/+qB5Xy2CmaJswMzll",
    },
  ];

  const validNavPath = [
    "/auth/login",
    "/auth/signup",
    "/auth/confirmation",
    "/handle_error",
    "/testing",
    "/board",
  ];

  if (validNavPath.some((path) => pathname.startsWith(path))) return null;

  return (
    <div
      className={
        "bg-background-color dark:text-white dark:bg-dark-bg w-full lg:flex md:flex-wrap block justify-between items-start md:px-16 max-sm:px-9 sm:px-9 pt-10"
      }
    >
      <div className={"flex lg:w-[33%] flex-col gap-5"}>
        <div className={"flex gap-5"}>
          <Image
            src={quickSight}
            alt={"quickSight_logo"}
            className={
              "w-[73px] border-2 dark:bg-white border-primary-color rounded-full"
            }
          />
          <Image
            src={istad_logo}
            alt={"quickSight_logo"}
            className={"w-[73px] rounded-full dark:bg-white"}
          />
        </div>
        <div className="md:pb-0 max-sm:pb-3 sm:pb-3">
          <span
            className={
              "font-[600] dark:text-white text-text-color max-sm:text-[20px] sm:text-[20px] md:text-[25px]"
            }
          >
            Unlocking Insights, Empowering Decisions with{" "}
            <span
              className={
                "text-primary-color whitespace-nowrap font-bold dark:text-third-color"
              }
            >
              K-QuickSight
            </span>
          </span>
        </div>
      </div>
      <div
        className={"flex md:pt-3 max-sm:pt-4 sm:pt-4 lg:pt-0 flex-col gap-2"}
      >
        {data_link.map((e, index) => (
          <Link
            href={e.url}
            key={index}
            className={`font-[400] dark:text-white text-lg text-text-color hover:text-gray-500 transition-all`}
          >
            {e.name}
          </Link>
        ))}
      </div>
      <div
        className={"flex md:pt-2 max-sm:pt-3 sm:pt-3 lg:pt-0 flex-col gap-2"}
      >
        {guide.map((e, index) => (
          <Link
            href={e.url}
            key={index}
            className={`font-[400] dark:text-white text-lg text-text-color hover:text-gray-500 transition-all`}
          >
            {e.name}
          </Link>
        ))}
      </div>

      <div className={"flex max-sm:pt-4 sm:pt-4 lg:pt-0 flex-col gap-2"}>
        <h4 className="text-text-color mb-2 dark:text-white">Contact</h4>
        {contactInfo.map((e, index) => (
          <Link
            target="_blank"
            href={e.link}
            key={index}
            className={`font-[400] flex items-center dark:text-white text-lg text-text-color hover:text-gray-500 transition-all`}
          >
            <span className="pe-3">{e.icon}</span>
            <span className="font-medium hover:text-primary-color dark:hover:text-gray-200 hover:underline">
              {e.title}
            </span>
          </Link>
        ))}
      </div>
      <div
        className={
          "h-0.5 md:mt-10  max-sm:mt-5 sm:mt-5 w-full bg-description-color"
        }
      ></div>
      <div
        className={
          "lg:flex md:flex block justify-between items-center w-full py-5"
        }
      >
        <a href={"/"} className={"hover:text-primary-color"}>
          K-QuickSight@ 2023. All rights reserved.
        </a>
        <div className={"flex gap-5"}>
          <a href={"/terms"} className={"hover:underline"}>
            Privacy
          </a>
          <a href={"/terms"} className={"hover:underline"}>
            Term and Service
          </a>
        </div>
      </div>
    </div>
  );
}
