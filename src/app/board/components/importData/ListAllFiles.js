"use client";
import { useVisualizeFileContext } from "@/context/VisualizeFileContext";
import { formatBytes } from "@/utils/convertByte";
import { Spinner } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";

export default function ListAllFiles({ file, isAnalysis, isFileLoading }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const { setFile } = useVisualizeFileContext();

  const handleRowSelect = (selectedFile, index) => {
    setFile(selectedFile);
    console.log("row select");
    setSelectedRow(index);
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
              onClick={() => handleRowSelect(item, index)}
              className={`hover:bg-primary-color ${
                selectedRow === index
                  ? "bg-primary-color text-white"
                  : "bg-white text-text-color"
              } cursor-pointer hover:text-white transition-all px-3 py-3 flex items-center justify-between  rounded-lg border-1 border-gray-200 shadow-sm`}
            >
              <div>
                <p>{item.file}</p>
                <p className={"text-sm"}>
                  ({item.type}){" "}
                  <span className={"font-medium"}>
                    {!item.is_original ? (
                      <span>Cleaned</span>
                    ) : (
                      <span>Original</span>
                    )}
                  </span>{" "}
                  with {formatBytes(item.size)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
