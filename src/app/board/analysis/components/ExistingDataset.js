"use client"
import React from 'react';
import Image from "next/image";
import TableImage from "@assets/images/analysis/table.png";
import {Button, useDisclosure} from "@nextui-org/react";

const ExistingDataset = () => {
    return (
        <div>
            <div className={"flex flex-col"}>
                <Button>
                    <Image
                        src={TableImage}
                        alt={""}
                        className={"w-40"}
                    />
                    <p className={"pt-6"}>Pick existing dataset</p>
                </Button>
            </div>
        </div>
    );
};

export default ExistingDataset;