"use client";

import React, { useEffect, useState } from "react";
import ModalImport from "@/app/board/dataset/component/modal";
import NewDataset from "@/app/board/dataset/component/newDataset";
import { sample_dataset } from "@/app/board/mockData/mockData";
import { useGetAllFilesQuery } from "@/store/features/files/allFileByuserId";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import TableData from "@/lib/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { setFiles, setTotalSize } from "@/store/features/files/fileSlice";
import SearchDataset from "@/app/board/dataset/component/SearchDataset";
import { formatBytes } from "@/utils/convertByte";
import FileType from "@/app/board/dataset/component/DropDown";
import {MdOutlineAutoGraph} from "react-icons/md";
export const headers = [
  {
    header: "Title",
  },
  {
    header: 'Clean'
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
const Dataset = () => {
  const { data: user, isLoading } = useGetUserQuery();
  const [isSample, setSample] = useState(false);

  // const handleDatasetSample = () => {
  //   setSample((event) => !event);
  // };
  const filType = useSelector((state) => state.fileType.fileType);
  const { data: allFile, refetch: filesRefetch, isLoading: isFileLoading } = useGetAllFilesQuery({
    id: user?.data.id,
    filename: "",
    type: filType,
  });
  const dispatch = useDispatch();
  const state = useSelector((state) => state.allFiles.allFiles);
  const totalFree = useSelector((state) => state.allFiles.total);
  const [isFull, setStorage] = useState(false);

  useEffect(() => {
    filesRefetch();
    dispatch(setFiles(allFile));
    if (allFile) {
      const totalSize = allFile.reduce(
        (accumulator, currentValue) => accumulator + currentValue.size, 0);
      dispatch(setTotalSize(1000000000 - totalSize));
    }
    if (totalFree > 1000000000) {
      setStorage(true);
    }
  }, [allFile, dispatch, filesRefetch, totalFree]);

  return (
    <div className={"py-10 px-5"}>
      <div className={"flex justify-between items-center"}>
        <h1 className={"text-primary-color font-semibold"}>Dataset</h1>
        <div className={"flex justify-center items-center gap-5"}>
          <ModalImport />
          <NewDataset isFull={isFull} />
        </div>
      </div>
      <div className={"mt-14 flex flex-col gap-8"}>
        <div className={"flex justify-between items-center gap-5"}>
          <SearchDataset />
          <p className={"text-primary-color font-semibold text-lg w-full"}>
            Free{" "}
            <span className={"text-secondary-color"}>
              {formatBytes(totalFree)}
            </span>{" "}
            / 1 GB
          </p>
        </div>

        <div className={"flex flex-col flex-wrap gap-5"}>
          <FileType />
        </div>
        <div className={'flex gap-3 justify-start items-center text-xl font-semibold text-primary-color'}>
          <MdOutlineAutoGraph />
          Trending dataset
        </div>
        <TableData
            isSample={isSample}
            file={state}
            isFileLoading={isFileLoading}
            sample_dataset={sample_dataset}
            headers={headers}
        />
      </div>
    </div>
  );
};

export default Dataset;
