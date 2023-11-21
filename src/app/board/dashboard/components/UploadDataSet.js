"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import UploadData from "@assets/images/analysis/add-task.png";
import { Button, useDisclosure } from "@nextui-org/react";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useDispatch } from "react-redux";
import { useFileImportMutation } from "@/store/features/clean/importFile";
import { useRouter } from "next/navigation";
import { useGetAllFilesQuery } from "@/store/features/files/allFileByuserId";
import { setCurrentUser } from "@/store/features/auth/authSlice";

const UploadDataSetDashboard = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: user } = useGetUserQuery();
  const dispatch = useDispatch();
  const [fileInfo, setFileInfo] = useState({});
  const [importFile] = useFileImportMutation();
  const router = useRouter();
  const {
    data: allFiles,
    refetch: refetchAllFiles,
    isLoading: importLoading,
  } = useGetAllFilesQuery({ id: user?.data.id, filename: "", type: "" });

  useEffect(() => {
    dispatch(setCurrentUser(user));
  }, [user, dispatch]);

  const handleImportFile = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    router.push("/board/dashboard/editor");
    const response = await importFile({
      file: formData,
      userId: user?.data.id,
    });
    onOpenChange(false);
    refetchAllFiles();
  };
  return (
    <div>
      <Button className={"flex flex-col w-full h-full"}>
        <input
          type="file"
          accept=".csv, .xlsx, .txt, .json"
          onChange={handleImportFile}
          style={{ display: "none" }}
          id="uploadInput"
        />
        <label htmlFor="uploadInput">
          <Image src={UploadData} alt={""} className={"w-40 "} />
          <p className={"font-bold"}>Upload new dataset</p>
        </label>
      </Button>
    </div>
  );
};

export default UploadDataSetDashboard;
