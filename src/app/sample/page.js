"use client";

import React from "react";
import { Tabs } from "antd";
import sampleImage from "@assets/images/sampleSide.png";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useRouter } from "next/navigation";
import JupyterFiles from "@/app/sample/components/JupyterFiles";
import DatasetSample from "./components/DatasetSample";

const items = [
  {
    key: "1",
    label: "Analytic Notebook",
    children: <JupyterFiles />,
  },
  {
    key: "2",
    label: "Dataset",
    children: <DatasetSample />,
  },
  {
    key: "3",
    label: "Analysis",
    children: "Analysis will be latter!",
  },
  {
    key: "4",
    label: "Dashboard",
    children: "Dashboard will be latter",
  },
];
const SampleDataset_main = () => {
  const router = useRouter();
  const { data: user, isLoading } = useGetUserQuery();

  const handleRouteAddNewDataset = () => {
    if (!user) {
      router.push("/auth/login");
    } else {
      router.push("/board/dataset");
    }
  };

  return (
    <div
      className={
        "md:py-36 max-sm:pt-48 sm:pt-48 max-sm:pb-6 sm:pb-6 md:px-[10%] max-sm:px-8 sm:px-8"
      }
    >
      <div className={"lg:flex md:flex block justify-between items-center"}>
        <div className={"w-full grid gap-4"}>
          <h1 className={"text-primary-color dark:text-third-color"}>Sample</h1>
          <p className={"text-description-color dark:text-white/80"}>
            Explore, analyze, and share quality data. Learn more about data
            types, creating, and collaborating.
          </p>
          <Button
            onClick={handleRouteAddNewDataset}
            className={"bg-primary-color text-white w-fit mt-5"}
            size={"md"}
          >
            <FaPlus /> New dataset
          </Button>
        </div>
        <Image
          data-aos="zoom-in-down"
          className={"bg-transparent"}
          src={sampleImage}
          unoptimized={true}
          alt={"sample Image"}
          width={350}
          height={350}
        />
      </div>
      <Tabs
        defaultActiveKey="1"
        items={items}
        size={"large"}
        indicatorSize={(origin) => origin - 16}
      />
    </div>
  );
};
export default SampleDataset_main;
