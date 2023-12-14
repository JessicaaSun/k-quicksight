"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import TableImage from "@assets/images/analysis/table.png";
import {
  Button,
  Modal,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useVisualizeFileContext } from "@/context/VisualizeFileContext";
import { IoMdSearch } from "react-icons/io";
import ListAllFiles from "./ListAllFiles";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useGetAllFilesQuery } from "@/store/features/files/allFileByuserId";
import SelectButton from "@/components/buttons/SelectButton";
import { useCreateDashboardMutation } from "@/store/features/visualization/visualizeApiSlice";
import { toast } from "react-toastify";
import { AiOutlineSearch } from "react-icons/ai";

const ExistingDatasetTable = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const [datasetName, setDatasets] = useState("");
  const [fileType, setFileTypes] = useState("");
  const { data: user } = useGetUserQuery();
  const [createDashboard] = useCreateDashboardMutation();
  const [loading, isLoading] = useState(false);
  const [selectedFileUuid, setSelectedFileUuid] = useState(null);
  const { data: allFiles, isLoading: isFileLoading } = useGetAllFilesQuery({
    id: user?.data.id,
    filename: datasetName,
    type: fileType,
  });

  const handleSelectDataSet = async () => {
    try {
      let body;
      body = {
        created_by: user?.data?.id,
        file_uuid: selectedFileUuid,
      };
      const responseDashboard = await createDashboard({ data: body });
      console.log("dash", responseDashboard);
      isLoading(true);
      router.push(`/board/dashboard/${responseDashboard?.data?.uuid}`);
    } catch {
      if (!error.response) {
        toast.error("No file selected.");
      }
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className={"flex flex-col justify-center p-4 items-center h-full"}
      >
        <Image priority={false} src={TableImage} alt={""} className={"w-28"} />
        <p className={" font-bold"}>Pick existing dataset</p>
      </Button>
      <Modal
        size="2xl"
        className="max-h-[400px] min-h-[400px] overflow-auto"
        isOpen={isOpen}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex text-xl text-text-color flex-col gap-1">
                Importing dataset
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-normal mb-2 items-center gap-3">
                  <input
                    id="searchQueryInput"
                    type="text"
                    name="searchQueryInput"
                    placeholder="Search"
                    className="w-full h-[38px] bg-slate-50 outline-hover-primary outline-1 outline-offset-1 border-[1px] border-gray-300 rounded-full px-6 text-base"
                    value={datasetName}
                    onChange={(e) => setDatasets(e.target.value)}
                  />
                  <SelectButton
                    rounded={"full"}
                    color={"primary-color"}
                    text={"Select"}
                    hover={"hover-primary"}
                    clickAction={handleSelectDataSet}
                  />
                </div>
                <ListAllFiles
                  file={allFiles}
                  isFileLoading={isFileLoading}
                  onRowSelect={(fileUuid) => setSelectedFileUuid(fileUuid)}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ExistingDatasetTable;
