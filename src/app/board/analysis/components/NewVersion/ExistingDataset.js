"use client";

import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import TableData from "@/lib/table/Table";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useGetAllFilesQuery } from "@/store/features/files/allFileByuserId";
import ListAllFiles from "./ListAllFiles";
import { SearchIcon } from "@/app/board/doc/searchIcons";
import SearchFieldKQS from "@/components/buttons/SearchField";

export default function ExistingDataset() {
  const [datasetname, setDatasets] = useState("");
  const [fileType, setFileTypes] = useState("");
  const { data: user } = useGetUserQuery();
  const { data: allFiles, isLoading: isFileLoading } = useGetAllFilesQuery({
    id: user?.data.id,
    filename: datasetname,
    type: fileType,
  });

  const handleChangeFileType = (value) => {
    setFileTypes(value);
  };

  return (
    <>
      <div className="justify-normal w-full items-center gap-3">
        <SearchFieldKQS
          onChange={(e) => setDatasets(e.target.value)}
          placeholder={"Search dataset..."}
          value={datasetname}
          width="100%"
          height="45px"
        />
      </div>
      <ListAllFiles file={allFiles} isFileLoading={isFileLoading} />
    </>
  );
}
