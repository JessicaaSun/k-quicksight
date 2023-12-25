"use client";
import React, { useEffect, useState } from "react";
import EmptyAnalysis from "@/app/board/components/cards/emptyAnalysis";
import { Select } from "antd";
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
import Loading from "@/app/loading";
import DashboardCard from "../components/cards/DashboardCard";
import { AiOutlineSearch } from "react-icons/ai";
import UploadDataSetDashboard from "../components/importData/UploadDataSet";
import AddDashboard from "../components/buttons/AddDashboard";
import { useGetDashboardByUserUuidQuery } from "@/store/features/dashboard/dashboardApiSlice";

const Page = () => {
  const { data: user, isLoading: userLoading, refetch } = useGetUserQuery();
  const [sizeDash, setSizeDash] = React.useState(100);
  const handleChangeSizeDash = (value) => {
    setSizeDash(value.value);
  };
  const { data: allDashboard, isLoading: dashboardLoading } =
    useGetDashboardByUserUuidQuery({
      userUuid: user?.data.uuid,
      page: 1,
      size: sizeDash,
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
                  <h4 className={"dark:text-white"}>Import Dataset</h4>
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
          <p
            className={
              "text-primary-color font-semibold text-3xl dark:text-third-color"
            }
          >
            Dashboard
          </p>
        </div>
        <AddDashboard onOpen={onOpen} />
      </div>
      <div className="mb-5 flex gap-5 relative">
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
        <Select
          labelInValue={"Size filter"}
          size={"medium"}
          defaultValue="100"
          style={{
            width: 100,
          }}
          onChange={handleChangeSizeDash}
          options={[
            {
              value: "100000",
              label: "All",
            },
            {
              value: 1,
              label: 1,
            },
            {
              value: 10,
              label: 10,
            },
            {
              value: 300,
              label: 300,
            },
            {
              value: 400,
              label: 400,
            },
          ]}
        />
      </div>
      <div>
        {allDashboard && allDashboard?.results.length === 0 ? (
          <EmptyAnalysis isAnalysis={false} />
        ) : (
          <div>
            <div className={"grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-5"}>
              {filteredDashboards?.map((item, index) => {
                return (
                  <DashboardCard
                    key={item.uuid}
                    isAnalysis={false}
                    analysisModel={"Correlation"}
                    fileTitle={"Sale_amazon.csv"}
                    routeTo={`/board/dashboard/${item.uuid}`}
                    item={item}
                    index={index}
                  />
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
