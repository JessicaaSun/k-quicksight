import React from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/app/board/recent/searchIcons";
import {
  analysis_sample,
  mockData,
  sample_dataset,
} from "@/app/board/mockData/mockData";
import Link from "next/link";
import Image from "next/image";

const Sample_all = () => {
  return (
    <div className={"py-36 px-[10%]"}>
      <div className={"flex justify-between items-center"}>
        <p className={"text-primary-color font-semibold text-2xl"}>Sample</p>
        <Input
          placeholder={"Search ..."}
          variant={"bordered"}
          color={"primary"}
          startContent={<SearchIcon />}
          className={"w-[384px]"}
          classNames={{
            inputWrapper: ["h-[42px] shadow-sm"],
          }}
        />
      </div>
      <div className={"my-10"}>
        <p className={"text-xl mb-5 text-primary-color font-semibold"}>
          Dataset
        </p>
        <div className={"flex flex-col gap-5"}>
          {sample_dataset.map((item, index) => (
            <Link
              href={item.url}
              key={index}
              className={
                "active:scale-105 hover:bg-primary-color hover:text-white transition-all shadow-sm flex justify-between font-semibold items-center rounded-xl px-5 py-2 text-primary-color border-1 border-gray-200"
              }
            >
              <p className={"w-1/4 text-left"}>{item.title}</p>
              <p className={"w-1/4 text-center"}>{item.fileType}</p>
              <p className={"w-1/4 text-center"}>{item.createAt}</p>
              <p className={"w-1/4 text-right"}>{item.size}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className={"mb-10"}>
        <p className={"text-xl mb-5 text-primary-color font-semibold"}>
          Analysis
        </p>
        <div className={"flex flex-col gap-5"}>
          {analysis_sample.map((item, index) => (
            <Link
              href={item.url}
              key={index}
              className={
                "active:scale-105 hover:bg-primary-color hover:text-white transition-all shadow-sm flex flex-end justify-between font-semibold items-center rounded-xl px-5 py-2 text-primary-color border-1 border-gray-200"
              }
            >
              <p className={"w-1/3"}>{item.filename}</p>
              <p className={"w-1/3 text-center"}>{item.createDate}</p>
              <p className={"w-1/3 text-right"}>{item.fileSize}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className={"mb-10"}>
        <p className={"text-xl mb-5 text-primary-color font-semibold"}>
          Dashboard
        </p>
        <div className={"flex flex-row gap-5"}>
          {mockData.dashboard.map((item, index) => (
            <Link
              href={item.url}
              key={index}
              className={
                "active:scale-105 flex flex-col gap-5 p-2 hover:bg-blue-100 hover:shadow-lg rounded-xl hover:ring-1 hover:ring-primary-color transition-all"
              }
            >
              <Image
                src={item.thumbnail}
                alt={item.name}
                className={
                  "max-w-[265px] max-h-[157px] rounded-xl object-cover"
                }
              />
              <div className={"flex flex-col"}>
                <p className={"text-description-color font-semibold"}>
                  {item.name}
                </p>
                <p className={"text-description-color font-semibold"}>
                  {item.createdAt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sample_all;
