"use client";

import React from "react";
import Image from "next/image";
import { getTrimIntoColumnDateAndTime } from "@/utils/getTrimDateTIme";
import { generateBashURL } from "@/utils/util";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { useRouter } from "next/navigation";
import CardDetailDropDown from "./CardDetailDropDown";

const DashboardCard = ({ item, index, routeTo }) => {
  const router = useRouter();
  const getTitle = () => {
    if (item?.title !== null) {
      return item?.title;
    } else {
      return `Untitled${index > 0 ? ` ${index}` : ""}`;
    }
  };
  const handleCardClick = () => {
    console.log("Card clicked!");
  };

  const handleImageClick = () => {
    router.push(routeTo);
  };

  return (
    <div
      className={
        "flex flex-col hover:scale-105  bg-white rounded-xl shadow-sm transition-all"
      }
      onClick={handleCardClick}
    >
      <Image
        width={265}
        height={157}
        src={generateBashURL(item?.thumbnail)}
        alt={item?.title !== null ? item?.title : "Thumbnail"}
        className={
          "max-w-[245px] max-h-[137px] cursor-pointer rounded-t-xl object-cover"
        }
        onClick={handleImageClick}
      />
      <div className="flex py-3 justify-between px-3 items-start">
        <div
          onClick={() => router.push(routeTo)}
          className={"flex cursor-pointer flex-col"}
        >
          <p className="font-medium">{getTitle()}</p>
          <p className="text-tiny">
            {getTrimIntoColumnDateAndTime(item.created_at)}
          </p>
        </div>
        <CardDetailDropDown />
      </div>
    </div>
  );
};

export default DashboardCard;
