'use client'

import React, {useEffect} from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Spinner
} from "@nextui-org/react";
import TableMissingValue from "@/app/board/dataset/component/cleaning/Table";
import {useGetFileOverviewQuery} from "@/store/features/files/allFileByuserId";
import {useGetUserQuery} from "@/store/features/user/userApiSlice";

export default function Overview({filename, uuid}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {data:user} = useGetUserQuery();
    const {data:fileOverview, isLoading} = useGetFileOverviewQuery({uuid: uuid, userId: user?.data.id})
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
                            <ModalHeader className="flex flex-col gap-1 text-primary-color text-2xl">
                                <h2>Data Overview</h2>
                                <p className={'text-lg font-medium'}>{filename}</p>
                            </ModalHeader>
                            <ModalBody>
                                {
                                    !isLoading ? (
                                        <>
                                            <ul className={'list-disc ml-10 leading-8'}>
                                                <li>Duplicate row = []</li>
                                                <li>Outlier = 0</li>
                                                <li>Number of columns = 0</li>
                                                <li>Number of rows = 0</li>
                                                <li className={'flex flex-wrap'}>Label names = []</li>
                                            </ul>
                                            <p className={'text-text-color font-medium'}>Missing values</p>
                                        </>
                                    ) : (
                                        <Spinner size='md' color='primary' />
                                    )
                                }
                                <TableMissingValue />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
