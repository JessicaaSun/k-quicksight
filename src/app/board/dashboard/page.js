"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import EmptyAnalysis from "@/app/board/components/emptyAnalysis";
import { getTrimIntoColumnDateAndTime } from "@/utils/getTrimDateTIme";
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
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useGetDashboardByUserUuidQuery } from "@/store/features/visualization/visualizeApiSlice";
import Loading from "@/app/loading";
import { generateBashURL } from "@/utils/util";
import DashboardCard from "../components/cards/DashboardCard";

const Page = () => {
  const { data: user, isLoading: userLoading, refetch } = useGetUserQuery();
  const { data: allDashboard, isLoading: dashboardLoading } =
    useGetDashboardByUserUuidQuery({
      userUuid: user?.data.uuid,
      page: 1,
      size: 100,
    });
  const [size, setSize] = React.useState("2xl");

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  if (userLoading || dashboardLoading) {
    return <Loading />;
  }

  return (
    <div className="py-10 px-7">
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
        <AddDashboard onOpen={onOpen} />
      </div>
      <div>
        {allDashboard && allDashboard?.results.length === 0 ? (
          <EmptyAnalysis isAnalysis={false} />
        ) : (
          <div>
            <div className={"flex flex-wrap gap-5"}>
              {allDashboard?.results?.map((item, index) => {
                return (
                  <div key={item.uuid}>
                    <DashboardCard
                    isAnalysis={true} 
                    analysisModel={"Correlation"}
                    fileTitle={"Sale_amazon.csv"}
                      routeTo={`/board/dashboard/${item.uuid}`}
                      item={item}
                      index={index}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
