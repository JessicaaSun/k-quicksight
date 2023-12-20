"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { setFileName } from "@/store/features/files/fileType";
import { useGetAllFilesQuery } from "@/store/features/files/allFileByuserId";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { setFiles } from "@/store/features/files/fileSlice";
import { SearchIcon } from "@/app/board/doc/searchIcons";

const SearchDataset = () => {
  const [searchValue, setValueSearch] = useState("");
  const dispatch = useDispatch();
  const files = useSelector((state) => state.fileType);
  const { data: user } = useGetUserQuery();
  const { data: setAllFiles, isLoading: isFileLoading } = useGetAllFilesQuery({
    id: user?.data.id,
    filename: files?.filename,
    type: files.fileType,
  });

  useEffect(() => {
    dispatch(setFileName(searchValue));
    dispatch(setFiles(setAllFiles));
  }, [searchValue, dispatch, setAllFiles]);

  return (
    <Input
      color={"primary"}
      startContent={<SearchIcon />}
      classNames={{
        inputWrapper: [
          "h-[50px] w-full bg-white shadow-sm border-1 border-gray-400 rounded-full",
        ],
      }}
      onValueChange={setValueSearch}
      value={searchValue}
      placeholder={"Search"}
    />
  );
};

export default SearchDataset;
