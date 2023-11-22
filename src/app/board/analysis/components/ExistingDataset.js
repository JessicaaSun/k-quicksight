"use client"
import React from 'react';
import Image from "next/image";
import TableImage from "@assets/images/analysis/table.png";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
    useSelect
} from "@nextui-org/react";
import AnalysisStep from "@/app/board/components/AnalysisStep";
import SelectDataSet from "@/app/board/analysis/components/SelectDataSet";
import { useRouter } from 'next/navigation'
import {useSelector} from "react-redux";
const ExistingDataset = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [size, setSize] = React.useState('md')
    const sizes = ["5xl"];
    const router = useRouter();

    const handleOpen = (size) => {
        setSize(size)
        onOpen();
    }
    const stateUuid = useSelector(state => state.analysisUuid.uuid)
    const handleSelectDataset = () => {
        router.push(`/board/analysis/${stateUuid}`);
    };

    return (
        <>
            <div className={"flex flex-col"}>
                {sizes.map((size) => (
                    <Button key={size} onClick={() => handleOpen(size)} className={"flex flex-col w-full h-full"}>
                        <Image
                            src={TableImage}
                            alt={""}
                            className={"w-40 pt-2"}
                        />
                        <p className={"py-3 font-bold"}>Pick existing dataset</p>
                    </Button>
                ))}
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={size} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <AnalysisStep step={0}/>
                            </ModalHeader>
                            <ModalBody>
                                <SelectDataSet/>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={handleSelectDataset}>
                                    Select
                                </Button>
                                <Button color="primary" onClick={onClose}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ExistingDataset;