'use client'

import React from 'react';
import { Tabs } from 'antd';
import Sample_all from "@/app/sample/components/dataset";
import sampleImage from '@assets/images/vecteezy_it-support-and-application-maintenance_.jpg'
import Image from "next/image";
import {Button} from "@nextui-org/react";
import {FaPlus} from "react-icons/fa";
import {useGetUserQuery} from "@/store/features/user/userApiSlice";
import {useRouter} from "next/navigation";

const onChange = (key) => {
    console.log(key);
};

const items = [
    {
        key: '1',
        label: 'Dataset',
        children: <Sample_all />,
    },
    {
        key: '2',
        label: 'Analysis',
        children: 'Analysis will be latter!',
    },
    {
        key: '3',
        label: 'Dashboard',
        children: 'Dashboard will be latter',
    },
];
const SampleDataset_main = () => {
    const router = useRouter();
    const {data:user, isLoading} = useGetUserQuery();

    const handleRouteAddNewDataset = () => {
        if (!user) {
            router.push("/auth/login")
        } else {
            router.push("/board/dataset")
        }
    }


    return (
        <div className={'py-36 px-[10%]'}>
            <div className={'lg:flex md:flex grid justify-between items-center'}>
                <div className={'w-full grid gap-4'}>
                    <h2 className={'text-text-color'}>Sample</h2>
                    <p className={'text-description-color'}>Explore, analyze, and share quality data. Learn more about data types, creating, and collaborating.</p>
                    <Button onClick={handleRouteAddNewDataset} className={'bg-primary-color text-white w-fit mt-5'} size={'md'}><FaPlus /> New dataset</Button>
                </div>
                <Image  src={sampleImage} alt={'sample Image'} width={350} height={350} />
            </div>
            <Tabs
                defaultActiveKey="1"
                items={items}
                onChange={onChange}
                size={'large'}
                indicatorSize={(origin) => origin - 16}
            />
        </div>
    )
}
export default SampleDataset_main;