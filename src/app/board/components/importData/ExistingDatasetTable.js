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

import boxEmpty from "@assets/images/analysis/box-empty.png";
import { useRouter } from "next/navigation";

import ListAllFiles from "./ListAllFiles";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useGetAllFilesQuery } from "@/store/features/files/allFileByuserId";
import SelectButton from "@/components/buttons/SelectButton";
import { toast } from "react-toastify";
import { AiOutlineSearch } from "react-icons/ai";
import { useCreateDashboardMutation } from "@/store/features/dashboard/dashboardApiSlice";
import SearchFieldKQS from "@/components/buttons/SearchField";

const ExistingDatasetTable = ({ isAnalysis }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const [datasetName, setDatasets] = useState("");
  const [fileType, setFileTypes] = useState("");
  const { data: user } = useGetUserQuery();
  const [createDashboard] = useCreateDashboardMutation();
  const [selectButtonClicked, setSelectButtonClicked] = useState(false);
  const [loading, isLoading] = useState(false);
  const [selectedFileUuid, setSelectedFileUuid] = useState(null);
  const { data: allFiles, isLoading: isFileLoading } = useGetAllFilesQuery({
    id: user?.data.id,
    filename: datasetName,
    type: fileType,
  });

  const handleSelectDataSet = async () => {
    if (!selectedFileUuid) {
      setSelectButtonClicked(true);
      return;
    }
    try {
      let body = {
        created_by: user?.data?.id,
        file_uuid: selectedFileUuid,
      };
      const responseDashboard = await createDashboard({ data: body });

      isLoading(true);
      router.push(`/board/dashboard/${responseDashboard?.data?.uuid}`);
    } catch (error) {
      if (!error.response) {
        toast.error("An error occurred while creating the dashboard.");
      }
    }
  };

  const handleProcessAnalysis = () => {
    if (!selectedFileUuid) {
      setSelectButtonClicked(true);
      return;
    }
    isLoading(true);
    router.push(`/board/analysis/new/${selectedFileUuid}`);
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
        className="max-h-[400px] w-full min-h-[400px] overflow-hidden" // Use overflow-hidden
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex w-full text-xl dark:text-white text-text-color flex-col gap-1">
                Importing dataset
              </ModalHeader>

              <ModalBody>
                <div className="flex w-full justify-normal mb-2 items-center gap-3 sticky top-0 bg-white z-10">
                  <SearchFieldKQS
                    onChange={(e) => setDatasets(e.target.value)}
                    placeholder={"Search dataset..."}
                    value={datasetName}
                    height="45px"
                  />
                  <SelectButton
                    rounded={"lg"}
                    height="45px"
                    color={"primary-color"}
                    text={"Select"}
                    hover={"hover-primary"}
                    clickAction={
                      isAnalysis ? handleProcessAnalysis : handleSelectDataSet
                    }
                  //  disabled={!selectedFileUuid} 
                  />
                </div>
                {selectButtonClicked && !selectedFileUuid && (
                  <p className="text-red-500 text-base ml-2">
                    No dataset selected, please select one!
                  </p>
                )}
                <div className="overflow-auto max-h-[350px]">
                  {allFiles && allFiles.length > 0 ? (
                    <ListAllFiles
                      file={allFiles}
                      isFileLoading={isFileLoading}
                      onRowSelect={(fileUuid) => setSelectedFileUuid(fileUuid)}
                    />
                  ) : datasetName && !isFileLoading ? (
                    <div
                      className={"flex flex-col justify-center items-center"}
                    >
                      <Image
                        src={boxEmpty}
                        unoptimized={true}
                        alt={""}
                        className={"w-32"}
                      />
                      <p
                        className={
                          "text-description-color dark:text-third-color font-semibold text-lg"
                        }
                      >
                        No result found for &quot;{datasetName}&quot;.
                      </p>
                    </div>
                  ) : (
                    <div
                      className={"flex flex-col justify-center items-center"}
                    >
                      <Image
                        src={boxEmpty}
                        unoptimized={true}
                        alt={""}
                        className={"w-32"}
                      />
                      <p
                        className={
                          "text-description-color dark:text-third-color font-semibold text-lg"
                        }
                      >
                        You have no dataset imported, please upload.
                      </p>
                    </div>
                  )}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ExistingDatasetTable;
