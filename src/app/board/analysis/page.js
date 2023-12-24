/* eslint-disable @next/next/no-img-element */
"use client";
import React, {useState} from "react";
import {Input, Spinner, useDisclosure} from "@nextui-org/react";

import { useAllAnalysisFileQuery } from "@/store/features/analysis/analysisApiSlice";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useRouter } from "next/navigation";
import AddNewButton from "./components/NewVersion/ModalAddNew";
import AnalysisCard from "../components/cards/AnalysisCard";
import EmptyAnalysis from "../components/cards/emptyAnalysis";
import DashboardCard from "@/app/board/components/cards/DashboardCard";
import {FaSearch} from "react-icons/fa";
import {useSelector} from "react-redux";
import {Select} from "antd";
const Page = () => {
  const { data: user } = useGetUserQuery();
  const [search, setSearch] = useState('')
  const [size, setSize] = React.useState(100);
  const handleChange = (value) => {
    setSize(value.value)
  };

  const { data: allAnalysis, isLoading: analysisLoading } = useAllAnalysisFileQuery({
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
          <p className={"text-primary-color font-semibold text-3xl dark:text-third-color"}>
            Analysis
          </p>
        </div>
        <div>
          <AddNewButton />
        </div>
      </div>
      <div>
        <div className={'flex justify-between gap-5 items-center'}>
          <Input
              value={search}
              onValueChange={setSearch}
              size={'sm'}
              radius={'full'}
              variant={'bordered'}
              className={'dark:text-white'}
              startContent={<FaSearch className={'dark:text-third-color text-primary-color'} />}
              placeholder={'Search your analysis'} />
          <Select
              labelInValue={'Size filter'}
              size={'large'}
              defaultValue="100"
              style={{
                width: 200,
              }}
              onChange={handleChange}
              options={[
                {
                  value: '100000',
                  label: 'All analysis'
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
                },{
                  value: 400,
                  label: 400,
                },
              ]}
          />
        </div>
        {allAnalysis?.results.length === 0 ? (
          <EmptyAnalysis isAnalysis={true} />
        ) : (
          <div>
            <div
              className={"grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-5 my-5"}
            >
              {
                analysisLoading ? (
                    <div className={'flex justify-center items-center'}>
                      <Spinner size={'lg'} />
                    </div>
                ) : (
                    <>
                      {
                        allAnalysis?.results.map((item, index) => (
                            <div key={index} className="grid gap-3 shadow-md rounded-2xl">
                              <DashboardCard item={item} index={index} routeTo={`/board/analysis/${item.file.uuid}/${item.uuid}`} />
                            </div>
                        ))
                      }
                    </>
                )
              }
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
export default Page;
