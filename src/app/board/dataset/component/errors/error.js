'use client'
import React from 'react';
import Image from "next/image";
import error from '@assets/images/error-3d.webp'
import {Button} from "@nextui-org/react";
import {MdOutlineArrowBackIosNew, MdOutlineRefresh} from "react-icons/md";
import {useRouter} from "next/navigation";


const Error = () => {
    const router = useRouter();
    return (
        <div className={'w-full flex-col h-screen flex gap-10 justify-center items-center'}>
            <Image src={error} alt={'error'} />
            <div className={'flex flex-col gap-5'}>
                <h1 className={'text-red-500 text-center'}>Oops!</h1>
                <h3 className={'text-description-color'}>Seem like file has been crushed, Click on refresh or back please.</h3>
            </div>
            <div className={'flex gap-5'}>
                <Button onClick={() => router.back()} variant={'bordered'} size={'lg'} color={'primary'} className={'w-[200px]'} ><MdOutlineArrowBackIosNew /> Back </Button>
                <Button onClick={() => window.location.reload()} variant={'solid'} size={'lg'} color={'primary'} className={'w-[200px]'} ><MdOutlineRefresh />Refresh </Button>
            </div>
        </div>
    );
};

export default Error;