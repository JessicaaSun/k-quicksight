"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { FaCirclePlus } from "react-icons/fa6";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useFileImportMutation } from "@/store/features/files/allFileByuserId";
import UploadDataSetDashboard from "@/app/board/components/importData/UploadDataSet";
import ExistingDatasetTable from "@/app/board/components/importData/ExistingDatasetTable";
import AddDashboard from "@/app/board/components/buttons/AddDashboard";

export default function AddNewButton() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { data: user } = useGetUserQuery();

  return (
    <>
      <AddDashboard isAnalysis={true} onOpen={onOpen} />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        size={"2xl"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h4 className={"dark:text-white"}>Import Dataset</h4>
              </ModalHeader>

              <ModalBody>
                <div
                  className={
                    "flex flex-row mb-12 mt-8 justify-center items-center gap-10"
                  }
                >
                  <UploadDataSetDashboard isAnalysis={true} />
                  <ExistingDatasetTable isAnalysis={true} />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
