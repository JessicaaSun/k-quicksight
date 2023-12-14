/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import XIcon from "@duyank/icons/regular/X";
import { useEditor } from "@lidojs/editor";
import { Spinner } from "@nextui-org/react";
import FileDetail from "@/app/board/dataset/component/FileDetail";
import { useVisualizeFileContext } from "@/context/VisualizeFileContext";
import { useGetFileDetailQuery } from "@/store/features/files/allFileByuserId";

const DataContent = ({ onClose, dataTitle, datasetUuid }) => {
  const {
    data: fileDetail,
    refetch: refetchDetail,
    isLoading,
  } = useGetFileDetailQuery({
    uuid: datasetUuid,
    size: 100,
    page: 1,
  });

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
          <span className="text-third-color">Dataset: </span>{dataTitle}
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
          <FileDetail showHeader={false} uuid={datasetUuid} />
        )}
      </div>
    </div>
  );
};

export default DataContent;
