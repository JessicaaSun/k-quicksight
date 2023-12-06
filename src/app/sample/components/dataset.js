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

const Sample_all = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const sampleInfo = useSelector(state => state.sampleDataset)
    const [filename, setFilename] = useState('');

    useEffect(() => {
        dispatch(setSampleFilename(filename))
    }, [dispatch, filename]);

    return (
        <div className={"grid gap-5"}>
            <Input
                startContent={<div className={'text-gray-500'}><FaSearch  /></div>}
                endContent={<Filter />}
                onValueChange={setFilename}
                radius={'full'}
                className={'w-full text-lg'}
                size={'sm'}
                variant={'bordered'}
                color={'default'}
                placeholder={'searching'}
            />
            <h4 className={'text-primary-color flex justify-start items-center gap-5'}><FaTableColumns /> Total dataset: {sample_dataset.length}</h4>
            <div className={'grid gap-3'}>
                {
                    sample_dataset.map((item, index) => (
                        <div key={item.uuid} className={'flex justify-between items-center gap-5 border-1 border-gray-100 rounded-xl shadow-sm p-2'}>
                            <div className={'flex gap-5 items-center'}>
                                <img src={item.thumbnail} className={'w-[100px] h-[100px] object-cover rounded-lg'} />
                                <div>
                                    <h4 className={'capitalize'}>{item.title}</h4>
                                    <p>{item.createAt}</p>
                                    <p>{item.fileType}</p>
                                </div>
                            </div>
                            <Button radius={'full'} variant={'ghost'} color={'primary'} onClick={() => router.push(`/sample/${item.uuid}`)}><TbEyeShare /> View detail</Button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Sample_all;
