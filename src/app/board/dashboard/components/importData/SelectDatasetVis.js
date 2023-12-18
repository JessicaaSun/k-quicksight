"use client";

import React, { useEffect, useState } from "react";
import DropDown from "@/app/board/dataset/component/DropDown";
import { sample_dataset } from "@/app/board/mockData/mockData";
import { useGetAllFilesQuery } from "@/store/features/files/allFileByuserId";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setFiles, setTotalSize } from "@/store/features/files/fileSlice";
import SearchDataset from "@/app/board/dataset/component/SearchDataset";

import { useVisualizeFileContext } from "@/context/VisualizeFileContext";
import TableDataSet from "../DatasetTable";
export const headers = [
  {
    header: "Title",
  },
  {
    header: "original",
  },
  {
    header: "File Type",
  },
  {
    header: "Create At",
  },
  {
    header: "Size",
  },
  {
    header: "Actions",
  },
];
const SelectDataset = () => {
  const { data: user, isLoading } = useGetUserQuery();
  const [isSample, setSample] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { setFile } = useVisualizeFileContext();

  const handleDatasetSample = () => {
    setSample((prev) => !prev);
  };
  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setFile(file);
  };
  const filType = useSelector((state) => state.fileType.fileType);
  const { data: allFile, isLoading: isFileLoading } = useGetAllFilesQuery({
    id: user?.data.id,
    filename: "",
    type: filType,
  });
  const dispatch = useDispatch();
  const state = useSelector((state) => state.allFiles.allFiles);
  const totalFree = useSelector((state) => state.allFiles.total);
  const [isFull, setStorage] = useState(false);

  useEffect(() => {
    dispatch(setFiles(allFile));
    if (allFile) {
      const totalSize = allFile.reduce(
        (accumulator, currentValue) => accumulator + currentValue.size,
        0
      );
      dispatch(setTotalSize(1000000000 - totalSize));
    }
    if (totalFree > 1000000000) {
      setStorage(true);
    }
  }, [allFile, dispatch, totalFree]);
 
  return (
    <div className={"p-5"}>
      <div className={" flex flex-col gap-8"}>
        <div className={"flex justify-between items-center"}>
          <p className={"text-2xl text-text-color font-semibold"}>
            Pick a dataset to use in your dashboard visualization
          </p>
        </div>

        <div className={"flex flex-col gap-3"}>
          <SearchDataset />
          <DropDown />
        </div>
        <div className={"w-full max-h-[550px] overflow-y-scroll"}>
          <TableDataSet
            isSample={isSample}
            file={state}
            isFileLoading={isFileLoading}
            sample_dataset={sample_dataset}
            headers={headers}
            onFileSelect={handleFileSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectDataset;