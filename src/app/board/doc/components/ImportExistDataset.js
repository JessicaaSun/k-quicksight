import React, { useState } from "react";
import { useGetAllFilesQuery } from "@/store/features/files/allFileByuserId";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import TableExistingData from "@/app/board/doc/components/TableExistingData";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { SearchIcon } from "@/app/board/doc/searchIcons";
import SearchFieldKQS from "@/components/buttons/SearchField";
import { useFileImportMutation } from "@/store/features/clean/importFile";

const ImportExistDataset = () => {
  const [filename, setFilename] = useState("");
  const { data: user } = useGetUserQuery();
  const [fileType, setFileType] = useState("");
  const [importFile] = useFileImportMutation();
  const { data: allExistingFile, refetch: refetchAllFiles } =
    useGetAllFilesQuery({
      filename: filename,
      id: user?.data.id,
      type: fileType,
    });

  const handleSelectionChange = (e) => {
    setFileType(e.target.value);
  };

  const handleImportFile = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const response = await importFile({
      file: formData,
      userId: user?.data.id,
    });

    refetchAllFiles();
  };

  return (
    <div className={"flex flex-col gap-3"}>
      <div className=" flex w-full my-3 pb-0 max-sm:gap-4 sm:gap-4 justify-between  flex-wrap items-center">
        <div className="flex gap-4 h-[48px] md:w-1/2">
          <SearchFieldKQS
            onChange={(e) => setFilename(e.target.value)}
            placeholder={"Search file..."}
            value={filename}
            height="48px"
          />
          <Select
            aria-label={"Select file types"}
            size={"sm"}
            className={"w-[40%] dark:text-white"}
            placeholder={"Select file type"}
            onChange={handleSelectionChange}
            variant={"bordered"}
          >
            {" "}
            <SelectItem className="dark:text-white" key={""} value={""}>
              All files
            </SelectItem>
            <SelectItem className="dark:text-white" key={"csv"} value={"csv"}>
              CSV
            </SelectItem>
            <SelectItem className="dark:text-white" key={"json"} value={"json"}>
              JSON
            </SelectItem>
            <SelectItem className="dark:text-white" key={"xlsx"} value={"xlsx"}>
              XLSX
            </SelectItem>
            <SelectItem className="dark:text-white" key={"txt"} value={"txt"}>
              TXT
            </SelectItem>
          </Select>
        </div>
        <div className="">
          <input
            id="importFile"
            style={{ display: "none" }}
            type="file"
            accept=".csv, application/json, .xlsx, .txt"
            onChange={handleImportFile}
          />
          <label
            className={
              "bg-primary-color cursor-pointer h-[48px] rounded-xl px-[16px] flex items-center justify-center text-sm text-white font-medium border-2 border-white shadow-lg"
            }
            htmlFor="importFile"
          >
            New Dataset
          </label>
        </div>
      </div>
      <TableExistingData data={allExistingFile} />
    </div>
  );
};

export default ImportExistDataset;
