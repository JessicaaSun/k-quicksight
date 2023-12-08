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
import ExistingDatasetDashboard from "./components/importData/ExistingDataset";

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
                    <ExistingDatasetDashboard />
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
        <div className={"text-primary-color "}>
          <Button
            onPress={onOpen}
            className={"bg-primary-color text-background-color"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                fill="white"
              />
            </svg>
            Add new
          </Button>
        </div>
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
