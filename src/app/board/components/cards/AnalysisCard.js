"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import CardDetailDropDown from "./CardDetailDropDown";
import { useRouter } from "next/navigation";
import { generateBashURL } from "@/utils/util";
import {
  getTrimIntoColumnDateAndTime,
  getTrimIntoColumnOnlyDate,
} from "@/utils/getTrimDateTIme";

const AnalysisCard = ({ item, index }) => {
  const router = useRouter();

  return (
    <Card className="w-full shadow-sm bg-black hover:scale-105 transition-all h-[300px] col-span-12 sm:col-span-5">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">
          {item.model_name}
        </p>
        <h4 className="text-white font-medium text-2xl">{item?.title || 'Untitled'}</h4>
      </CardHeader>
      <button
        className="w-full h-full"
        onClick={() =>
          router.push(`/board/analysis/${item.file.uuid}/${item.uuid}`)
        }
      >
        <Image
          height={300}
          width={200}
          alt="Card example background"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover opacity-70"
          src={generateBashURL(item.thumbnail)}
        />
      </button>
      <CardFooter className="absolute bg-white bottom-0 border-t-1 z-10 justify-between">
        <div>
          <p className="font-medium">{item.file.file}</p>
          <p className="text-tiny">
            {getTrimIntoColumnDateAndTime(item.created_at)}
          </p>
        </div>
        <CardDetailDropDown
          thumbnailUrl={item?.thumbnail}
          filename={item?.title || 'Untitled'}
          isAnalysis={true}
          uuid={item?.uuid}
        />
      </CardFooter>
    </Card>
  );
};

export default AnalysisCard;
