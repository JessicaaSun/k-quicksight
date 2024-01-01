/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiNotebook } from "react-icons/gi";
import { setSampleFilename } from "@/store/features/sample/Dataset";
import { useRouter } from "next/navigation";
import { useGetJupyterFileQuery } from "@/store/features/sample/Jupyter";
import { getTrimIntoColumnOnlyDate } from "@/utils/getTrimDateTIme";
import { formatBytes } from "@/utils/convertByte";
import Link from "next/link";
import { BsDot } from "react-icons/bs";
import SearchFieldKQS from "@/components/buttons/SearchField";
import { setFileName } from "@/store/features/files/fileType";

const JupyterFiles = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const sampleInfo = useSelector((state) => state.sampleDataset);
  const [filename, setFilename] = useState("");

  const { data: allJupyterFiles } = useGetJupyterFileQuery({
    page: 1,
    size: 100,
    filename: filename,
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
      <h4
        className={
          "text-primary-color dark:text-third-color flex justify-start items-center gap-5"
        }
      >
        <GiNotebook /> Total Jupyter Notebook: {allJupyterFiles?.results.length}
      </h4>
      <div className={"flex flex-col gap-3 w-full"}>
        {allJupyterFiles?.results.map((item, index) => (
          <Link
            href={`/sample/${item.id}`}
            key={item.id}
            className={
              "hover:bg-gray-100 cursor-pointer hover:text-primary-color px-3 py-3 overflow-hidden flex items-center flex-wrap justify-between bg-white rounded-lg border-1 border-gray-200 shadow-sm"
            }
          >
            <div>
              <div
                className={
                  "text-lg capitalize font-medium  flex gap-3 items-center flex-wrap"
                }
              >
                {item.file} <BsDot />{" "}
                <span className={"text-sm"}>
                  {getTrimIntoColumnOnlyDate(item.created_at || item.createAt)}
                </span>{" "}
              </div>
              <p className={"text-sm "}>
                Size: {formatBytes(item.size)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JupyterFiles;
