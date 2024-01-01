"use client";

import React, { useMemo, useState } from "react";
import { Spinner } from "@nextui-org/react";
import { getTrimIntoColumnOnlyDate } from "@/utils/getTrimDateTIme";
import { formatBytes } from "@/utils/convertByte";
import { useRouter } from "next/navigation";
import DeleteButton from "@/app/board/dataset/component/DeleteButton";
import Dropdown_table from "@/lib/table/componentTable/dropdown";
import { FaEye } from "react-icons/fa6";
import { BsDot } from "react-icons/bs";
import Link from "next/link";

export default function TableData({ file, isSample, isFileLoading }) {
  const router = useRouter();
  const handleView = (uuid) => {
    router.push(`/board/dataset/${uuid}`);
  };

  return (
    <div>
      {isFileLoading ? (
        <div className={"flex justify-center items-center"}>
          <Spinner color={"primary"} size={"lg"} label="Loading dataset" />
        </div>
      ) : (
        <div className={"flex flex-col gap-3"}>
          {file?.map((item, index) => (
            <div
              key={item.id}
              className={
                "hover:bg-gray-100 cursor-pointer hover:text-primary-color transition-all px-3 py-3 flex items-center justify-between bg-white rounded-lg border-1 border-gray-200 shadow-sm"
              }
            >
              <Link href={`/board/dataset/${item.uuid}`}>
                <div
                  className={
                    "text-lg   font-medium flex gap-3 items-center flex-wrap"
                  }
                >
                  {item.file} <BsDot className="hover:text-white" />{" "}
                  <span className={"text-sm"}>
                    {getTrimIntoColumnOnlyDate(
                      item.created_at || item.createAt
                    )}
                  </span>{" "}
                </div>
                <p className={"text-sm"}>
                  ({item.type}){" "}
                  <span className={"font-semibold text-third-color"}>
                    {isSample ? (
                      <span>Sample</span>
                    ) : !item.is_original ? (
                      <span>Cleaned</span>
                    ) : (
                      <span>Original</span>
                    )}
                  </span>{" "}
                  with {formatBytes(item.size)}
                </p>
              </Link>
              {isSample ? (
                ""
              ) : (
                <Dropdown_table
                  uuid={item.uuid}
                  filename={item.file || item.filename}
                  type={item.type}
                  size={item.size}
                  createAt={item.created_at || item.createAt}
                  fileId={item.id}
                  file={item.filename}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
