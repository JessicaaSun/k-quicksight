"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import fileNotFound from "@assets/images/fileNotFound.png";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { IoChevronBackCircle } from "react-icons/io5";
import PreviewTable from "@/lib/table/fileScrapTable/PreviewTable";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { useConfirm_filesMutation } from "@/store/features/scrappingData/scrappingUrl";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { toast } from "react-toastify";
import EyeBold from "@duyank/icons/bold/EyeBold";
import { FaEye } from "react-icons/fa6";
import {LuImport} from "react-icons/lu";

const FileScrap = () => {
  const { data: user } = useGetUserQuery();
  const filenames = useSelector((state) => state.allFiles.fileScrap);
  const router = useRouter();
  const [selected, setSelected] = useState([]);
  const [saveFile] = useConfirm_filesMutation();

  let content = null;
  const handlePreview = (item) => {
    content = <p>{item}</p>;
  };

  const handleSave = async () => {
    const data = {
      confirmed_filename: selected,
      rejected_filename: filenames.filter((e) => !selected.includes(e)),
    };

    try {
      const response = await saveFile({ data: data, userId: user?.data.id });

      if (response?.data.code === 200) {
        toast.success("Successful import");
        setTimeout(() => {
          router.push("/board/dataset");
        }, 1500);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (filenames === undefined) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-10">
        <p className="text-center my-10 text-primary-color font-semibold text-lg">
          Undefined tables in this link
        </p>
        <Image src={fileNotFound} alt="file not found" />
        <Button
          onClick={() => router.back()}
          color="primary"
          variant="solid"
          className="mt-10"
        >
          <IoChevronBackCircle /> Back
        </Button>
      </div>
    );
  } else {
    return (
      <div className={'p-10'}>
        <div className={'flex justify-between items-center'}>
          <p className="text-lg font-semibold text-primary-color dark:text-third-color">
            Select files to confirm
          </p>
          <Button
              onClick={handleSave}
              color="primary"
              variant="solid"
          >
            <LuImport /> Import file(s)
          </Button>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <CheckboxGroup
            label="Selecting files ..."
            value={selected}
            onValueChange={setSelected}
          >
            {filenames?.map((item) => (
              <div
                className={"flex flex-col gap-2 w-full overflow-y-scroll"}
                key={item}
              >
                <Checkbox value={item} key={item}>
                  {item}
                </Checkbox>
                <PreviewTable detail={item} />
              </div>
            ))}
          </CheckboxGroup>

        </div>
      </div>
    );
  }
};

export default FileScrap;
