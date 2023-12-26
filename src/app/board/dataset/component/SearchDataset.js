"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { setFileName } from "@/store/features/files/fileType";
import { useGetAllFilesQuery } from "@/store/features/files/allFileByuserId";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { setFiles } from "@/store/features/files/fileSlice";
import { SearchIcon } from "@/app/board/doc/searchIcons";
import SearchFieldKQS from "@/components/buttons/SearchField";

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
    <SearchFieldKQS
      onChange={(e) => setValueSearch(e.target.value)}
      placeholder={"Search"}
      value={searchValue}
      height="45px"
    />
  );
};

export default SearchDataset;
