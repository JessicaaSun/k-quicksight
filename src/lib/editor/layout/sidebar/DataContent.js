/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import XIcon from "@duyank/icons/regular/X";
import { useEditor } from "@lidojs/editor";
import { Spinner } from "@nextui-org/react";
import FileDetail from "@/app/board/dataset/component/FileDetail";
import { useVisualizeFileContext } from "@/context/VisualizeFileContext";
import { useGetFileDetailQuery } from "@/store/features/files/allFileByuserId";

const DataContent = ({ onClose }) => {
  const { selectedFiled } = useVisualizeFileContext();
  const {
    data: fileDetail,
    refetch: refetchDetail,
    isLoading,
  } = useGetFileDetailQuery({ uuid: "28453108-020d-4fff-89c4-9aafd4ea8358", size: 100, page: 1 });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
        overflow: "none",
        display: "flex",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          height: 48,
          borderBottom: "1px solid rgba(57,76,96,.15)",
          padding: "0 20px",
        }}
      >
        <p
          style={{
            lineHeight: "48px",
            fontWeight: 600,
            color: "#181C32",
            flexGrow: 1,
          }}
        >
          Dataset
        </p>
        <div
          style={{
            fontSize: 20,
            flexShrink: 0,
            width: 32,
            height: 32,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={onClose}
        >
          <XIcon />
        </div>
      </div>
      <div
        className="mx-5"
        style={{
          flexDirection: "column",
          marginTop: 20,
          overflow: "none",
          display: "flex",
        }}
      >
        {isLoading ? (
          <Spinner size={"md"} />
        ) : (
          <FileDetail
            dataFile={fileDetail?.results}
            uuid={"28453108-020d-4fff-89c4-9aafd4ea8358"}
            headers={fileDetail?.headers}
            isLoading={isLoading}
            size={30}
          />
        )}
      </div>
    </div>
  );
};

export default DataContent;
