import React from 'react';
import {Button, useDisclosure} from "@nextui-org/react";

const ButtonPerformAnalysis = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
        <div>
            <div className={"flex flex-row justify-between  px-36 gap-14"}>
                <Button  onPress={onOpen} key={size} onClick={() => handleOpen(size)} className={"bg-primary-color text-background-color"}>
                    Perform Analysis
                </Button>
                <Button className={"text-background-color bg-primary-color"}>
                    Go to Board
                </Button>
            </div>
        </div>
    );
};

export default ButtonPerformAnalysis;