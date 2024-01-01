"use client";
import { useVisualizeFileContext } from "@/context/VisualizeFileContext";
import { formatBytes } from "@/utils/convertByte";
import { Spinner } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";

export default function ListAllFiles({
  file,
  isAnalysis,
  isFileLoading,
  onRowSelect,
}) {
  const [selectedRow, setSelectedRow] = useState(null);
  const { setFile } = useVisualizeFileContext();

  const handleRowSelect = (selectedFile, index) => {
    setFile(selectedFile);
    setSelectedRow(index);
    onRowSelect(selectedFile?.uuid);
  };

  return (
    <div>
      {isFileLoading ? (
        <div className={"flex justify-center items-center"}>
          <Spinner color={"primary"} size={"lg"} label="Loading dataset" />
        </div>
      ) : (
        <div className={"flex flex-col gap-3"}>
          {file?.results.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleRowSelect(item, index)}
              className={`hover:bg-gray-200 hover:text-primary-color ${
                selectedRow === index
                  ? "bg-primary-color hover:bg-primary-color hover:text-white text-white"
                  : "bg-white text-text-color"
              } cursor-pointer transition-all px-3 py-3 flex items-center justify-between  rounded-lg border-1 border-gray-200 shadow-sm`}
            >
              <div>
                <p className="font-medium">{item.file}</p>
                <p className={"text-sm"}>
                  ({item.type}){" "}
                  <span className={"font-medium text-third-color"}>
                    {!item.is_original ? (
                      <span>Cleaned</span>
                    ) : (
                      <span>Original</span>
                    )}
                  </span>{" "}
                  <span>with {formatBytes(item.size)}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
