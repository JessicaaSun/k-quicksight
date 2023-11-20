'use client'

import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import TableMissingValue from "@/app/board/dataset/component/cleaning/Table";

export default function Overview() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <Button className={'bg-primary-color border-1 border-background-color shadow-md text-md font-normal text-background-color'} onPress={onOpen}>
                Overview
            </Button>
            <Modal
                size={'5xl'}
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    }
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-primary-color text-2xl">Data Overview</ModalHeader>
                            <ModalBody>
                                <ul className={'list-disc ml-10 leading-8'}>
                                    <li>Duplicate row = 0</li>
                                    <li>Outlier = 0</li>
                                    <li>Number of columns = 0</li>
                                    <li>Number of rows = 0</li>
                                    <li>Label names = [username, age, salary]</li>
                                </ul>
                                <p className={'text-text-color font-medium'}>Missing values</p>
                                <TableMissingValue />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
