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
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";

const steps = ['import dataset', 'Perform analysis', 'Choosing model ', 'Finishing'];
const sizes = ["5xl"];
const ExistingDataset = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [size, setSize] = React.useState('md')

    const router = useRouter();
    const dispatch = useDispatch();
    const handleOpen = (size) => {
        setSize(size)
        onOpen();
    }
    const stateUuid = useSelector(state => state.analysisUuid.uuid)
    const handleSelectDataset = () => {
        router.push(`/board/analysis/${stateUuid}`);
    };

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleCancel = () => {
        setActiveStep(0);
    };

    const handleSelectAndNext = () => {
        handleSelectDataset();
        handleNext();
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
                            <ModalHeader className="flex flex-col gap-1 pt-10">
                                <AnalysisStep />
                            </ModalHeader>
                            <ModalBody>
                                <SelectDataSet />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={handleSelectDataset}>
                                    Select
                                </Button>
                                <Button color="danger" variant={'flat'} onClick={onClose}>
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