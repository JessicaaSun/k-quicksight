"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import UploadData from "@assets/images/analysis/add-task.png";
import { Button, useDisclosure } from "@nextui-org/react";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useDispatch } from "react-redux";
import { useFileImportMutation } from "@/store/features/clean/importFile";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "@/store/features/auth/authSlice";
import { useCreateDashboardMutation } from "@/store/features/dashboard/dashboardApiSlice";

const UploadDataSetDashboard = ({ isAnalysis }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: user } = useGetUserQuery();
  const dispatch = useDispatch();
  const [importFile] = useFileImportMutation();
  const [createDashboard] = useCreateDashboardMutation();
  const router = useRouter();
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    dispatch(setCurrentUser(user));
  }, [user, dispatch]);

  const handleImportFile = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await importFile({
        file: formData,
        userId: user?.data.id,
      });
      let body = {
        created_by: user?.data?.id,
        file_uuid: response?.data?.uuid,
      };
      const responseDashboard = await createDashboard({ data: body });

      isLoading(true);
      router.push(`/board/dashboard/${responseDashboard?.data?.uuid}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImportFileAnalysis = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await importFile({
        file: formData,
        userId: user?.data.id,
      });

      isLoading(true);
      router.push(`/board/analysis/new/${response?.data?.uuid}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        className={
          "flex flex-col p-4 justify-center items-center w-full h-full"
        }
      >
        <input
          type="file"
          accept=".csv, .xlsx, .txt, .json"
          onChange={isAnalysis ? handleImportFileAnalysis : handleImportFile}
          style={{ display: "none" }}
          id="uploadInput"
        />
        <label
          className="flex flex-col justify-center items-center"
          htmlFor="uploadInput"
        >
          <Image src={UploadData} alt={""} className={"w-28 "} />
          <p className={"font-bold"}>Upload new dataset</p>
        </label>
      </Button>
    </div>
  );
};

export default UploadDataSetDashboard;
