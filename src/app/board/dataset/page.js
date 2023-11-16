'use client'

import React, {useState} from 'react';
import ModalImport from "@/app/board/dataset/component/modal";
import NewDataset from "@/app/board/dataset/component/newDataset";
import {Button, Input} from "@nextui-org/react";
import {SearchIcon} from "@/app/board/recent/searchIcons";
import DropDown from "@/app/board/dataset/component/DropDown";
import {file_dataset, sample_dataset} from "@/app/board/mockData/mockData";
import Link from "next/link";


const Dataset = () => {

    const [isSample, setSample] = useState(false)

    const handleDatasetSample = () => {
        setSample(event => !event)
    }

    return (
        <div className={'px-5 py-5'}>
            <div className={'flex justify-between items-center'}>
                <p className={'text-primary-color font-semibold text-2xl'}>Dataset</p>
                <div className={'flex justify-center items-center gap-5'}>
                    <ModalImport />
                    <NewDataset />
                </div>
            </div>
            <div className={'mt-14 flex flex-col gap-8'}>
                <div className={'flex justify-between items-center'}>
                    <p className={'text-2xl text-primary-color font-semibold'}>All files</p>
                    <p className={'text-primary-color font-semibold text-lg'}>Free <span className={'text-secondary-color'}>923.22 KB</span> / 1 GB</p>
                </div>

                <div className={'flex flex-row gap-5'}>
                    <Input startContent={<SearchIcon />} classNames={{
                        inputWrapper: [
                            'h-[41px] w-[325px] bg-white shadow-sm border-1 border-gray-400'
                        ]
                    }} placeholder={'Search'} className={'w-fit'} />
                    <DropDown />
                    <Button onClick={handleDatasetSample} className={`flex justify-center items-center ${isSample ? 'bg-primary-color text-white' : 'bg-white text-text-color'} border-1 border-gray-300`}>
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 16.6236V18.375C0 19.8229 3.52734 21 7.875 21C12.2227 21 15.75 19.8229 15.75 18.375V16.6236C14.0561 17.8172 10.9594 18.375 7.875 18.375C4.79063 18.375 1.69395 17.8172 0 16.6236ZM13.125 5.25C17.4727 5.25 21 4.07285 21 2.625C21 1.17715 17.4727 0 13.125 0C8.77734 0 5.25 1.17715 5.25 2.625C5.25 4.07285 8.77734 5.25 13.125 5.25ZM0 12.3211V14.4375C0 15.8854 3.52734 17.0625 7.875 17.0625C12.2227 17.0625 15.75 15.8854 15.75 14.4375V12.3211C14.0561 13.7156 10.9553 14.4375 7.875 14.4375C4.79473 14.4375 1.69395 13.7156 0 12.3211ZM17.0625 12.7723C19.4127 12.317 21 11.4721 21 10.5V8.74863C20.0484 9.42129 18.6498 9.88066 17.0625 10.1637V12.7723ZM7.875 6.5625C3.52734 6.5625 0 8.03086 0 9.84375C0 11.6566 3.52734 13.125 7.875 13.125C12.2227 13.125 15.75 11.6566 15.75 9.84375C15.75 8.03086 12.2227 6.5625 7.875 6.5625ZM16.8697 8.87168C19.3307 8.42871 21 7.55918 21 6.5625V4.81113C19.5439 5.84063 17.042 6.39434 14.4088 6.52559C15.6187 7.11211 16.5088 7.89961 16.8697 8.87168Z" fill="#636363"/>
                        </svg>
                        <p>Sample Dataset</p>
                    </Button>
                </div>

                <div className={'flex flex-col gap-5'}>
                    <div className={'flex justify-between items-center font-semibold text-primary-color w-[85%]'}>
                        <p className={'w-[300px]'}>Title</p>
                        <p className={'w-[300px]'}>File Type</p>
                        <p className={'w-[300px]'}>Create At</p>
                        <p className={'w-[80px]'}>Size</p>
                    </div>
                    <div className={'flex flex-col gap-3'}>
                        {
                            !isSample ? (
                                file_dataset.map((item, index) => (
                                    <div key={index} className={'flex gap-5 justify-start items-center'}>
                                        <Link href={item.url} className={'hover:text-white w-[85%] hover:bg-primary-color active:scale-105 transition-all px-5 h-[56px] py-3 shadow-md border-2 border-gray-100 flex font-medium rounded-xl justify-between items-center'}>
                                            <p className={'w-[300px]'}>{item.title}</p>
                                            <p className={'w-[300px]'}>{item.fileType}</p>
                                            <p className={'w-[300px]'}>{item.createAt}</p>
                                            <p className={'w-[80px]'}>{item.size}</p>
                                        </Link>
                                        <button>
                                            <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.42857 23.1562C1.42857 23.7779 1.65434 24.374 2.0562 24.8135C2.45806 25.2531 3.00311 25.5 3.57143 25.5H16.4286C16.9969 25.5 17.5419 25.2531 17.9438 24.8135C18.3457 24.374 18.5714 23.7779 18.5714 23.1562V6.75001H1.42857V23.1562ZM13.5714 10.6563C13.5714 10.4491 13.6467 10.2503 13.7806 10.1038C13.9146 9.95731 14.0963 9.875 14.2857 9.875C14.4752 9.875 14.6568 9.95731 14.7908 10.1038C14.9247 10.2503 15 10.4491 15 10.6563V21.5938C15 21.801 14.9247 21.9997 14.7908 22.1462C14.6568 22.2927 14.4752 22.375 14.2857 22.375C14.0963 22.375 13.9146 22.2927 13.7806 22.1462C13.6467 21.9997 13.5714 21.801 13.5714 21.5938V10.6563ZM9.28571 10.6563C9.28571 10.4491 9.36097 10.2503 9.49492 10.1038C9.62888 9.95731 9.81056 9.875 10 9.875C10.1894 9.875 10.3711 9.95731 10.5051 10.1038C10.639 10.2503 10.7143 10.4491 10.7143 10.6563V21.5938C10.7143 21.801 10.639 21.9997 10.5051 22.1462C10.3711 22.2927 10.1894 22.375 10 22.375C9.81056 22.375 9.62888 22.2927 9.49492 22.1462C9.36097 21.9997 9.28571 21.801 9.28571 21.5938V10.6563ZM5 10.6563C5 10.4491 5.07525 10.2503 5.20921 10.1038C5.34316 9.95731 5.52485 9.875 5.71429 9.875C5.90373 9.875 6.08541 9.95731 6.21936 10.1038C6.35332 10.2503 6.42857 10.4491 6.42857 10.6563V21.5938C6.42857 21.801 6.35332 21.9997 6.21936 22.1462C6.08541 22.2927 5.90373 22.375 5.71429 22.375C5.52485 22.375 5.34316 22.2927 5.20921 22.1462C5.07525 21.9997 5 21.801 5 21.5938V10.6563ZM19.2857 2.06251H13.9286L13.5089 1.14942C13.42 0.954214 13.2831 0.79001 13.1135 0.675281C12.944 0.560553 12.7485 0.499852 12.5491 0.500009H7.44643C7.24749 0.499172 7.05236 0.559646 6.8834 0.674502C6.71443 0.789359 6.57846 0.953951 6.49107 1.14942L6.07143 2.06251H0.714286C0.524845 2.06251 0.343164 2.14482 0.209209 2.29133C0.0752549 2.43784 0 2.63656 0 2.84376L0 4.40626C0 4.61346 0.0752549 4.81217 0.209209 4.95868C0.343164 5.1052 0.524845 5.18751 0.714286 5.18751H19.2857C19.4752 5.18751 19.6568 5.1052 19.7908 4.95868C19.9247 4.81217 20 4.61346 20 4.40626V2.84376C20 2.63656 19.9247 2.43784 19.7908 2.29133C19.6568 2.14482 19.4752 2.06251 19.2857 2.06251Z" fill="#DC0000"/>
                                            </svg>
                                        </button>
                                    </div>

                                ))
                            ) : (
                                sample_dataset.map((item, index) => (
                                    <div key={index} className={'flex gap-5 justify-start items-center'}>
                                        <Link href={item.url} className={'hover:text-white w-[85%] hover:bg-primary-color active:scale-105 transition-all px-5 h-[56px] py-3 shadow-md border-2 border-gray-100 flex font-medium rounded-xl justify-between items-center'}>
                                            <p className={'w-[300px]'}>{item.title}</p>
                                            <p className={'w-[300px]'}>{item.fileType}</p>
                                            <p className={'w-[300px]'}>{item.createAt}</p>
                                            <p className={'w-[80px]'}>{item.size}</p>
                                        </Link>
                                        <button>
                                            <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.42857 23.1562C1.42857 23.7779 1.65434 24.374 2.0562 24.8135C2.45806 25.2531 3.00311 25.5 3.57143 25.5H16.4286C16.9969 25.5 17.5419 25.2531 17.9438 24.8135C18.3457 24.374 18.5714 23.7779 18.5714 23.1562V6.75001H1.42857V23.1562ZM13.5714 10.6563C13.5714 10.4491 13.6467 10.2503 13.7806 10.1038C13.9146 9.95731 14.0963 9.875 14.2857 9.875C14.4752 9.875 14.6568 9.95731 14.7908 10.1038C14.9247 10.2503 15 10.4491 15 10.6563V21.5938C15 21.801 14.9247 21.9997 14.7908 22.1462C14.6568 22.2927 14.4752 22.375 14.2857 22.375C14.0963 22.375 13.9146 22.2927 13.7806 22.1462C13.6467 21.9997 13.5714 21.801 13.5714 21.5938V10.6563ZM9.28571 10.6563C9.28571 10.4491 9.36097 10.2503 9.49492 10.1038C9.62888 9.95731 9.81056 9.875 10 9.875C10.1894 9.875 10.3711 9.95731 10.5051 10.1038C10.639 10.2503 10.7143 10.4491 10.7143 10.6563V21.5938C10.7143 21.801 10.639 21.9997 10.5051 22.1462C10.3711 22.2927 10.1894 22.375 10 22.375C9.81056 22.375 9.62888 22.2927 9.49492 22.1462C9.36097 21.9997 9.28571 21.801 9.28571 21.5938V10.6563ZM5 10.6563C5 10.4491 5.07525 10.2503 5.20921 10.1038C5.34316 9.95731 5.52485 9.875 5.71429 9.875C5.90373 9.875 6.08541 9.95731 6.21936 10.1038C6.35332 10.2503 6.42857 10.4491 6.42857 10.6563V21.5938C6.42857 21.801 6.35332 21.9997 6.21936 22.1462C6.08541 22.2927 5.90373 22.375 5.71429 22.375C5.52485 22.375 5.34316 22.2927 5.20921 22.1462C5.07525 21.9997 5 21.801 5 21.5938V10.6563ZM19.2857 2.06251H13.9286L13.5089 1.14942C13.42 0.954214 13.2831 0.79001 13.1135 0.675281C12.944 0.560553 12.7485 0.499852 12.5491 0.500009H7.44643C7.24749 0.499172 7.05236 0.559646 6.8834 0.674502C6.71443 0.789359 6.57846 0.953951 6.49107 1.14942L6.07143 2.06251H0.714286C0.524845 2.06251 0.343164 2.14482 0.209209 2.29133C0.0752549 2.43784 0 2.63656 0 2.84376L0 4.40626C0 4.61346 0.0752549 4.81217 0.209209 4.95868C0.343164 5.1052 0.524845 5.18751 0.714286 5.18751H19.2857C19.4752 5.18751 19.6568 5.1052 19.7908 4.95868C19.9247 4.81217 20 4.61346 20 4.40626V2.84376C20 2.63656 19.9247 2.43784 19.7908 2.29133C19.6568 2.14482 19.4752 2.06251 19.2857 2.06251Z" fill="#DC0000"/>
                                            </svg>
                                        </button>
                                    </div>

                                ))
                            )
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dataset;