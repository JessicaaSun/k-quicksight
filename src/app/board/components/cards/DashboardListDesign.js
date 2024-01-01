"use client";

import React from "react";
import Image from "next/image";
import { getTrimIntoColumnDateAndTime } from "@/utils/getTrimDateTIme";
import { generateBashURL } from "@/utils/util";
import Link from "next/link";
import CardDetailDropDown from "./CardDetailDropDown";
import { BsDot } from "react-icons/bs";
import { TbLineDashed } from "react-icons/tb";

const DashboardList = ({ item, index, isAnalysis, routeTo }) => {
  const getTitle = () => {
    if (item?.title !== null) {
      return item?.title;
    } else {
      return `Untitled${index > 0 ? ` ${index}` : ""}`;
    }
  };

  return (
    <>
      <div
        className={
          "hover:bg-gray-100 cursor-pointer w-full transition-all px-3 py-3 items-center bg-white rounded-lg border-1 border-gray-200 shadow-sm"
        }
      >
        <div className="w-full flex justify-between items-center">
          <Link href={routeTo} className="flex">
            <Image
              src={generateBashURL(item?.thumbnail)}
              alt={item?.title !== null ? item?.title : "Thumbnail"}
              width={60}
              height={60}
              className=" rounded-md border-1 border-gray-200 me-4"
            />
            <div className="flex w-full flex-col  justify-between">
              <div
                className={
                  "text-lg font-medium flex gap-3 items-center flex-wrap"
                }
              >
                {getTitle()}
                <BsDot color="#FFA500" size={22} />{" "}
                {isAnalysis ? (
                  <p className={"text-sm capitalize"}>
                    {" "}
                    {item?.model_name.replace(/_/g, " ")}
                  </p>
                ) : (
                  <p className={"text-sm"}> Dataset: {item?.file?.file}</p>
                )}
              </div>
              <span className={"text-sm gap-2 flex"}>
                {getTrimIntoColumnDateAndTime(item.created_at)}
              
                {isAnalysis && (
                  <div className="flex gap-2"> 
                    <TbLineDashed color="#800080"  size={22} />
                  <p className={"text-sm"}>Dataset: {item?.file?.file}</p>
                  </div>
                )}
              </span>
            </div>
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
      </div>
    </>
  );
};

export default DashboardList;
