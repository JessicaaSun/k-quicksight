import React, {useState} from 'react';
import {
    Button, Modal,
    ModalBody,
    ModalContent, ModalFooter,
    ModalHeader,
    Table,
    TableBody, TableCell,
    TableColumn,
    TableHeader,
    TableRow, useDisclosure
} from "@nextui-org/react";
import AnalysisStep from "@/app/board/components/AnalysisStep";

const ModelEda = () => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [size, setSize] = React.useState("4xl");
    const [currentStep, setCurrentStep] = useState(1);

    const handleSelect = () => {
        if (currentStep === 1) {
            setCurrentStep(2);
        } else if (currentStep === 2) {
            setCurrentStep(3);
        }
    };
    return (
        <div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onClose={onClose}
                size={size}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 pt-10">
                                {currentStep === 1 && <AnalysisStep step={1} />}
                                {currentStep === 2 && <AnalysisStep step={2} />}
                            </ModalHeader>
                            <ModalBody>
                                <p className={"font-bold text-primary-color text-2xl"}>
                                    Data Analysis
                                </p>
                                <Table
                                    color={selectedColor}
                                    selectionMode="single"
                                    defaultSelectedKeys={["Moving Average"]}
                                    aria-label="Example static collection table"
                                >
                                    <TableHeader>
                                        <TableColumn className={"hidden"}>NAME</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow key="Moving Average">
                                            <TableCell>Moving Average</TableCell>
                                        </TableRow>
                                        <TableRow key="Random Number Generation">
                                            <TableCell>Random Number Generation</TableCell>
                                        </TableRow>
                                        <TableRow key="Rank and Percentile">
                                            <TableCell>Rank and Percentile</TableCell>
                                        </TableRow>
                                        <TableRow key="Simple Linear Regression">
                                            <TableCell>Simple Linear Regression</TableCell>
                                        </TableRow>
                                        <TableRow key="Multiple Linear Regression">
                                            <TableCell>Multiple Linear Regression</TableCell>
                                        </TableRow>
                                        <TableRow key="Polynomial Regression">
                                            <TableCell>Polynomial Regression</TableCell>
                                        </TableRow>
                                        <TableRow key="Sampling">
                                            <TableCell>Sampling</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={handleSelect}>
                                    Proceed
                                </Button>
                                <Button color="danger" variant={"flat"} onPress={onClose}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ModelEda;