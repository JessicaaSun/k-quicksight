"use client";
import React, { useEffect, useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "@/store/features/auth/authSlice";
import { useFileImportMutation } from "@/store/features/clean/importFile";
import { useRouter } from "next/navigation";
import { useGetAllFilesQuery } from "@/store/features/files/allFileByuserId";

import FullStorage from "@/app/board/dataset/component/AlertFullStorage";

export default function NewDataset({ isFull }) {
  const { data: user } = useGetUserQuery();
  const dispatch = useDispatch();
  const [importFile] = useFileImportMutation();
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
    const response = await importFile({
      file: formData,
      userId: user?.data.id,
    });

    refetchAllFiles();
  };

  return (
    <>
      {!isFull ? (
        <>
          <input
            id="importFile"
            style={{ display: "none" }}
            type="file"
            accept=".csv, application/json, .xlsx, .txt"
            onChange={handleImportFile}
          />
          <label
            className={
              "bg-primary-color cursor-pointer h-[40px] rounded-xl px-[16px] flex items-center justify-center text-sm text-white font-medium border-2 border-white shadow-lg"
            }
            htmlFor="importFile"
          >
            New Dataset
          </label>
        </>
      ) : (
        <FullStorage />
      )}
    </>
  );
}
