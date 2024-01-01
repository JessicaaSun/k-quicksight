"use client";

import React, { useEffect, useState } from "react";
import { Pagination, Select, SelectItem } from "@nextui-org/react";
import ModalImport from "@/app/board/dataset/component/modal";
import NewDataset from "@/app/board/dataset/component/newDataset";
import { useGetAllFilesQuery } from "@/store/features/files/allFileByuserId";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import TableData from "@/lib/table/Table";
import { useDispatch, useSelector } from "react-redux";
import SearchDataset from "@/app/board/dataset/component/SearchDataset";
import { formatBytes } from "@/utils/convertByte";
import FileType from "@/app/board/dataset/component/DropDown";
import { MdOutlineAutoGraph } from "react-icons/md";
import FilterSize from "../components/fields/FilterSize";
export const headers = [
  {
    header: "Title",
  },
  {
    header: "Clean",
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
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const filType = useSelector((state) => state.fileType.fileType);
  const filename = useSelector((state) => state.fileType.filename);
  const { data: allFile, isLoading: isFileLoading } = useGetAllFilesQuery({
    id: user?.data.id,
    page: page,
    size: size,
    filename: filename,
    type: filType,
  });
  const dispatch = useDispatch();
  const state = useSelector((state) => state.allFiles.allFiles);
  const totalFree = user?.data.storage_data;
  const [isFull, setStorage] = useState(false);

  useEffect(() => {
    const checkStorage = () => {
      if (totalFree / 100000 < 1048576) {
        setStorage(false);
      } else {
        setStorage(true);
      }
    };
    checkStorage();
  }, [state, dispatch, totalFree]);

  // Make sure to replace 'setTotalSize' and 'setFiles' with your actual action creators.
  const handlePageChange = (page) => {
    setPage(page);
  };
  const handleSelectionChange = (e) => {
    console.log("Size changed:", e.target.value);
    setSize(e.target.value);
  };
  

  return (
    <div className={"py-10 px-7"}>
      <div className={"flex flex-wrap justify-between items-center"}>
        <p
          className={
            "text-primary-color font-semibold text-3xl dark:text-third-color"
          }
        >
          Dataset
        </p>
        <div
          className={
            "flex justify-center items-center gap-5 lg:mt-0 md:mt-0 mt-5"
          }
        >
          <ModalImport />
          <NewDataset isFull={isFull} />
        </div>
      </div>
      <div className={"mt-8 flex flex-col gap-8"}>
        <div className={"flex justify-between items-center gap-5"}>
          <SearchDataset />
          <p
            className={
              "text-primary-color dark:text-third-color font-semibold text-lg w-full"
            }
          >
            Used{" "}
            <span className={"text-secondary-color dark:text-white"}>
              {formatBytes(totalFree)}
            </span>{" "}
            / 1 GB
          </p>
        </div>

        <div className={"flex flex-col flex-wrap gap-3"}>
          <FileType />
        </div>
        <div
          className={
            "flex justify-between items-center max-sm:mt-2 sm:mt-2 md:mt-0"
          }
        >
          <div className="flex gap-3 dark:text-third-color text-xl font-semibold text-primary-color">
            <MdOutlineAutoGraph />
            <p>Your dataset</p>
          </div>
          <div className="flex gap-3">
            <Select
              aria-label={"Size Filter"}
              size={"small"}
              color={"primary"}
              shadow={false}
              defaultSelectedKeys={["10"]}
              className={
                "md:w-[100px] max-sm:w-[30%] sm:w-[30%] dark:text-white shadow-none"
              }
              onChange={handleSelectionChange}
              variant={"bordered"}
            >
              <SelectItem className="dark:text-white" key={5} value={5}>
                5
              </SelectItem>
              <SelectItem className="dark:text-white" key={10} value={10}>
                10
              </SelectItem>
              <SelectItem className="dark:text-white" key={20} value={20}>
                20
              </SelectItem>
              <SelectItem className="dark:text-white" key={50} value={50}>
                50
              </SelectItem>
              <SelectItem className="dark:text-white" key={100} value={100}>
                100
              </SelectItem>
              <SelectItem
                className="dark:text-white"
                key={"all"}
                value={1000000}
              >
                All
              </SelectItem>
            </Select>
            <Pagination
              isCompact
              showControls
              className="flex justify-end"
              total={allFile?.pages?.length}
              initialPage={1}
              onChange={handlePageChange}
            />
          </div>
        </div>
        <TableData
          file={allFile?.results}
          isFileLoading={isFileLoading}
          headers={headers}
          isSample={false}
        />
      </div>
    </div>
  );
};

export default Dataset;
