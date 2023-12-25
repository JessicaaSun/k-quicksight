"use client";

import React, {useEffect} from "react";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {FaBook, FaClock, FaFolder, FaShare} from "react-icons/fa";
import { FaSquarePollVertical, FaTableColumns } from "react-icons/fa6";
import {generateBashURL} from "@/utils/util";
import {IoDocumentText} from "react-icons/io5";
import {HiShare} from "react-icons/hi";

const contentRoute = {
  file: {
    _name: "Files",
    recent: {
      icon: <IoDocumentText />,
      name: "Relevance",
      route: "/board/doc",
    },
    dataset: {
      icon: <FaFolder />,
      name: "Dataset",
      route: "/board/dataset",
    },
    shareWithMe: {
      icon: <HiShare />,
      name: "Shared files",
      route: "/board/share-with-me",
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
      name: "Dashboard",
      route: "/board/dashboard",
    },
  },
};

const BoardSidebar = ({ toggleSidebar }) => {
  const { data: user, isSuccess, refetch: refetchUser } = useGetUserQuery();
  const pathname = usePathname();

  useEffect(() => {
    refetchUser();
  }, [refetchUser, user]);

  return (
    <div
      className={`${
        toggleSidebar ? "ml-[-1000px]" : ""
      } border-r-1 dark:bg-dark-bg border-gray-200 bg-white dark:bg-dark-bg dark:text-white text-text-color transition-all text-description-color z-20 left-0 px-5 pb-10 pt-5 fixed flex flex-col gap-5 top-[64px] lg:overflow-y-hidden md:overflow-y-scroll min-w-[255px] min-h-screen`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className={"flex gap-5 items-center"}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={
            "border-2 border-primary w-[50px] h-[50px] object-cover rounded-full"
          }
          src={generateBashURL(user?.data.avatar)}
          alt={"profile"}
        />
        <div>
          <p className={"text-primary-color dark:text-third-color truncate w-[130px] text-xl font-semibold"}>
            {user?.data.full_name}
          </p>
          <p className={"text-description-color dark:dark:text-white truncate w-[130px]"}>
            {user?.data.email}
          </p>
        </div>
      </div>
      <div className={"flex mt-4 flex-col gap-3"}>
        <p className={"text-lg font-semibold dark:text-third-color text-primary-color text-semibold"}>
          {contentRoute.file._name}
        </p>
        <div className={"flex flex-col gap-2"}>

          <Link
            className={` text-text-color text-lg pl-5 py-2 hover:bg-primary-color ${
              pathname.startsWith(contentRoute.file.dataset.route)
                ? "bg-primary-color dark:bg-third-color text-white"
                : "bg-white dark:bg-dark-bg dark:text-white text-text-color"
            } hover:dark:text-white text-text-color transition-all rounded-xl flex justify-start items-center gap-5`}
            href={contentRoute.file.dataset.route}
          >
            {contentRoute.file.dataset.icon}
            {contentRoute.file.dataset.name}
          </Link>
          <Link
              className={`text-text-color hover:text-white text-lg pl-5 py-2 hover:bg-primary-color ${
                  pathname.startsWith(contentRoute.file.shareWithMe.route)
                      ? "bg-primary-color text-white dark:bg-third-color"
                      : "bg-white dark:bg-dark-bg dark:text-white text-text-color"
              } hover:dark:text-white text-text-color transition-all rounded-xl flex justify-start items-center gap-5`}
              href={contentRoute.file.shareWithMe.route}
          >
            {contentRoute.file.shareWithMe.icon}
            {contentRoute.file.shareWithMe.name}
          </Link>
          <Link
              className={` text-text-color text-lg pl-5 py-2 hover:text-white hover:bg-primary-color ${
                  pathname.startsWith(contentRoute.file.recent.route)
                      ? "bg-primary-color text-white dark:bg-third-color"
                      : "bg-white dark:bg-dark-bg dark:text-white text-text-color"
              } hover:dark:text-white text-text-color transition-all rounded-xl flex justify-start items-center gap-5`}
              href={contentRoute.file.recent.route}
          >
            {contentRoute.file.recent.icon}
            {contentRoute.file.recent.name}
          </Link>
        </div>
      </div>
      <div className={"flex flex-col gap-3"}>
        <p
          className={"text-lg font-semibold dark:text-third-color text-primary-color text-semi-bold"}
        >
          {contentRoute.visualization._name}
        </p>
        <div className={"flex flex-col gap-2"}>
          <Link
            className={`${
              pathname.startsWith(contentRoute.visualization.analysis.route)  ? "bg-primary-color text-white dark:bg-third-color"
                  : "bg-white dark:bg-dark-bg dark:text-white text-text-color "
            } text-text-color text-lg  pl-5 py-2 hover:bg-primary-color hover:text-white transition-all rounded-xl flex justify-start items-center gap-5`}
            href={contentRoute.visualization.analysis.route}
          >
            {contentRoute.visualization.analysis.icon}
            {contentRoute.visualization.analysis.name}
          </Link>
          <Link
            className={`${
              pathname.startsWith(contentRoute.visualization.dashboard.route)  ? "bg-primary-color dark:bg-third-color text-white "
                  : "bg-white dark:bg-dark-bg dark:text-white text-text-color"
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
