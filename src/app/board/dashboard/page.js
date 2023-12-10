"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import EmptyAnalysis from "@/app/board/components/emptyAnalysis";
import { MockDataDashboard } from "../mockData/mockDataDashboard";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import UploadDataSetDashboard from "./components/importData/UploadDataSet";
import AddDashboard from "./components/buttons/AddDashboard";
import ExistingDatasetTable from "../components/importData/ExistingDatasetTable";

const Page = () => {
  const [mockData, setMockData] = useState(MockDataDashboard.listDashboard);

  const [size, setSize] = React.useState("2xl");

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  return (
    <div className="py-10 px-5">
      <div className={"flex flex-row w-full pb-5 justify-between"}>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
          size={size}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  <h4>Import Dataset</h4>
                </ModalHeader>

                <ModalBody>
                  <div
                    className={
                      "flex flex-row mb-12 mt-8 justify-center items-center gap-10"
                    }
                  >
                    <UploadDataSetDashboard />
                    <ExistingDatasetTable />
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
        <div className={"flex flex-col"}>
          <p className={"text-primary-color font-semibold text-3xl"}>
            Dashboard
          </p>
        </div>
        <AddDashboard onOpen={onOpen}/>
      </div>
      <div>
        {MockDataDashboard.listDashboard.length === 0 ? (
          <EmptyAnalysis isAnalysis={false} />
        ) : (
          <div>
            <div className={"flex flex-row gap-5"}>
              {MockDataDashboard.listDashboard.map((item, index) => (
                <Link
                  href={item.url}
                  key={index}
                  className={
                    "flex flex-col gap-3 p-2 bg-white shadow-sm hover:bg-blue-100 rounded-xl hover:ring-1 hover:ring-primary-color transition-all"
                  }
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.name}
                    className={
                      "max-w-[265px] max-h-[157px] rounded-xl object-cover"
                    }
                  />
                  <div className={"flex ps-2 pb-1 flex-col"}>
                    <p>{item.name}</p>
                    <p>{item.createdAt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
