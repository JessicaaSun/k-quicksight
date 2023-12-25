/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSampleFilename } from "@/store/features/sampleDataset/Dataset";
import FileType from "@/app/board/dataset/component/DropDown";
import { MdOutlineAutoGraph } from "react-icons/md";
import TableData from "@/lib/table/Table";
import { useGetAllFilesQuery } from "@/store/features/files/allFileByuserId";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import SearchFieldKQS from "@/components/buttons/SearchField";

const DatasetSample = () => {
  const dispatch = useDispatch();
  const { data: user, isLoading } = useGetUserQuery();
  const [isSample, setSample] = useState(false);
  const filType = useSelector((state) => state.fileType.fileType);
  const [filename, setFilename] = useState("");
  //TODO change to sample dataset once api is ready
  const { data: allFile, isLoading: isFileLoading } = useGetAllFilesQuery({
    id: user?.data.id,
    filename: filename,
    type: filType,
  });

  useEffect(() => {
    dispatch(setSampleFilename(filename));
  }, [dispatch, filename]);

  return (
    <div className={"grid gap-5 w-full"}>
      <SearchFieldKQS
        onChange={(e) => setFilename(e.target.value)}
        placeholder={"Search dataset..."}
        value={filename}
        width="100%"
        height="45px"
      />

      <div className={"flex flex-col flex-wrap gap-5"}>
        <FileType />
      </div>
      <div
        className={
          "flex dark:text-third-color gap-3 justify-start items-center max-sm:mt-7 sm:mt-7 md:mt-0 text-xl font-semibold text-primary-color"
        }
      >
        <MdOutlineAutoGraph />
        Trending dataset
      </div>
      <TableData file={allFile} />
    </div>
  );
};

export default DatasetSample;
