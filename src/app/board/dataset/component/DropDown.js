"use client";

import React, { useEffect, useState } from "react";
import { dataType } from "@/app/board/mockData/mockData";
import { useDispatch, useSelector } from "react-redux";
import { setFilesType } from "@/store/features/files/fileType";
import { Button } from "@nextui-org/react";

export default function FileType() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const fileType = useSelector((state) => state.fileType);

  const handleSelectType = (e) => {
    setValue(e);
    dispatch(setFilesType(e));
  };

  return (
    <div className="flex w-full h-[56px] flex-row gap-2 flex-wrap">
      {dataType.map((item, index) => (
        <Button
          className={`rounded-full ${fileType?.fileType === item.value ? 'bg-primary text-white' : ''}`}
          variant={"ghost"}
          color={"primary"}
          key={item.id}
          onClick={() => handleSelectType(item.value)}
        >
          {item.icon}
          {item.label}
        </Button>
      ))}
    </div>
  );
}
