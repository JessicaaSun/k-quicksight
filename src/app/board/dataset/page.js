'use client'

import React, {useEffect, useState} from 'react';
import ModalImport from "@/app/board/dataset/component/modal";
import NewDataset from "@/app/board/dataset/component/newDataset";
import {Button, Input, SelectItem} from "@nextui-org/react";
import {SearchIcon} from "@/app/board/recent/searchIcons";
import DropDown from "@/app/board/dataset/component/DropDown";
import {dataType, file_dataset, sample_dataset} from "@/app/board/mockData/mockData";
import Link from "next/link";
import {useGetAllFilesQuery} from "@/store/features/files/allFileByuserId";
import {useGetUserQuery} from "@/store/features/user/userApiSlice";
import TableData from "@/lib/table/Table";
import {useDispatch, useSelector} from "react-redux";
import {setFiles} from "@/store/features/files/fileSlice";


const Dataset = () => {

    const {data:user, isLoading} = useGetUserQuery();

    const [isSample, setSample] = useState(false);

    const headers = [
        {
            header: 'Title'
        },
        {
            header: 'File Type'
        },
        {
            header: 'Create At'
        },
        {
            header: 'Size'
        },
    ]

    const handleDatasetSample = () => {
        setSample(event => !event)
    }
    const [file, setFilesRecord] = useState([])
    const filType = useSelector(state => state.fileType.fileType);
    const {data: allFile, isLoading: isFileLoading}  = useGetAllFilesQuery({id:user?.data.id, type:filType})
    const dispatch = useDispatch()
    const state = useSelector(state => state);
    console.log(state);

    useEffect(() => {
        setFilesRecord(allFile)
        dispatch(setFiles(allFile))
    }, [allFile, dispatch])

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
                    <Input color={'primary'} startContent={<SearchIcon />} classNames={{
                        inputWrapper: [
                            'h-[41px] w-[325px] bg-white shadow-sm border-1 border-gray-400'
                        ]
                    }} placeholder={'Search'} className={'w-fit'} />

                    <DropDown />
                    <Button onClick={handleDatasetSample} className={`flex justify-center items-center ${isSample ? 'bg-primary-color text-white' : 'bg-white text-text-color'} border-1 border-gray-300`}>
                        <i className="text-lg fa-solid fa-database"></i>
                        <p>Sample Dataset</p>
                    </Button>
                </div>

                <TableData isSample={isSample} file={file} sample_dataset={sample_dataset} headers={headers}/>

            </div>
        </div>
    );
};

export default Dataset;