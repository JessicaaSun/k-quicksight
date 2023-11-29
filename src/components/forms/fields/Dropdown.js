"use client";

import React, { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { setFilesType } from "@/store/features/files/fileType";

export default function DropDown({ options , width, height}) {
  const [currentValue, setCurrentValue] = useState("");
  const [value, setValue] = useState([""]);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentValue(value.currentKey);
    dispatch(setFilesType(currentValue ? currentValue : ""));
  }, [currentValue, dispatch, value]);

  return (
    <div className="flex w-full flex-col gap-2">
      <Select
        aria-label={"select"}
        variant="bordered"
        selectedKeys={value}
        size={30}
        height={30}
        // className="border-1 border-blue"
        onSelectionChange={setValue}
      >
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
