"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { MockDataAnalysis } from "@/app/board/mockData/mockDataAnalysis";
import EmptyAnalysis from "@/app/board/components/emptyAnalysis";
import {useAllAnalysisFileQuery} from "@/store/features/analysis/Analysis";
import {useGetUserQuery} from "@/store/features/clean/importFile";
import {getTrimIntoColumnOnlyDate} from "@/utils/getTrimDateTIme";
import {generateBashURL} from "@/utils/util";

const Analysis = () => {
  const {data:user} = useGetUserQuery();
  const [mockData, setMockData] = useState(MockDataAnalysis.listAnalysis);
  const {data:allAnalysis} = useAllAnalysisFileQuery({userId: user?.data.id})

  console.log(allAnalysis)

  const link = {
    route: "/board/analysis/new",
  };
  return (
    <div className="py-10 px-5 ">
      <div className={"flex flex-row w-full pb-5 justify-between"}>
        <div className={"flex flex-col"}>
          <p className={"text-primary-color font-bold text-3xl"}>
            Analysis
          </p>
        </div>
        <div className={"text-primary-color "}>
          <Link href={link.route}>
            <Button className={"bg-primary-color text-background-color"}>
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
          </Link>
        </div>
      </div>
      <div>
        {allAnalysis?.results.length === 0 ? (
          <EmptyAnalysis />
        ) : (
          <div>
            <div className={"grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-5"}>
              {
                allAnalysis?.results.map((item, index) => (
                    <Link
                        href={`/board/analysis/${item.uuid}`}
                        key={index}
                        className={
                          "flex flex-col gap-3 p-2 bg-white shadow-sm hover:bg-blue-100 rounded-xl hover:ring-1 hover:ring-primary-color transition-all"
                        }
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                          src={generateBashURL(item.thumbnail)}
                          alt={item.model_name}
                          className={
                            "w-full rounded-xl object-cover"
                          }
                      />
                      <div className={"flex ps-2 pb-1 flex-col"}>
                        <h5>{item.title || item.model_name}</h5>
                        <p>{getTrimIntoColumnOnlyDate(item.created_at)}</p>
                      </div>
                    </Link>
                ))
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Analysis;