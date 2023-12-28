'use client'

import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem } from "@nextui-org/react";
import { MdDataExploration, MdNavigateNext } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setRecentData } from "@/store/features/recentData/recentData";

const models = [
    {
        value: '',
        label: 'Canceling choosing model',
    },
    {
        value: 'descriptive_statistic',
        label: 'descriptive statistic',
    },
    {
        value: 'correlation',
        label: 'correlation',
    },
    {
        value: 'covariance',
        label: 'covariance',
    },
    {
        value: 'simple_linear_regression',
        label: 'simple linear regression',
    },
    {
        value: 'non_linear_regression',
        label: 'non linear regression',
    },
    {
        value: 'multiple_linear_regression',
        label: 'multiple linear regression',
    },
]

export default function PerformAnalysisButton({ uuid }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [value, setValue] = React.useState(new Set([]));
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (value.currentKey) {
            setDisabled(false)
        }
    }, [value])

    return (
        <>
            <Button className="bg-primary-color text-white" onPress={onOpen}><MdDataExploration /> Perform analysis</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 dark:bg-white">Choosing model</ModalHeader>
                            <ModalBody className={'dark:bg-white'}>
                                <div className="flex w-full flex-col gap-2">
                                    <p className="text-small text-default-500">Model selected: {value}</p>
                                    <Select
                                        size="sm"
                                        aria-label="Select"
                                        variant="bordered"
                                        placeholder="Select model"
                                        selectedKeys={value}
                                        className="w-full dark:bg-white"
                                        onSelectionChange={setValue}
                                    >
                                        {
                                            models.map((item, index) => (
                                                <SelectItem className={'dark:bg-white capitalize'} key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))
                                        }
                                    </Select>
                                </div>
                            </ModalBody>
                            <ModalFooter className={'dark:bg-white'}>
                                <Button onClick={() => {
                                    setLoading(true)
                                    router.push(`/board/analysis/perform/${value?.currentKey}/${uuid}`)
                                }} disabled={disabled} isLoading={loading} color="primary">
                                    {
                                        !disabled ? (<>Next</>) : (<>Please choose the model</>)
                                    } <MdNavigateNext />
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
