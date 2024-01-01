"use client";
import React, { useEffect, useState } from "react";
import EmptyAnalysis from "@/app/board/components/cards/emptyAnalysis";
import {
  Modal,
  ModalBody,
  ModalContent,
  Pagination,
  ModalHeader,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { HiMiniViewColumns } from "react-icons/hi2";
import ExistingDatasetTable from "../components/importData/ExistingDatasetTable";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import Loading from "@/app/loading";
import DashboardCard from "../components/cards/DashboardCard";
import { AiOutlineSearch } from "react-icons/ai";
import UploadDataSetDashboard from "../components/importData/UploadDataSet";
import AddDashboard from "../components/buttons/AddDashboard";
import { useGetDashboardByUserUuidQuery } from "@/store/features/dashboard/dashboardApiSlice";
import SearchFieldKQS from "@/components/buttons/SearchField";
import { FaList } from "react-icons/fa6";
import DashboardList from "../components/cards/DashboardListDesign";
import ViewMode from "../components/buttons/CardListOpt";
import FilterSize from "../components/fields/FilterSize";

const DashboardKQS = () => {
  const { data: user, isLoading: userLoading, refetch } = useGetUserQuery();
  const [size, setSize] = useState(100);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("card");
  const [dashboardTitle, setDashboardTitle] = useState("");

  const { data: allDashboard, isLoading: dashboardLoading } =
    useGetDashboardByUserUuidQuery({
      userUuid: user?.data.uuid,
      page: page,
      size: size,
    });
  const [filteredDashboards, setFilteredDashboards] = useState(
    allDashboard?.results || []
  );

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleSelectionChange = (e) => {
    setSize(e.target.value);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const toggleViewMode = () => {
    setViewMode((prevViewMode) => (prevViewMode === "card" ? "list" : "card"));
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
    <div className="py-10 pb-0 px-7">
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
        <AddDashboard isAnalysis={false} onOpen={onOpen} />
      </div>
      <div className="flex justify-between">
        <div className="mb-5  w-full flex md:gap-5 max-sm:gap-2 sm:gap-2">
          <div className="md:w-[40%] max-sm:w-[70%] sm:w-[70%]">
            <SearchFieldKQS
              onChange={(e) => setDashboardTitle(e.target.value)}
              placeholder={"Search"}
              value={dashboardTitle}
              height="45px"
            />
          </div>
          <FilterSize handleChange={handleSelectionChange} />
        </div>
        <ViewMode viewMode={viewMode} toggleViewMode={toggleViewMode} />
      </div>

      <div>
        {allDashboard && allDashboard?.results.length === 0 ? (
          <EmptyAnalysis isSearchNotFound={false} isAnalysis={false} />
        ) : filteredDashboards?.length === 0 ? (
          <EmptyAnalysis isSearchNotFound={true} isAnalysis={false} />
        ) : (
          <div
            style={{ minHeight: "calc(100vh - 255px)" }}
            className="flex flex-col justify-between"
          >
            {viewMode === "card" ? ( // Render as cards
              <div
                className={
                  "grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-5"
                }
              >
                {filteredDashboards?.map((item, index) => {
                  return (
                    <DashboardCard
                      key={item.uuid}
                      isAnalysis={false}
                      routeTo={`/board/dashboard/${item.uuid}`}
                      item={item}
                      index={index}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col w-full gap-3">
                {filteredDashboards?.map((item, index) => (
                  <DashboardList
                    key={item.uuid}
                    isAnalysis={false}
                    routeTo={`/board/dashboard/${item.uuid}`}
                    item={item}
                    index={index}
                  />
                ))}
              </div>
            )}

            <Pagination
              isCompact
              showControls
              className="flex justify-end pt-8"
              total={allDashboard?.pages?.length}
              initialPage={1}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardKQS;
