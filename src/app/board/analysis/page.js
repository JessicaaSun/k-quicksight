"use client"
import React, {useState} from 'react';
import {Button} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import {MockDataAnalysis} from "@/app/board/mockData/mockDataAnalysis";
import EmptyAnalysis from "@/app/board/components/emptyAnalysis";
const Page = () => {
    const [mockData, setMockData] = useState(MockDataAnalysis.listAnalysis);
    const link={
        route: '/board/analysis/new-data'
    }
    return (
        <div>
            <div className={"flex flex-row py-10 w-full px-10 justify-between"}>
                <div className={"flex flex-col"}>
                    <h1 className={"text-primary-color pb-2"}>Analysis</h1>
                    <p className={"text-xl text-primary-color"}>K-QucikSight</p>
                </div>
                <div className={" pt-3 text-primary-color"}>
                    <Link href={link.route}>
                        <Button className={"bg-primary-color text-background-color"} >
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" fill="white"/>
                            </svg>
                            Add new
                        </Button>
                    </Link>
                </div>
            </div>
            <div>
                {MockDataAnalysis.listAnalysis.length === 0 ? (
                    <EmptyAnalysis />
                ) : (
                    <div>
                        <div className={'flex flex-row gap-5'}>
                            {MockDataAnalysis.listAnalysis.map((item, index) => (
                                <Link
                                    href={item.url}
                                    key={index}
                                    className={
                                        'flex flex-col gap-5 p-2 hover:bg-blue-100 rounded-xl hover:ring-1 hover:ring-primary-color transition-all'
                                    }
                                >
                                    <Image
                                        src={item.thumbnail}
                                        alt={item.name}
                                        className={'max-w-[265px] max-h-[157px] rounded-xl object-cover'}
                                    />
                                    <div className={'flex flex-col'}>
                                        <p>{item.name}</p>
                                        <p>{item.createdAt}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )}


export default Page;
