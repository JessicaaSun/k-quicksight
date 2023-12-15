"use client";

import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { Select, Space } from "antd";
import TableData from "@/lib/table/Table";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useGetAllFilesQuery } from "@/store/features/files/allFileByuserId";
import ListAllFiles from "./ListAllFiles";

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
      <div className="flex justify-normal items-center gap-3">
        <Input
          size="sm"
          startContent={<IoMdSearch />}
          radius="full"
          variant="bordered"
          color="primary"
          placeholder="Dataset Name"
          value={datasetname}
          onValueChange={setDatasets}
        />
      </div>
      <ListAllFiles file={allFiles} isFileLoading={isFileLoading} />
    </>
  );
}
