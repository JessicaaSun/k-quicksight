/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useDisclosure } from "@nextui-org/react";
import EmptyAnalysis from "@/app/board/components/emptyAnalysis";
import { useAllAnalysisFileQuery } from "@/store/features/analysis/analysisApiSlice";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useRouter } from "next/navigation";
import AddNewButton from "./components/NewVersion/ModalAddNew";
import AnalysisCard from "../components/cards/AnalysisCard";
const Page = () => {
  const { data: user } = useGetUserQuery();
  const { data: allAnalysis } = useAllAnalysisFileQuery({
    userId: user?.data.id,
    page: 1,
    size: 100,
    title: "",
  });
  const router = useRouter();

  const [size, setSize] = React.useState("2xl");

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  return (
    <div className="py-10 px-7 ">
      <div className={"flex flex-row w-full pb-5 justify-between"}>
        <div className={"flex flex-col"}>
          <p className={"text-primary-color font-semibold text-3xl"}>
            Analysis
          </p>
        </div>
        <div>
          <AddNewButton />
        </div>
      </div>
      <div>
        {allAnalysis?.results.length === 0 ? (
          <EmptyAnalysis isAnalysis={true} />
        ) : (
          <div>
            <div
              className={"grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-5"}
            >
              {allAnalysis?.results.map((item, index) => (
                <div key={index} className="grid gap-3 shadow-md rounded-2xl">
                  <AnalysisCard item={item} index={index} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Page;
