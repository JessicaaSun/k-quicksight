/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
  Card,
  CardHeader,
  CardFooter,
} from "@nextui-org/react";
import EmptyAnalysis from "@/app/board/components/emptyAnalysis";
import {
  useAllAnalysisFileQuery,
  useDeleteAnalysisFileMutation,
} from "@/store/features/analysis/Analysis";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { getTrimIntoColumnOnlyDate } from "@/utils/getTrimDateTIme";
import { generateBashURL } from "@/utils/util";
import DeleteAnalysisFile from "./components/DeleteAnalysis";
import { useRouter } from "next/navigation";
import AddNewButton from "./components/NewVersion/ModalAddNew";
const Page = () => {
  const { data: user } = useGetUserQuery();
  const { data: allAnalysis } = useAllAnalysisFileQuery({
    userId: user?.data.id,
    page: 1,
    size: 100,
    title: "",
  });
  const router = useRouter();

  const link = {
    route: "/board/analysis/new",
  };

  const [size, setSize] = React.useState("2xl");

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  return (
    <div className="py-10 px-5 ">
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
          <EmptyAnalysis />
        ) : (
          <div>
            <div
              className={"grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-5"}
            >
              {allAnalysis?.results.map((item, index) => (
                <div key={index} className="grid gap-3">
                  <Card className="w-full shadow-sm bg-black hover:scale-105 transition-all h-[300px] col-span-12 sm:col-span-5">
                    <CardHeader className="absolute z-10 top-1 flex-col items-start">
                      <p className="text-tiny text-white/60 uppercase font-bold">
                        {item.model_name}
                      </p>
                      <h4 className="text-white font-medium text-2xl">
                        {item.title}
                      </h4>
                    </CardHeader>
                    <button
                      className="w-full h-full"
                      onClick={() =>
                        router.push(
                          `/board/analysis/${item.file.uuid}/${item.uuid}`
                        )
                      }
                    >
                      <img
                        alt="Card example background"
                        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover opacity-70"
                        src={generateBashURL(item.thumbnail)}
                      />
                    </button>
                    <CardFooter className="absolute bg-white bottom-0 border-t-1 z-10 justify-between">
                      <div>
                        <p className="text-black text-tiny">
                          {getTrimIntoColumnOnlyDate(item.created_at)}
                        </p>
                        <p className="text-black text-tiny">{item.file.file}</p>
                      </div>
                      <DeleteAnalysisFile
                        uuid={item.uuid}
                        filename={item.title}
                      />
                    </CardFooter>
                  </Card>
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
