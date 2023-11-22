"use client";

import React from "react";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { Button, Input } from "@nextui-org/react";
import { SearchIcon } from "@/app/board/recent/searchIcons";
import { mockData } from "@/app/board/mockData/mockData";
import Link from "next/link";
import Image from "next/image";
import {IoSearchSharp} from "react-icons/io5";

export default function UserBoard() {
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery();

    return (
        <div className={'py-10 px-5'}>
            <div className={'flex min-h-screen flex-col'}>
                <div className={'flex justify-between items-center'}>
                    <p className={'text-xl text-primary-color font-semibold'}>Recent</p>
                    <Input
                        startContent={<IoSearchSharp />}
                        classNames={{
                            input: [
                                'px-10'
                            ],
                            inputWrapper: [
                                'h-[42px] w-[384px] '
                            ]
                        }}
                        placeholder={'Search file...'}
                        className={'w-[384px]'}
                        variant="bordered"
                        color={'primary'}
                    />
                </div>
                <div className={'my-10'}>
                    <p className={'text-xl mb-5 text-primary-color font-semibold'}>Dataset</p>
                    <div className={'flex flex-col gap-5'}>
                        {
                            mockData.dataset.map((item, index) => (
                                <Link href={item.url} key={index} className={'active:scale-105 hover:bg-primary-color hover:text-white transition-all shadow-sm flex justify-between font-semibold items-center rounded-xl px-5 py-2 text-primary-color border-1 border-gray-200'}>
                                    <p className={'w-1/4 text-left'}>{item.filename}</p>
                                    <p className={'w-1/4 text-center'}>{item.fileType}</p>
                                    <p className={'w-1/4 text-center'}>{item.createDate}</p>
                                    <p className={'w-1/4 text-right'}>{item.fileSize}</p>
                                </Link>
                            ))
                        }
                    </div>
                </div>
                <div className={'mb-10'}>
                    <p className={'text-xl mb-5 text-primary-color font-semibold'}>Analysis</p>
                    <div className={'flex flex-col gap-5'}>
                        {
                            mockData.analysis.map((item, index) => (
                                <Link href={item.url} key={index} className={'active:scale-105 hover:bg-primary-color hover:text-white transition-all shadow-sm flex flex-end justify-between font-semibold items-center rounded-xl px-5 py-2 text-primary-color border-1 border-gray-200'}>
                                    <p className={'w-1/3'}>{item.filename}</p>
                                    <p className={'w-1/3 text-center'}>{item.createDate}</p>
                                    <p className={'w-1/3 text-right'}>{item.fileSize}</p>
                                </Link>
                            ))
                        }
                    </div>
                </div>
                <div className={'mb-10'}>
                    <p className={'text-xl mb-5 text-primary-color font-semibold'}>Dashboard</p>
                    <div className={'flex flex-row gap-5'}>
                        {
                            mockData.dashboard.map((item, index) => (
                                <Link href={item.url} key={index} className={'active:scale-105 flex flex-col gap-5 p-2 hover:bg-blue-100 hover:shadow-lg rounded-xl hover:ring-1 hover:ring-primary-color transition-all'}>
                                    <Image src={item.thumbnail} alt={item.name} className={'max-w-[265px] max-h-[157px] rounded-xl object-cover'} />
                                    <div className={'flex flex-col'}>
                                        <p className={'text-description-color font-semibold'}>{item.name}</p>
                                        <p className={'text-description-color font-semibold'}>{item.createdAt}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
      </div>
  );
}
