/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { Button, Chip, Input } from "@nextui-org/react";
import { FaDatabase, FaSearch } from "react-icons/fa";
import Filter from "@/app/sample/components/Filter";
import { useDispatch, useSelector } from "react-redux";
import { setSampleFilename } from "@/store/features/sampleDataset/Dataset";
import { sample_dataset } from "@/app/board/mockData/mockData";
import { FaTableColumns } from "react-icons/fa6";
import Image from "next/image";
import { TbEyeShare } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useGetJupyterFileQuery } from "@/store/features/sampleDataset/Jupyter";
import { getTrimIntoColumnOnlyDate } from "@/utils/getTrimDateTIme";
import { formatBytes } from "@/utils/convertByte";
import Link from "next/link";
import { BsDot } from "react-icons/bs";

const Sample_all = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const sampleInfo = useSelector((state) => state.sampleDataset);
  const [filename, setFilename] = useState("");

  const { data: allSampleDataset } = useGetJupyterFileQuery({
    page: 1,
    size: 100,
    filename: filename,
  });

  useEffect(() => {
    dispatch(setSampleFilename(filename));
  }, [dispatch, filename]);

  return (
    <div className={"grid gap-5 w-full"}>
      <Input
        startContent={
          <div className={"text-gray-500"}>
            <FaSearch />
          </div>
        }
        onValueChange={setFilename}
        radius={"full"}
        className={"text-lg"}
        size={"sm"}
        variant={"flat"}
        color={"default"}
        placeholder={"searching"}
      />
      <h4
        className={"text-primary-color flex justify-start items-center gap-5"}
      >
        <FaTableColumns /> Total dataset: {allSampleDataset?.results.length}
      </h4>
      <div className={"flex flex-col gap-3 w-full"}>
        {allSampleDataset?.results.map((item, index) => (
          <div
            key={item.id}
            className={
              "hover:bg-primary-color cursor-pointer hover:text-white transition-all px-3 py-3 overflow-hidden flex items-center flex-wrap justify-between bg-white rounded-lg border-1 border-gray-200 shadow-sm"
            }
          >
            <div>
              <Link
                href={`/sample/${item.id}`}
                className={
                  "text-lg capitalize font-medium hover:underline flex gap-3 items-center flex-wrap"
                }
              >
                {item.file} <BsDot />{" "}
                <span className={"text-sm"}>
                  {getTrimIntoColumnOnlyDate(item.created_at || item.createAt)}
                </span>{" "}
              </Link>
              <p className={"text-sm hover:text-white text-secondary-color"}>
                Size: {formatBytes(item.size)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sample_all;
