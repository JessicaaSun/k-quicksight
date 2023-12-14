"use client";
import React, { useEffect, useState } from "react";
import EmptyAnalysis from "@/app/board/components/cards/emptyAnalysis";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import ExistingDatasetTable from "../components/importData/ExistingDatasetTable";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useGetDashboardByUserUuidQuery } from "@/store/features/visualization/visualizeApiSlice";
import Loading from "@/app/loading";
import DashboardCard from "../components/cards/DashboardCard";
import { AiOutlineSearch } from "react-icons/ai";
import UploadDataSetDashboard from "../components/importData/UploadDataSet";
import AddDashboard from "../components/buttons/AddDashboard";

const Page = () => {
  const { data: user, isLoading: userLoading, refetch } = useGetUserQuery();
  const { data: allDashboard, isLoading: dashboardLoading } =
    useGetDashboardByUserUuidQuery({
      userUuid: user?.data.uuid,
      page: 1,
      size: 100,
    });
  const [size, setSize] = React.useState("2xl");
  const [dashboardTitle, setDashboardTitle] = useState("");
  const [filteredDashboards, setFilteredDashboards] = useState([]);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };
  useEffect(() => {
    if (dashboardTitle.trim() === "") {
      // If the search query is empty, show all dashboards
      setFilteredDashboards(allDashboard?.results || []);
    } else {
      // If there is a search query, filter dashboards based on the title
      const filteredResults = (allDashboard?.results || []).filter((item) =>
        item.title.toLowerCase().includes(dashboardTitle.toLowerCase())
      );
      setFilteredDashboards(filteredResults);
    }
  }, [dashboardTitle, allDashboard]);

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
      <div className="mb-5 relative">
        <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <AiOutlineSearch size={20} className="text-gray-400 font-semibold" />
        </div>
        <input
          id="searchQueryInput"
          type="text"
          name="searchQueryInput"
          placeholder="Search"
          className="w-[40%] h-[35px] bg-slate-50 outline-third-color outline-1  border-[1px] border-gray-300 rounded-3xl px-9 text-base"
          value={dashboardTitle}
          onChange={(e) => setDashboardTitle(e.target.value)}
        />
      </div>
      <div>
        {allDashboard && allDashboard?.results.length === 0 ? (
          <EmptyAnalysis isAnalysis={false} />
        ) : (
          <div>
            <div className={"flex flex-wrap gap-5"}>
              {filteredDashboards?.map((item, index) => {
                return (
                  <div key={item.uuid}>
                    <DashboardCard
                      isAnalysis={false}
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
