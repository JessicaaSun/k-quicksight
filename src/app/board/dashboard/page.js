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
  Select,
  SelectItem,
} from "@nextui-org/react";

import ExistingDatasetTable from "../components/importData/ExistingDatasetTable";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import Loading from "@/app/loading";
import DashboardCard from "../components/cards/DashboardCard";
import { AiOutlineSearch } from "react-icons/ai";
import UploadDataSetDashboard from "../components/importData/UploadDataSet";
import AddDashboard from "../components/buttons/AddDashboard";
import { useGetDashboardByUserUuidQuery } from "@/store/features/dashboard/dashboardApiSlice";
import SearchFieldKQS from "@/components/buttons/SearchField";

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
      <div className="mb-5 w-full flex gap-5 ">
        <SearchFieldKQS
          onChange={(e) => setDashboardTitle(e.target.value)}
          placeholder={"Search"}
          value={dashboardTitle}
          width={"40%"}
          height="45px"
        />
        <Select
          aria-label={"Size Filter"}
          size={"sm"}
          color={"primary"}
          shadow={false}
          defaultSelectedKeys={["all"]}
          className={"w-[100px] dark:text-white shadow-none"}
          onChange={handleChangeSizeDash}
          variant={"bordered"}
        >
          <SelectItem className="dark:text-white" key={"all"} value={1000000}>
            All
          </SelectItem>
          <SelectItem className="dark:text-white" key={1} value={1}>
            1
          </SelectItem>
          <SelectItem className="dark:text-white" key={10} value={10}>
            10
          </SelectItem>
          <SelectItem className="dark:text-white" key={20} value={20}>
            20
          </SelectItem>
          <SelectItem className="dark:text-white" key={50} value={50}>
            50
          </SelectItem>
          <SelectItem className="dark:text-white" key={100} value={100}>
            100
          </SelectItem>
        </Select>
      </div>
      <div>
        {allDashboard && allDashboard?.results.length === 0 ? (
          <EmptyAnalysis isAnalysis={false} />
        ) : (
          <div>
            <div
              className={"grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-5"}
            >
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
