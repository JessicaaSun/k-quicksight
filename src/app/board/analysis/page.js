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
import Link from "next/link";
import Image from "next/image";
import { MockDataAnalysis } from "@/app/board/mockData/mockDataAnalysis";
import EmptyAnalysis from "@/app/board/components/emptyAnalysis";
import UploadDataSet from "@/app/board/analysis/components/UploadDataSet";
import ExistingDataset from "@/app/board/analysis/components/ExistingDataset";
import {
  useAllAnalysisFileQuery,
  useDeleteAnalysisFileMutation,
} from "@/store/features/analysis/Analysis";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { getTrimIntoColumnOnlyDate } from "@/utils/getTrimDateTIme";
import { generateBashURL } from "@/utils/util";
import DeleteAnalysisFile from "./components/DeleteAnalysis";
import { useRouter } from "next/navigation";
const Page = () => {
  const { data: user } = useGetUserQuery();
  const [mockData, setMockData] = useState(MockDataAnalysis.listAnalysis);
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
        <div className={"text-primary-color "}>
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
                        <UploadDataSet />
                        <ExistingDataset />
                      </div>
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>
            <div className={"text-primary-color "}>
              {/* <Link href={link.route}> */}
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
              {/* </Link> */}
            </div>
          </div>
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
                <div key={index} className="grid gap-3">
                  <Card className="w-full bg-black hover:scale-105 transition-all h-[300px] col-span-12 sm:col-span-5">
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
