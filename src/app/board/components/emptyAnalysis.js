import React from 'react';
import Image from "next/image";
import boxEmpty from "@assets/images/analysis/box-empty.png"
const EmptyAnalysis = () => {
    return (
        <div className={"flex flex-col justify-center items-center"}>
            <Image src={boxEmpty} alt={""} className={"w-96 "}/>
            <p className={"text-primary-color text-2xl"}>You don&apos;t have data in for analysis.</p>
            <p className={"text-2xl text-primary-color"}>You can Add new.</p>
        </div>
    );
};

export default EmptyAnalysis;