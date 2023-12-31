"use client";

import React from "react";
import Image from "next/image";
import { getTrimIntoColumnDateAndTime } from "@/utils/getTrimDateTIme";
import { generateBashURL } from "@/utils/util";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CardDetailDropDown from "./CardDetailDropDown";

const DashboardList = ({ item, index, isAnalysis, routeTo }) => {
  const router = useRouter();
  const getTitle = () => {
    if (item?.title !== null) {
      return item?.title;
    } else {
      return `Untitled${index > 0 ? ` ${index}` : ""}`;
    }
  };
  const handleImageClick = () => {
    router.push(routeTo);
  };

  return (
    <>
      <div
        className={
          "hover:bg-gray-100 cursor-pointer w-full transition-all px-3 py-3 flex items-center justify-between bg-white rounded-lg border-1 border-gray-200 shadow-sm"
        }
      >
        <div>
          <div className="flex w-full justify-between">
          <Link
            href={routeTo}
            className={
              "text-lg font-medium flex gap-3 items-center flex-wrap"
            }
          >
            {item?.title}
          
            <span className={"text-sm"}>
              {getTrimIntoColumnDateAndTime(item.created_at)}
            </span>{" "}
          </Link>
          <CardDetailDropDown
              datasetId={item?.file?.id}
              thumbnailUrl={item?.thumbnail}
              className="flex justify-end"
              filename={getTitle()}
              uuid={item?.uuid}
              isAnalysis={isAnalysis}
            />
             </div>
          <p className={"text-sm"}>Dataset Used: {item?.file?.file}</p>
         
        </div>
      </div>
    </>
  );
};

export default DashboardList;
