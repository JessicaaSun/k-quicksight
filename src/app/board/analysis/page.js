/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import {
  Input,
  Select,
  SelectItem,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { useAllAnalysisFileQuery } from "@/store/features/analysis/analysisApiSlice";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useRouter } from "next/navigation";
import AddNewButton from "./components/NewVersion/ModalAddNew";
import AnalysisCard from "../components/cards/AnalysisCard";
import EmptyAnalysis from "../components/cards/emptyAnalysis";
import DashboardCard from "@/app/board/components/cards/DashboardCard";
import { SearchIcon } from "../doc/searchIcons";
import SearchFieldKQS from "@/components/buttons/SearchField";
const Page = () => {
  const { data: user } = useGetUserQuery();
  const [search, setSearch] = useState("");
  const [size, setSize] = React.useState(100);
  const handleChange = (value) => {
    const intValue = parseInt(value.target.value, 10); // Use parseInt with base 10
    setSize(intValue);
  };

  const { data: allAnalysis, isLoading: analysisLoading } =
    useAllAnalysisFileQuery({
      userId: user?.data.id,
      page: 1,
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
        <div className={"flex dark:text-white gap-5 items-center"}>
          <SearchFieldKQS
            onChange={(e) => setSearch(e.target.value)}
            placeholder={"Search"}
            value={search}
            width={"40%"}
            height="45px"
          />
          <Select
            aria-label={"Size Filter"}
            size={"sm"}
            color={"primary"}
            shadow={false}
            className={"w-[100px]  dark:text-white shadow-none"}
            defaultSelectedKeys={["all"]}
            onChange={handleChange}
            variant={"bordered"}
          >
            <SelectItem
              className="dark:text-white"
              key={"all"}
              value={1000000}
            >
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
        {allAnalysis?.results.length === 0 ? (
          <EmptyAnalysis isAnalysis={true} />
        ) : (
          <div>
            <div
              className={
                "grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-5 my-5"
              }
            >
              {analysisLoading ? (
                <div className={"flex justify-center items-center"}>
                  <Spinner size={"lg"} />
                </div>
              ) : (
                <>
                  {allAnalysis?.results.map((item, index) => (
                    <div
                      key={index}
                      className="grid gap-3 rounded-2xl"
                    >
                      <DashboardCard
                        item={item}
                        isAnalysis={true}
                        index={index}
                        routeTo={`/board/analysis/${item.file.uuid}/${item.uuid}`}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Page;
