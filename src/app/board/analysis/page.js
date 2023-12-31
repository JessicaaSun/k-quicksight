/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import {
  Select,
  SelectItem,
  Spinner,
  Pagination,
  useDisclosure,
} from "@nextui-org/react";
import { useAllAnalysisFileQuery } from "@/store/features/analysis/analysisApiSlice";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useRouter } from "next/navigation";
import AddNewButton from "./components/NewVersion/ModalAddNew";
import EmptyAnalysis from "../components/cards/emptyAnalysis";
import DashboardCard from "@/app/board/components/cards/DashboardCard";
import SearchFieldKQS from "@/components/buttons/SearchField";
const Page = () => {
  const { data: user } = useGetUserQuery();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(100);

  const handleChange = (value) => {
    const intValue = parseInt(value.target.value, 10); // Use parseInt with base 10
    setSize(intValue);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const { data: allAnalysis, isLoading: analysisLoading } =
    useAllAnalysisFileQuery({
      userId: user?.data.id,
      page: page,
      size: size,
      title: search,
    });
  const router = useRouter();

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  return (
    <div className="py-10 px-7 ">
      <div className={"flex flex-row w-full pb-5 justify-between"}>
        <div className={"flex flex-col"}>
          <p
            className={
              "text-primary-color font-semibold text-3xl dark:text-third-color"
            }
          >
            Analysis
          </p>
        </div>
        <div>
          <AddNewButton />
        </div>
      </div>
      <div>
        <div className="mb-5  w-full flex md:gap-5 max-sm:gap-2 sm:gap-2">
          <div className="md:w-[40%] max-sm:w-[70%] sm:w-[70%]">
            <SearchFieldKQS
              onChange={(e) => setSearch(e.target.value)}
              placeholder={"Search analysis"}
              value={search}
              height="45px"
            />
          </div>
          <Select
            aria-label={"Size Filter"}
            size={"sm"}
            color={"primary"}
            shadow={false}
            defaultSelectedKeys={["10"]}
            className={
              "md:w-[100px] max-sm:w-[30%] sm:w-[30%] dark:text-white shadow-none"
            }
            onChange={handleChange}
            variant={"bordered"}
          >
            <SelectItem className="dark:text-white" key={5} value={5}>
              5
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
            <SelectItem className="dark:text-white" key={"all"} value={1000000}>
              All
            </SelectItem>
          </Select>
        </div>

        {allAnalysis?.results.length === 0 ? (
          <EmptyAnalysis isSearchNotFound={false} isAnalysis={true} />
        ) : (
          <div>
            {analysisLoading ? (
              <div className={"flex justify-center items-center"}>
                <Spinner size={"lg"} />
              </div>
            ) : (
              <div
                style={{ minHeight: "calc(100vh - 255px)" }}
                className="flex flex-col justify-between"
              >
                <div
                  className={
                    "grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-5"
                  }
                >
                  {allAnalysis?.results?.map((item, index) => {
                    return (
                      <DashboardCard
                        key={item.uuid}
                        item={item}
                        isAnalysis={true}
                        index={index}
                        routeTo={`/board/analysis/${item.file.uuid}/${item.uuid}`}
                      />
                    );
                  })}
                </div>
                <Pagination
                  isCompact
                  showControls
                  className="flex justify-end pt-8"
                  total={allAnalysis?.pages?.length}
                  initialPage={1}
                  onChange={handlePageChange}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Page;
