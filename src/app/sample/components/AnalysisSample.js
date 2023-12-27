"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSampleFilename } from "@/store/features/sampleDataset/Dataset";
import FileType from "@/app/board/dataset/component/DropDown";
import { MdOutlineAutoGraph } from "react-icons/md";
import TableData from "@/lib/table/Table";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import SearchFieldKQS from "@/components/buttons/SearchField";
import { useGetAllSampleDataQuery } from "@/store/features/sampleDataset/datasetSampleApiSlice";
import Loading from "@/app/loading";

const AnalysisSample = () => {
    const dispatch = useDispatch();
    const { data: user, isLoading } = useGetUserQuery();
    const [isSample, setSample] = useState(false);
    const filType = useSelector((state) => state.fileType.fileType);
    const [filename, setFilename] = useState("");
    const { data: allFile, isLoading: isFileLoading } =
      useGetAllSampleDataQuery();
  
    useEffect(() => {
      dispatch(setSampleFilename(filename));
    }, [dispatch, filename]);
  
    if (isFileLoading) {
      return <Loading />;
    }
    return (
      <div className={"grid gap-5 w-full"}>
        <SearchFieldKQS
          onChange={(e) => setFilename(e.target.value)}
          placeholder={"Search dataset..."}
          value={filename}
          width="100%"
          height="45px"
        />
  
        <TableData isSample={true} file={allFile?.results} />
      </div>
    );
  };

export default AnalysisSample
