"use client";

import React from "react";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBook, FaClock, FaFolder } from "react-icons/fa";
import { FaSquarePollVertical, FaTableColumns } from "react-icons/fa6";

const contentRoute = {
  file: {
    _name: "Files",
    recent: {
      icon: <FaClock />,
      name: "Recent",
      route: "/board/recent",
    },
    dataset: {
      icon: <FaFolder />,
      name: "Dataset",
      route: "/board/dataset",
    },
    sample: {
      icon: <FaBook />,
      name: "Sample",
      route: "/board/sample",
    },
  },

  visualization: {
    _name: "visualization",
    analysis: {
      icon: <FaSquarePollVertical />,
      name: "Analysis",
      route: "/board/analysis",
    },
    dashboard: {
      icon: <FaTableColumns />,
      name: "dashboard",
      route: "/board/dashboard",
    },
  },
};

const BoardSidebar = ({ toggleSidebar }) => {
  const { data: user, isSuccess } = useGetUserQuery();
  const pathname = usePathname();

  return (
    <div
      className={`${
        toggleSidebar ? "ml-[-1000px]" : ""
      } border-r-1 border-gray-200 bg-white transition-all text-description-color z-20 left-0 px-5 pb-10 pt-5 fixed flex flex-col gap-5 top-[64px] lg:overflow-y-hidden md:overflow-y-scroll min-w-[255px] min-h-screen`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className={"flex gap-5 items-center"}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={
            "border-2 border-primary w-[50px] h-[50px] object-cover rounded-full"
          }
          src={
            user?.data.avatar
              ? user.data.avatar
              : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
          }
          alt={"profile"}
        />
        <div>
          <p className={"text-primary-color text-xl font-semibold"}>
            {user?.data.username}
          </p>
          <p className={"text-description-color truncate w-[130px]"}>
            {user?.data.email}
          </p>
        </div>
      </div>
      <div className={"flex mt-4 flex-col gap-3"}>
        <p className={"text-lg font-semibold text-primary-color text-semibold"}>
          {contentRoute.file._name}
        </p>
        <div className={"flex flex-col gap-2"}>
          <Link
            className={` text-text-color text-lg pl-5 py-2 hover:bg-primary-color ${
              pathname === contentRoute.file.recent.route
                ? "bg-primary-color text-white"
                : "bg-white"
            } hover:text-white transition-all rounded-xl flex justify-start items-center gap-5`}
            href={contentRoute.file.recent.route}
          >
            {contentRoute.file.recent.icon}
            {contentRoute.file.recent.name}
          </Link>
          <Link
            className={` text-text-color text-lg pl-5 py-2 hover:bg-primary-color ${
              pathname === contentRoute.file.dataset.route
                ? "bg-primary-color text-white"
                : "bg-white"
            } hover:text-white transition-all rounded-xl flex justify-start items-center gap-5`}
            href={contentRoute.file.dataset.route}
          >
            {contentRoute.file.dataset.icon}
            {contentRoute.file.dataset.name}
          </Link>
          <Link
            className={`text-text-color text-lg  pl-5 py-2 hover:bg-primary-color ${
              pathname === contentRoute.file.sample.route
                ? "bg-primary-color text-white"
                : "bg-white"
            } hover:text-white transition-all rounded-xl flex justify-start items-center gap-5`}
            href={contentRoute.file.sample.route}
          >
            {contentRoute.file.sample.icon}
            {contentRoute.file.sample.name}
          </Link>
        </div>
      </div>
      <div className={"flex flex-col gap-3"}>
        <p
          className={"text-lg font-semibold text-primary-color text-semi-bold"}
        >
          {contentRoute.visualization._name}
        </p>
        <div className={"flex flex-col gap-2"}>
          <Link
            className={`${
              pathname === contentRoute.visualization.analysis.route
            } text-text-color text-lg  pl-5 py-2 hover:bg-primary-color hover:text-white transition-all rounded-xl flex justify-start items-center gap-5`}
            href={contentRoute.visualization.analysis.route}
          >
            {contentRoute.visualization.analysis.icon}
            {contentRoute.visualization.analysis.name}
          </Link>
          <Link
            className={`${
              pathname === contentRoute.visualization.dashboard.route
            } text-text-color text-lg  pl-5 py-2 hover:bg-primary-color hover:text-white transition-all rounded-xl flex justify-start items-center gap-5`}
            href={contentRoute.visualization.dashboard.route}
          >
            {contentRoute.visualization.dashboard.icon}
            {contentRoute.visualization.dashboard.name}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BoardSidebar;
