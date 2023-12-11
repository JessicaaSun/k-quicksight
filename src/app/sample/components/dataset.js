'use client'

import React, {useEffect, useState} from "react";
import {Button, Chip, Input} from "@nextui-org/react";
import {FaDatabase, FaSearch} from "react-icons/fa";
import Filter from "@/app/sample/components/Filter";
import {useDispatch, useSelector} from "react-redux";
import {setSampleFilename} from "@/store/features/sampleDataset/Dataset";
import {sample_dataset} from "@/app/board/mockData/mockData";
import {FaTableColumns} from "react-icons/fa6";
import Image from 'next/image'
import {TbEyeShare} from "react-icons/tb";
import {useRouter} from "next/navigation";
import {useGetJupyterFileQuery} from "@/store/features/sampleDataset/Jupyter";
import {getTrimIntoColumnOnlyDate} from "@/utils/getTrimDateTIme";
import {formatBytes} from "@/utils/convertByte";

const Sample_all = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const sampleInfo = useSelector(state => state.sampleDataset)
    const [filename, setFilename] = useState('');


    const {data:allSampleDataset} = useGetJupyterFileQuery({page: 1, size: 100, filename: filename})

    useEffect(() => {
        dispatch(setSampleFilename(filename))
    }, [dispatch, filename]);

    return (
        <div className={"grid gap-5 w-full"}>
            <Input
                startContent={<div className={'text-gray-500'}><FaSearch  /></div>}
                onValueChange={setFilename}
                radius={'full'}
                className={'text-lg'}
                size={'sm'}
                variant={'flat'}
                color={'default'}
                placeholder={'searching'}
            />
            <h4 className={'text-primary-color flex justify-start items-center gap-5'}><FaTableColumns /> Total dataset: {allSampleDataset?.results.length}</h4>
            <div className={'grid gap-3 w-full'}>
                {
                    allSampleDataset?.results.map((item, index) => (
                        <div key={item.id} className={'grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 justify-between items-center gap-5 border-1 border-gray-100 rounded-xl shadow-sm p-5'}>
                            <div className={'grid gap-5 items-center w-full'}>
                                <div className={'w-full'}>
                                    <p className={'capitalize lg:text-2xl md:text-xl text-lg'}>{item.file}</p>
                                    <p>{getTrimIntoColumnOnlyDate(item.created_at)} - {formatBytes(item.size)}</p>
                                </div>
                            </div>
                            <div className={'flex justify-end items-center'}>
                                <Button className={'lg:w-fit md:w-fit w-full'} radius={'full'} variant={'ghost'} color={'primary'} onClick={() => router.push(`/sample/${item.id}`)}><TbEyeShare /> View detail</Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Sample_all;
